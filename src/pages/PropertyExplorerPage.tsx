import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Search, Filter, Star, Shield, Droplets, Building2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const properties = [
    { id: 1, name: "Green Valley Estate", location: "Coimbatore", lat: 35, lng: 40, price: "₹1.2 Cr", area: "2400 sq.ft", type: "Buy", safety: 94, water: 88 },
    { id: 2, name: "Lakeview Residency", location: "Ooty", lat: 55, lng: 25, price: "₹85 L", area: "1800 sq.ft", type: "Rent", safety: 91, water: 95 },
    { id: 3, name: "Sunrise Plots", location: "Mettupalayam", lat: 25, lng: 65, price: "₹45 L", area: "3200 sq.ft", type: "Buy", safety: 87, water: 78 },
    { id: 4, name: "Urban Heights", location: "RS Puram", lat: 65, lng: 55, price: "₹2.8 Cr", area: "1600 sq.ft", type: "Buy", safety: 96, water: 82 },
    { id: 5, name: "Hilltop Gardens", location: "Coonoor", lat: 45, lng: 70, price: "₹1.5 Cr", area: "4000 sq.ft", type: "Buy", safety: 89, water: 92 },
];

const PropertyExplorerPage = () => {
    const [selected, setSelected] = useState<number | null>(null);
    const [filterType, setFilterType] = useState<"all" | "Buy" | "Rent">("all");
    const navigate = useNavigate();

    const filtered = properties.filter((p) => filterType === "all" || p.type === filterType);
    const selectedProp = properties.find((p) => p.id === selected);

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-[1200px] mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Property Explorer</h1>
                    <p className="text-muted-foreground text-sm mt-1">Explore verified properties on the interactive map.</p>
                </div>
                <div className="flex gap-2">
                    {(["all", "Buy", "Rent"] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilterType(f)}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filterType === f ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {f === "all" ? "All" : f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Map View */}
                <div className="lg:col-span-2 glass-card rounded-2xl overflow-hidden">
                    <div className="px-5 py-3 border-b border-border flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-foreground">Interactive Map View</span>
                        <span className="text-xs text-muted-foreground ml-auto">{filtered.length} properties found</span>
                    </div>
                    <div
                        className="relative h-[500px]"
                        style={{
                            background: `linear-gradient(135deg, hsl(145 30% 88%), hsl(200 30% 83%), hsl(160 25% 80%))`,
                        }}
                    >
                        {/* Grid overlay */}
                        <div className="absolute inset-0 opacity-15" style={{
                            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 50px, hsl(209 82% 30% / 0.1) 50px, hsl(209 82% 30% / 0.1) 51px),
                repeating-linear-gradient(90deg, transparent, transparent 50px, hsl(209 82% 30% / 0.1) 50px, hsl(209 82% 30% / 0.1) 51px)`
                        }} />

                        {/* Property Markers */}
                        {filtered.map((prop) => (
                            <motion.div
                                key={prop.id}
                                whileHover={{ scale: 1.2 }}
                                onClick={() => setSelected(prop.id)}
                                className={`absolute cursor-pointer transition-all ${selected === prop.id ? "z-20" : "z-10"}`}
                                style={{ left: `${prop.lng}%`, top: `${prop.lat}%` }}
                            >
                                <div className={`relative flex flex-col items-center`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${selected === prop.id ? "hero-gradient scale-110" : "bg-card border-2 border-primary"
                                        }`}>
                                        <MapPin className={`w-5 h-5 ${selected === prop.id ? "text-primary-foreground" : "text-primary"}`} />
                                    </div>
                                    {selected === prop.id && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="absolute top-12 bg-card rounded-xl shadow-xl border border-border p-3 w-44 z-30"
                                        >
                                            <p className="text-sm font-bold text-foreground">{prop.name}</p>
                                            <p className="text-xs text-muted-foreground">{prop.location}</p>
                                            <p className="text-sm font-bold text-primary mt-1">{prop.price}</p>
                                        </motion.div>
                                    )}
                                    {selected !== prop.id && (
                                        <span className="text-xs font-bold bg-card text-foreground px-2 py-0.5 rounded-md mt-1 shadow border border-border/50">
                                            {prop.price}
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Property List */}
                <div className="space-y-3 max-h-[560px] overflow-y-auto custom-scrollbar pr-1">
                    {filtered.map((prop) => (
                        <motion.div
                            key={prop.id}
                            whileHover={{ x: 2 }}
                            onClick={() => setSelected(prop.id)}
                            className={`glass-card rounded-2xl p-4 cursor-pointer transition-all ${selected === prop.id ? "border-primary shadow-lg shadow-primary/10" : "border-border/50"
                                }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-bold text-foreground">{prop.name}</h3>
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${prop.type === "Buy" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                                    }`}>{prop.type}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mb-3">{prop.location} • {prop.area}</p>
                            <div className="flex items-center justify-between">
                                <p className="text-base font-bold text-primary">{prop.price}</p>
                                <div className="flex gap-2">
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Shield className="w-3 h-3 text-accent" /> {prop.safety}
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Droplets className="w-3 h-3 text-blue-400" /> {prop.water}
                                    </div>
                                </div>
                            </div>
                            {selected === prop.id && (
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    onClick={(e) => { e.stopPropagation(); navigate(`/property/${prop.id}`); }}
                                    className="mt-3 w-full h-9 rounded-lg bg-primary/10 text-primary text-sm font-semibold hover:bg-primary/20 transition-colors flex items-center justify-center gap-1"
                                >
                                    View Details <ArrowRight className="w-3 h-3" />
                                </motion.button>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default PropertyExplorerPage;
