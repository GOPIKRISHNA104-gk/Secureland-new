import { motion } from "framer-motion";
import { Droplets, Waves, MapPin, Search } from "lucide-react";
import ScoreGauge from "@/components/ScoreGauge";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

const waterData = [
  { month: "Jan", depth: 45 }, { month: "Feb", depth: 42 }, { month: "Mar", depth: 38 },
  { month: "Apr", depth: 35 }, { month: "May", depth: 30 }, { month: "Jun", depth: 28 },
  { month: "Jul", depth: 32 }, { month: "Aug", depth: 40 }, { month: "Sep", depth: 48 },
];

const WaterIntelligencePage = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-[1200px] mx-auto space-y-8">
      {/* Hero Header */}
      <motion.div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-1">Water Intelligence</h1>
          <p className="text-muted-foreground text-sm">Groundwater depth analysis and reliable source tracking.</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-500/10 dark:bg-blue-500/20 backdrop-blur-md rounded-full px-4 py-2 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
          <Droplets className="w-4 h-4 text-blue-500" />
          <span className="text-xs font-semibold text-blue-500">Live Hydrology Data Active</span>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Groundwater Depth Meter */}
        <div className="glass-card rounded-[24px] p-8 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-blue-500/5" />

          {/* Wave animation simulation */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-blue-500/10 dark:bg-blue-500/20 translate-y-8 group-hover:translate-y-4 transition-transform duration-1000 ease-in-out" style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }} />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-cyan-500/10 dark:bg-cyan-500/20 translate-y-6 group-hover:translate-y-2 transition-transform duration-700 ease-in-out" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }} />

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-[0_10px_20px_rgba(59,130,246,0.5)]">
              <Droplets className="w-8 h-8 text-white" />
            </div>
            <p className="text-4xl font-black text-foreground mb-1 tracking-tight">32<span className="text-2xl text-muted-foreground font-semibold">m</span></p>
            <p className="text-sm text-foreground font-medium bg-background/50 px-3 py-1 rounded-full border border-border/50 inline-block backdrop-blur-md mt-2">Groundwater Depth</p>
          </div>
        </div>

        {/* Water Availability Score */}
        <div className="glass-card rounded-[24px] p-8 text-center flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
          <ScoreGauge score={94} label="Availability Rating" variant="primary" size="lg" />
          <p className="text-sm font-semibold text-cyan-500 mt-4 bg-cyan-500/10 px-3 py-1 rounded-full">Abundant Resource</p>
        </div>

        {/* Nearby Sources Count */}
        <div className="glass-card rounded-[24px] p-8 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-accent/5" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-orange-400 flex items-center justify-center mx-auto mb-4 shadow-[0_10px_20px_rgba(245,158,11,0.3)] group-hover:scale-110 transition-transform duration-500">
              <Waves className="w-8 h-8 text-white" />
            </div>
            <p className="text-4xl font-black text-foreground mb-1">4</p>
            <p className="text-sm text-muted-foreground font-medium">Verified Local Sources</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card rounded-[24px] p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Groundwater Trend Level</h3>
              <p className="text-xs text-muted-foreground">Historical depth analysis (in meters)</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={waterData}>
              <defs>
                <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} reversed />
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
                itemStyle={{ color: "hsl(var(--foreground))", fontWeight: "600" }}
              />
              <Area type="monotone" dataKey="depth" stroke="#3b82f6" fill="url(#waterGrad)" strokeWidth={3} activeDot={{ r: 6, fill: "#3b82f6", stroke: "hsl(var(--background))", strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-[24px] p-8 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Nearby Sources</h3>
            <button className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
              <Search className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          <div className="flex-1 space-y-4">
            {[
              { name: "Hebbal Lake", dist: "1.2 km", type: "Surface Water", capacity: "High" },
              { name: "Arkavathy River", dist: "3.5 km", type: "Flowing", capacity: "High" },
              { name: "Borewell #142", dist: "0.8 km", type: "Groundwater", capacity: "Medium" },
              { name: "Community Tank", dist: "2.1 km", type: "Reservoir", capacity: "Low" },
            ].map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col gap-2 p-4 bg-secondary/40 rounded-xl border border-border/50 hover:border-primary/30 transition-colors group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-semibold text-foreground">{s.name}</p>
                  </div>
                  <span className="text-[10px] font-mono bg-background px-2 py-0.5 rounded text-muted-foreground border border-border/50">{s.dist}</span>
                </div>
                <div className="flex items-center justify-between pl-6 text-xs text-muted-foreground">
                  <span>{s.type}</span>
                  <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-medium",
                    s.capacity === "High" ? "bg-primary/10 text-primary" :
                      s.capacity === "Medium" ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"
                  )}>
                    {s.capacity} Yield
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WaterIntelligencePage;
