import { motion } from "framer-motion";
import { Satellite, Focus, Crosshair, Map, Activity } from "lucide-react";
import AlertCard from "@/components/AlertCard";
import { cn } from "@/lib/utils";

const SatelliteMonitoringPage = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-[calc(100vh-8rem)] flex flex-col space-y-4 max-w-[1400px] mx-auto">
      {/* Header Panel */}
      <motion.div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-1">Live Land Monitoring</h1>
          <p className="text-muted-foreground text-sm">Real-time satellite surveillance and AI encroachment detection.</p>
        </div>
        <div className="flex items-center gap-2 bg-destructive/10 dark:bg-destructive/20 backdrop-blur-md rounded-full px-4 py-2 border border-destructive/20 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
          <Activity className="w-4 h-4 text-destructive animate-pulse" />
          <span className="text-xs font-semibold text-destructive">2 Active Alerts Detected</span>
        </div>
      </motion.div>

      {/* Main Map Interface */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        {/* Map Container */}
        <div className="flex-1 glass-card rounded-[24px] overflow-hidden relative border border-border/50 shadow-2xl flex flex-col group">

          <div className="absolute top-4 left-4 z-20 flex gap-2">
            <button className="bg-background/80 backdrop-blur-md rounded-xl p-3 border border-border/50 hover:bg-secondary transition-colors text-foreground shadow-lg">
              <Map className="w-5 h-5" />
            </button>
            <button className="bg-background/80 backdrop-blur-md rounded-xl p-3 border border-border/50 hover:bg-secondary transition-colors text-foreground shadow-lg">
              <Focus className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute top-4 right-4 z-20">
            <div className="bg-background/90 backdrop-blur-xl rounded-xl p-3 border border-border/50 shadow-2xl flex flex-col gap-3 min-w-[160px]">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Status</div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Satellites Active</span>
                <span className="text-primary font-bold">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Last Scan</span>
                <span className="text-foreground font-mono">1m ago</span>
              </div>
            </div>
          </div>

          {/* Map Layer */}
          <div className="relative w-full h-full bg-[#0a0a0a] overflow-hidden flex-1 cursor-crosshair">
            {/* Satellite Image Background Mock */}
            <div
              className="absolute inset-0 bg-cover bg-center brightness-75 contrast-125 saturate-50 group-hover:scale-105 transition-transform duration-[10s] ease-out"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop')" }}
            />
            {/* Grid Overlay for high-tech feel */}
            <div className="absolute inset-0 z-0 opacity-20" style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(255,255,255,0.3) 50px, rgba(255,255,255,0.3) 50px),
                repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(255,255,255,0.3) 50px, rgba(255,255,255,0.3) 50px)`
            }} />

            {/* SVG Boundaries */}
            <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 1000 800" preserveAspectRatio="none">
              {/* Plot 1 - Safe */}
              <polygon points="200,300 450,280 480,500 220,550" className="fill-primary/20 stroke-primary stroke-[3px]" strokeLinejoin="round" />
              <circle cx="350" cy="410" r="4" className="fill-primary" />

              {/* Plot 2 - Alert */}
              <polygon points="600,200 850,250 800,450 620,400" className="fill-destructive/20 stroke-destructive stroke-[3px]" strokeDasharray="10 5" strokeLinejoin="round" />
              <polygon points="580,220 630,220 620,280 570,260" className="fill-warning/40 stroke-warning stroke-2" />
            </svg>

            {/* Pulsing Markers */}
            <div className="absolute top-[28%] left-[60%] z-20 -translate-x-1/2 -translate-y-1/2">
              <div className="relative flex items-center justify-center">
                <div className="w-16 h-16 bg-destructive/20 rounded-full animate-ping absolute" />
                <div className="w-8 h-8 bg-destructive/40 rounded-full animate-ping absolute" />
                <div className="w-4 h-4 bg-destructive rounded-full relative z-10 shadow-[0_0_15px_rgba(239,68,68,1)] border-2 border-white" />
              </div>
            </div>

            <div className="absolute top-[28%] left-[60%] z-30 translate-x-4 -translate-y-8 bg-background/90 backdrop-blur-md rounded-lg p-2 border border-destructive/50 shadow-xl whitespace-nowrap">
              <span className="text-xs font-bold text-destructive flex items-center gap-1.5"><Crosshair className="w-3 h-3" /> Encroachment Risk</span>
            </div>

            <div className="absolute top-[55%] left-[35%] z-20 -translate-x-1/2 -translate-y-1/2">
              <div className="w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_rgba(59,130,246,1)] border-2 border-white" />
            </div>
          </div>
        </div>

        {/* Side Panel alerts max width on large screens */}
        <div className="shrink-0 lg:w-[400px] flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
          <div className="glass-card rounded-[24px] p-6 border border-border/50 shadow-xl">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-accent" /> Alert Log
            </h3>
            <div className="space-y-4">
              <AlertCard severity="critical" title="Encroachment Risk" description="Unauthorized structure detected near northern boundary of Plot #SL-1923." timestamp="Live" />
              <AlertCard severity="warning" title="Boundary Change Detected" description="Minor foliage overgrowth detected affecting clear boundary visibility." timestamp="2 hours ago" />
              <AlertCard severity="success" title="Scan Completed" description="Routine perimeter scan finished. No anomalies found on SL-2847." timestamp="1 day ago" />
              <AlertCard severity="info" title="System Update" description="Satellite imagery updated to highest available resolution." timestamp="2 days ago" />
            </div>
          </div>

          <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-[20px] p-6 text-center">
            <Satellite className="w-8 h-8 text-primary mx-auto mb-3 opacity-80" />
            <h4 className="font-semibold text-primary mb-1">Continuous Monitoring</h4>
            <p className="text-sm text-foreground/70">SecureLand AI scans your boundaries periodically using commercial satellite data for absolute peace of mind.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SatelliteMonitoringPage;
