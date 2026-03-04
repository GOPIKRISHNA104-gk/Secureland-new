import { motion } from "framer-motion";
import { Building2, Droplets, Mountain, Activity, ShieldCheck, AlertTriangle } from "lucide-react";
import ScoreGauge from "@/components/ScoreGauge";
import { cn } from "@/lib/utils";

const stabilityData = [
  { name: "Flood Risk", score: 15, label: "Low Risk", color: "bg-primary", icon: Droplets },
  { name: "Soil Strength", score: 85, label: "High Strength", color: "bg-accent", icon: Mountain },
  { name: "Earthquake Zone", score: 40, label: "Moderate (Zone III)", color: "bg-warning", icon: Activity },
  { name: "Slope Analysis", score: 90, label: "Stable Terrain", color: "bg-primary", icon: Building2 },
];

const ConstructionAnalyzerPage = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-[1200px] mx-auto space-y-8">
      {/* Hero Header */}
      <motion.div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-1">Construction Safety</h1>
          <p className="text-muted-foreground text-sm">AI-powered terrain and stability analysis for your registered properties.</p>
        </div>
        <div className="flex items-center gap-2 bg-accent/10 dark:bg-accent/20 backdrop-blur-md rounded-full px-4 py-2 border border-accent/20">
          <ShieldCheck className="w-4 h-4 text-accent" />
          <span className="text-xs font-semibold text-accent">Analysis Verified</span>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Main Score Gauge Panel */}
        <div className="glass-card rounded-[24px] p-8 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsla(var(--primary),0.1),transparent_70%)] pointer-events-none" />

          <div className="mb-8 text-center relative z-10 w-full">
            <h3 className="text-lg font-semibold text-foreground">Total Safety Score</h3>
            <p className="text-sm text-muted-foreground">Aggregated physical and environmental data</p>
          </div>

          <div className="relative z-10 w-64 h-64 mb-6">
            <ScoreGauge score={88} label="Safety Rating" variant="primary" size="lg" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/5 rounded-full backdrop-blur-[2px]">
              <span className="font-bold text-lg text-primary">Highly Safe</span>
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl relative z-10 w-full flex gap-3">
            <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
            <p className="text-sm text-foreground/80 leading-relaxed font-medium">
              This land plot demonstrates excellent soil bearing capacity and minimal flood risks. It is certified for large-scale multi-story construction.
            </p>
          </div>
        </div>

        {/* Breakdown Risk Bars */}
        <div className="glass-card rounded-[24px] p-8 flex flex-col">
          <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-accent" /> Detailed Breakdown
          </h3>

          <div className="space-y-8 flex-1">
            {stabilityData.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-foreground font-medium">
                    <item.icon className={cn("w-4 h-4", item.score > 50 ? "text-primary" : "text-warning")} />
                    {item.name}
                  </div>
                  <span className="text-xs text-muted-foreground font-medium bg-secondary/50 px-2 py-0.5 rounded border border-border/50">
                    {item.label}
                  </span>
                </div>
                <div className="h-3 w-full bg-secondary rounded-full overflow-hidden shadow-inner flex">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.score}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={cn("h-full rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)]", item.color)}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground pt-1">
                  <span>Critical Risk</span>
                  <span className="font-mono text-foreground">{item.score}/100</span>
                  <span>Optimal</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-border/50">
            <div className="flex items-start gap-3 bg-warning/5 rounded-xl p-4 border border-warning/20">
              <AlertTriangle className="w-5 h-5 text-warning shrink-0" />
              <div className="text-sm text-foreground/80">
                <span className="font-semibold text-warning">Note:</span> The property sits within Moderate Earthquake Zone III. Standard seismic reinforcement is legally required for clearance.
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ConstructionAnalyzerPage;
