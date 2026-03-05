import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Satellite, Focus, Map, Activity, Layers, ZoomIn, ZoomOut, Locate, User, MapPin, Ruler, Shield, Search, X, CheckCircle } from "lucide-react";
import AlertCard from "@/components/AlertCard";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "AIzaSyCahGYtVhGgDlZfZr1M7IVkXHmi4tpou4s";

interface MonitoredPlot {
  id: string;
  name: string;
  center: { lat: number; lng: number };
  status: string;
  lastScan: string;
  boundary: { lat: number; lng: number }[];
  ownerName?: string;
  location?: string;
  area?: number;
  isRegistered?: boolean;
}

const defaultPlots: MonitoredPlot[] = [
  {
    id: "SL-2847A", name: "Plot #SL-2847A",
    center: { lat: 11.0168, lng: 76.9558 }, status: "safe", lastScan: "1 min ago",
    boundary: [{ lat: 11.0175, lng: 76.9548 }, { lat: 11.0180, lng: 76.9565 }, { lat: 11.0165, lng: 76.9572 }, { lat: 11.0158, lng: 76.9555 }],
  },
  {
    id: "SL-1923B", name: "Plot #SL-1923B",
    center: { lat: 11.0210, lng: 76.9620 }, status: "alert", lastScan: "Live",
    boundary: [{ lat: 11.0215, lng: 76.9612 }, { lat: 11.0220, lng: 76.9630 }, { lat: 11.0205, lng: 76.9635 }, { lat: 11.0200, lng: 76.9618 }],
  },
];

// Build monitored plots from localStorage Digital Twins
const getRegisteredPlots = (): MonitoredPlot[] => {
  try {
    const twins = JSON.parse(localStorage.getItem("secureland_twins") || "[]");
    return twins.map((twin: any) => {
      const coords = twin.coordinates || twin.polygon || [];
      const center = coords.length > 0
        ? { lat: coords.reduce((s: number, c: any) => s + c.lat, 0) / coords.length, lng: coords.reduce((s: number, c: any) => s + c.lng, 0) / coords.length }
        : { lat: 13.0827, lng: 80.2707 };
      return {
        id: twin.landId,
        name: `${twin.ownerName}'s Land`,
        center,
        status: "safe",
        lastScan: "Just registered",
        boundary: coords,
        ownerName: twin.ownerName,
        location: twin.location,
        area: twin.area,
        isRegistered: true,
      };
    });
  } catch { return []; }
};

// Load Google Maps API with async loading
const loadGoogleMaps = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Already loaded
    if ((window as any).google?.maps) {
      resolve();
      return;
    }

    // Script already in DOM — poll until google.maps is available
    const existingScript = document.getElementById("google-maps-script");
    if (existingScript) {
      let attempts = 0;
      const poll = setInterval(() => {
        if ((window as any).google?.maps) {
          clearInterval(poll);
          resolve();
        } else if (++attempts > 50) {
          clearInterval(poll);
          reject(new Error("Google Maps timed out"));
        }
      }, 200);
      return;
    }

    // First load — create script
    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&loading=async`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      // Poll until google.maps object is actually available
      const poll = setInterval(() => {
        if ((window as any).google?.maps) {
          clearInterval(poll);
          resolve();
        }
      }, 100);
    };
    script.onerror = () => reject(new Error("Failed to load Google Maps"));
    document.head.appendChild(script);
  });
};

// Isolated Google Map component that prevents React DOM conflicts
const GoogleMapView = ({ onMapReady, plots }: { onMapReady: (map: any) => void; plots: MonitoredPlot[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        await loadGoogleMaps();
        if (cancelled || !containerRef.current || mapInstanceRef.current) return;

        const google = (window as any).google;

        // Center on registered land if available, else default
        const registeredLand = plots.find(p => p.isRegistered);
        const center = registeredLand ? registeredLand.center : plots[0]?.center || { lat: 13.0827, lng: 80.2707 };

        const map = new google.maps.Map(containerRef.current, {
          center,
          zoom: registeredLand ? 17 : 16,
          mapTypeId: "satellite",
          disableDefaultUI: true,
          zoomControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          gestureHandling: "greedy",
          tilt: 45,
        });

        mapInstanceRef.current = map;

        // Draw plot boundaries and markers
        plots.forEach((plot) => {
          if (plot.boundary.length < 3) return;

          const strokeColor = plot.isRegistered ? "#00E5FF" : plot.status === "alert" ? "#EF4444" : "#2563EB";
          const fillColor = plot.isRegistered ? "#00E5FF" : plot.status === "alert" ? "#EF4444" : "#2563EB";

          const polygon = new google.maps.Polygon({
            paths: plot.boundary,
            strokeColor,
            strokeOpacity: 0.9,
            strokeWeight: plot.isRegistered ? 3 : 2,
            fillColor,
            fillOpacity: plot.isRegistered ? 0.2 : 0.15,
            map,
          });

          if (plot.status === "alert") {
            new google.maps.Circle({
              center: plot.center, radius: 30,
              strokeColor: "#EF4444", strokeOpacity: 0.4, strokeWeight: 2,
              fillColor: "#EF4444", fillOpacity: 0.1, map,
            });
          }

          const infoContent = plot.isRegistered
            ? `<div style="font-family:'Inter',sans-serif;padding:8px;min-width:200px">
                <h3 style="font-size:14px;font-weight:700;margin-bottom:6px;color:#1e293b">${plot.name}</h3>
                <div style="font-size:12px;color:#64748b;line-height:1.8">
                  <div><b>Land ID:</b> <span style="font-family:monospace;color:#2563EB">${plot.id}</span></div>
                  <div><b>Owner:</b> ${plot.ownerName}</div>
                  <div><b>Location:</b> ${plot.location}</div>
                  <div><b>Area:</b> ${plot.area?.toLocaleString()} sq.m</div>
                  <div><b>Status:</b> <span style="color:#10B981;font-weight:600">✅ Monitored</span></div>
                  <div><b>Coords:</b> ${plot.center.lat.toFixed(4)}, ${plot.center.lng.toFixed(4)}</div>
                </div>
              </div>`
            : `<div style="font-family:'Inter',sans-serif;padding:8px;min-width:180px">
                <h3 style="font-size:14px;font-weight:700;margin-bottom:6px;color:#1e293b">${plot.name}</h3>
                <div style="font-size:12px;color:#64748b;line-height:1.6">
                  <div><b>Status:</b> <span style="color:${plot.status === "alert" ? "#EF4444" : "#10B981"};font-weight:600">${plot.status === "alert" ? "⚠️ Alert" : "✅ Secured"}</span></div>
                  <div><b>Last Scan:</b> ${plot.lastScan}</div>
                  <div><b>Coords:</b> ${plot.center.lat.toFixed(4)}, ${plot.center.lng.toFixed(4)}</div>
                </div>
              </div>`;

          const infoWindow = new google.maps.InfoWindow({ content: infoContent });

          const markerColor = plot.isRegistered ? "#00E5FF" : plot.status === "alert" ? "#EF4444" : "#2563EB";
          const marker = new google.maps.Marker({
            position: plot.center, map,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: plot.isRegistered ? 12 : plot.status === "alert" ? 10 : 8,
              fillColor: markerColor, fillOpacity: 1, strokeColor: "#FFFFFF", strokeWeight: 3,
            },
            title: plot.name,
          });

          marker.addListener("click", () => infoWindow.open(map, marker));
          polygon.addListener("click", () => { infoWindow.setPosition(plot.center); infoWindow.open(map); });

          // Auto-open info for registered land
          if (plot.isRegistered) {
            infoWindow.open(map, marker);
          }
        });

        onMapReady(map);
      } catch (err) {
        console.error("Google Maps init error:", err);
      }
    };

    init();

    return () => {
      cancelled = true;
      // Do NOT destroy the map — let the DOM node removal handle it
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // This div is never re-rendered by React — Google Maps owns it
  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
};

const SatelliteMonitoringPage = () => {
  const googleMapRef = useRef<any>(null);
  const [mapType, setMapType] = useState<"satellite" | "hybrid" | "terrain">("satellite");
  const [mapLoaded, setMapLoaded] = useState(false);

  // Merge registered lands + default plots
  const monitoredPlots = useMemo(() => {
    const registered = getRegisteredPlots();
    return [...registered, ...defaultPlots];
  }, []);

  const handleMapReady = useCallback((map: any) => {
    googleMapRef.current = map;
    setMapLoaded(true);
  }, []);

  const changeMapType = (type: "satellite" | "hybrid" | "terrain") => {
    setMapType(type);
    googleMapRef.current?.setMapTypeId(type);
  };

  const zoomIn = () => {
    if (googleMapRef.current) googleMapRef.current.setZoom(googleMapRef.current.getZoom() + 1);
  };
  const zoomOut = () => {
    if (googleMapRef.current) googleMapRef.current.setZoom(googleMapRef.current.getZoom() - 1);
  };
  const resetView = () => {
    const reg = monitoredPlots.find(p => p.isRegistered);
    if (googleMapRef.current) {
      googleMapRef.current.setCenter(reg ? reg.center : { lat: 13.0827, lng: 80.2707 });
      googleMapRef.current.setZoom(reg ? 17 : 16);
      googleMapRef.current.setTilt(45);
    }
  };
  const panToPlot = (center: { lat: number; lng: number }) => {
    if (googleMapRef.current) {
      googleMapRef.current.panTo(center);
      googleMapRef.current.setZoom(18);
    }
  };

  // =============================================
  // SEARCH AREA — Google Geocoder
  // =============================================
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{ name: string; lat: number; lng: number }[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchMatched, setSearchMatched] = useState(false);
  const [searchMarker, setSearchMarker] = useState<any>(null);
  const searchTimerRef = useRef<any>(null);

  const handleSearchArea = (query: string) => {
    setSearchQuery(query);
    setSearchMatched(false);
    setSearchResults([]);

    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    if (query.trim().length < 3) return;

    setSearchLoading(true);
    searchTimerRef.current = setTimeout(() => {
      const google = (window as any).google;
      if (!google?.maps) { setSearchLoading(false); return; }

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: `${query}, India` }, (results: any, status: string) => {
        setSearchLoading(false);
        if (status === "OK" && results?.length > 0) {
          const mapped = results.slice(0, 5).map((r: any) => ({
            name: r.formatted_address,
            lat: r.geometry.location.lat(),
            lng: r.geometry.location.lng(),
          }));
          setSearchResults(mapped);
        }
      });
    }, 500);
  };

  const selectSearchResult = (result: { name: string; lat: number; lng: number }) => {
    const map = googleMapRef.current;
    if (!map) return;

    // Remove previous search marker
    if (searchMarker) searchMarker.setMap(null);

    map.panTo({ lat: result.lat, lng: result.lng });
    map.setZoom(17);

    const google = (window as any).google;
    if (google?.maps) {
      const marker = new google.maps.Marker({
        position: { lat: result.lat, lng: result.lng },
        map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 14,
          fillColor: "#F59E0B",
          fillOpacity: 1,
          strokeColor: "#FFFFFF",
          strokeWeight: 3,
        },
        title: result.name,
        animation: google.maps.Animation.DROP,
      });

      const info = new google.maps.InfoWindow({
        content: `<div style="font-family:'Inter',sans-serif;padding:6px;min-width:180px">
          <div style="font-size:13px;font-weight:700;color:#1e293b;margin-bottom:4px">📍 Search Result</div>
          <div style="font-size:11px;color:#64748b;line-height:1.6">${result.name}</div>
          <div style="font-size:11px;color:#64748b;margin-top:4px">${result.lat.toFixed(6)}, ${result.lng.toFixed(6)}</div>
        </div>`,
      });
      info.open(map, marker);
      setSearchMarker(marker);
    }

    setSearchQuery(result.name.split(",")[0]);
    setSearchResults([]);
    setSearchMatched(true);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setSearchMatched(false);
    if (searchMarker) { searchMarker.setMap(null); setSearchMarker(null); }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-[calc(100vh-8rem)] flex flex-col space-y-4 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-1">Live Land Monitoring</h1>
          <p className="text-muted-foreground text-sm">Real-time satellite surveillance and AI encroachment detection.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-accent/10 backdrop-blur-md rounded-full px-4 py-2 border border-accent/20">
            <Satellite className="w-4 h-4 text-accent" />
            <span className="text-xs font-semibold text-accent">Google Satellite Active</span>
          </div>
          <div className="flex items-center gap-2 bg-destructive/10 backdrop-blur-md rounded-full px-4 py-2 border border-destructive/20 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
            <Activity className="w-4 h-4 text-destructive animate-pulse" />
            <span className="text-xs font-semibold text-destructive">1 Active Alert</span>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        {/* Map */}
        <div className="flex-1 glass-card rounded-[24px] overflow-hidden relative border border-border/50 shadow-2xl">
          {/* Map type controls */}
          <div className="absolute top-4 left-4 z-[10] flex gap-2">
            {([
              { type: "satellite" as const, icon: Satellite, label: "Satellite" },
              { type: "hybrid" as const, icon: Map, label: "Hybrid" },
              { type: "terrain" as const, icon: Layers, label: "Terrain" },
            ]).map((t) => (
              <button
                key={t.type}
                onClick={() => changeMapType(t.type)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border shadow-lg text-sm font-medium transition-all ${mapType === t.type
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background/80 backdrop-blur-md border-border/50 text-foreground hover:bg-secondary"
                  }`}
              >
                <t.icon className="w-4 h-4" />
                <span className="hidden md:inline">{t.label}</span>
              </button>
            ))}
          </div>

          {/* Search Area Bar */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[15] w-full max-w-md px-4" style={{ left: '55%' }}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchArea(e.target.value)}
                placeholder="Search area, city, or coordinates..."
                className={`w-full h-10 pl-10 pr-10 rounded-xl bg-background/90 backdrop-blur-xl border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 shadow-2xl transition-all ${searchMatched ? "border-emerald-500 ring-2 ring-emerald-500/20" : "border-border/50"
                  }`}
              />
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center gap-1">
                {searchLoading && (
                  <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                )}
                {searchMatched && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                {searchQuery && (
                  <button onClick={clearSearch} className="p-1 hover:bg-secondary rounded-md transition-colors">
                    <X className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                )}
              </div>

              {/* Search Results Dropdown */}
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-background/95 backdrop-blur-xl rounded-xl border border-border/50 shadow-2xl overflow-hidden z-[20]">
                  {searchResults.map((result, i) => (
                    <button
                      key={i}
                      onClick={() => selectSearchResult(result)}
                      className="w-full text-left px-4 py-3 hover:bg-primary/10 transition-colors border-b border-border/20 last:border-0 flex items-start gap-3"
                    >
                      <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm text-foreground font-medium truncate">{result.name}</p>
                        <p className="text-[10px] text-muted-foreground font-mono">{result.lat.toFixed(5)}, {result.lng.toFixed(5)}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Zoom controls */}
          <div className="absolute top-4 right-4 z-[10] flex flex-col gap-2">
            <div className="bg-background/90 backdrop-blur-xl rounded-xl border border-border/50 shadow-2xl overflow-hidden">
              <button onClick={zoomIn} className="p-2.5 hover:bg-secondary transition-colors border-b border-border/30">
                <ZoomIn className="w-4 h-4 text-foreground" />
              </button>
              <button onClick={zoomOut} className="p-2.5 hover:bg-secondary transition-colors border-b border-border/30">
                <ZoomOut className="w-4 h-4 text-foreground" />
              </button>
              <button onClick={resetView} className="p-2.5 hover:bg-secondary transition-colors">
                <Locate className="w-4 h-4 text-foreground" />
              </button>
            </div>
          </div>

          {/* Status panel */}
          <div className="absolute bottom-4 left-4 z-[10]">
            <div className="bg-background/90 backdrop-blur-xl rounded-xl p-3 border border-border/50 shadow-2xl min-w-[180px]">
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">MONITORING STATUS</div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Satellites</span>
                  <span className="text-primary font-bold">12 Active</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last Scan</span>
                  <span className="text-foreground font-mono text-xs">1m ago</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Resolution</span>
                  <span className="text-foreground font-mono text-xs">0.5m/px</span>
                </div>
              </div>
            </div>
          </div>

          {/* Loading state */}
          {!mapLoaded && (
            <div className="absolute inset-0 z-[5] bg-[#0a0a0a] flex items-center justify-center">
              <div className="text-center">
                <Satellite className="w-10 h-10 text-primary/50 mx-auto mb-3 animate-pulse" />
                <p className="text-sm text-muted-foreground">Loading satellite imagery...</p>
              </div>
            </div>
          )}

          {/* Google Maps — isolated from React's DOM reconciliation */}
          <div className="w-full h-full" style={{ minHeight: 400 }}>
            <GoogleMapView onMapReady={handleMapReady} plots={monitoredPlots} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="shrink-0 lg:w-[400px] flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
          {/* Monitored Plots */}
          <div className="glass-card rounded-[24px] p-6 border border-border/50 shadow-xl">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Focus className="w-5 h-5 text-primary" /> Monitored Plots
            </h3>
            <div className="space-y-3">
              {monitoredPlots.map((plot) => (
                <div
                  key={plot.id}
                  onClick={() => panToPlot(plot.center)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all hover:shadow-md ${plot.isRegistered
                    ? "bg-cyan-500/5 border-cyan-500/20 hover:bg-cyan-500/10 ring-1 ring-cyan-500/20"
                    : plot.status === "alert"
                      ? "bg-destructive/5 border-destructive/20 hover:bg-destructive/10"
                      : "bg-primary/5 border-primary/20 hover:bg-primary/10"
                    }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-foreground">{plot.name}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${plot.isRegistered
                      ? "bg-cyan-500/10 text-cyan-500"
                      : plot.status === "alert" ? "bg-destructive/10 text-destructive" : "bg-accent/10 text-accent"
                      }`}>
                      {plot.isRegistered ? "Your Land" : plot.status === "alert" ? "Alert" : "Secured"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {plot.isRegistered && plot.location ? `${plot.location} • ` : ""}
                    {plot.center.lat.toFixed(4)}, {plot.center.lng.toFixed(4)} • {plot.lastScan}
                  </p>
                  {plot.isRegistered && plot.area && (
                    <p className="text-xs text-cyan-500/80 mt-1 font-mono">
                      {plot.area.toLocaleString()} sq.m • ID: {plot.id}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Alert Log */}
          <div className="glass-card rounded-[24px] p-6 border border-border/50 shadow-xl">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-accent" /> Alert Log
            </h3>
            <div className="space-y-4">
              <AlertCard severity="critical" title="Encroachment Risk" description="Unauthorized structure detected near northern boundary of Plot #SL-1923B." timestamp="Live" />
              <AlertCard severity="warning" title="Boundary Change" description="Minor foliage overgrowth detected affecting boundary visibility." timestamp="2 hours ago" />
              <AlertCard severity="success" title="Scan Completed" description="Routine perimeter scan done. No anomalies on SL-2847A." timestamp="1 day ago" />
              <AlertCard severity="info" title="System Update" description="Satellite imagery updated to highest resolution." timestamp="2 days ago" />
            </div>
          </div>

          <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-[20px] p-6 text-center">
            <Satellite className="w-8 h-8 text-primary mx-auto mb-3 opacity-80" />
            <h4 className="font-semibold text-primary mb-1">Google Satellite Active</h4>
            <p className="text-sm text-foreground/70">Live imagery powered by Google Maps API with boundary monitoring.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SatelliteMonitoringPage;
