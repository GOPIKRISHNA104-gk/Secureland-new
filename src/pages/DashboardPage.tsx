import { motion } from "framer-motion";
import { Shield, Satellite, AlertTriangle, TrendingUp, Map as MapIcon, Maximize, Activity } from "lucide-react";
import AlertCard from "@/components/AlertCard";
import ScoreGauge from "@/components/ScoreGauge";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { month: "Jan", value: 3.2 }, { month: "Feb", value: 3.4 }, { month: "Mar", value: 3.5 },
  { month: "Apr", value: 3.8 }, { month: "May", value: 4.1 }, { month: "Jun", value: 4.5 },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const DashboardPage = () => {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 max-w-[1400px]">
      {/* Hero Header */}
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-1">Overview</h1>
          <p className="text-muted-foreground text-sm">Monitor your land portfolio, AI insights, and threat detection.</p>
        </div>
        <div className="flex items-center gap-2 bg-primary/10 dark:bg-primary/20 backdrop-blur-md rounded-full px-4 py-2 border border-primary/20 shadow-[0_0_15px_rgba(37,99,235,0.2)]">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-semibold text-primary">Live Scan Active</span>
        </div>
      </motion.div>

      {/* Top Row: AI Score Gauges */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card-hover p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary/80" />
          <ScoreGauge score={96} label="Land Protection" variant="primary" />
          <p className="text-xs text-muted-foreground mt-3">Status: Secured</p>
        </div>
        <div className="glass-card-hover p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-destructive/80" />
          <ScoreGauge score={12} label="Fraud Risk" variant="destructive" />
          <p className="text-xs text-muted-foreground mt-3">Status: Low Risk</p>
        </div>
        <div className="glass-card-hover p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-accent/80" />
          <ScoreGauge score={88} label="Construction Safety" variant="accent" />
          <p className="text-xs text-muted-foreground mt-3">Status: Excellent</p>
        </div>
        <div className="glass-card-hover p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-cyan/80" />
          <ScoreGauge score={94} label="Water Availability" variant="primary" />
          <p className="text-xs text-muted-foreground mt-3">Status: Abundant</p>
        </div>
      </motion.div>

      {/* Main Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Charts: AI Land Insights */}
        <motion.div variants={item} className="lg:col-span-2 glass-card rounded-2xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Land Value Growth</h3>
              <p className="text-xs text-muted-foreground">AI Predicted Valuation (in Crores ₹)</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex-1 min-h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
                  itemStyle={{ color: "hsl(var(--foreground))", fontWeight: "600" }}
                />
                <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} activeDot={{ r: 6, fill: "hsl(var(--primary))", stroke: "hsl(var(--background))", strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Digital Land Twin Visualization */}
        <motion.div variants={item} className="glass-card rounded-2xl p-6 flex flex-col relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div>
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <MapIcon className="w-5 h-5 text-primary" /> Digital Twin
              </h3>
              <p className="text-xs text-muted-foreground">Plot #SL-2847A</p>
            </div>
            <button className="text-muted-foreground hover:text-primary transition-colors">
              <Maximize className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 relative rounded-xl overflow-hidden border border-border/50 bg-[#cce3d8] dark:bg-[#1a2e24] shadow-inner flex items-center justify-center perspective-[1000px] mt-2 mb-4">
            {/* Mock Satellite Map Background */}
            <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }} />

            {/* 3D Polygon overlay */}
            <motion.div
              animate={{ rotateX: [20, 30, 20], rotateZ: [-10, -5, -10] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              className="relative w-40 h-40 border-[3px] border-primary bg-primary/20 backdrop-blur-sm shadow-[0_0_30px_rgba(37,99,235,0.4)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Corner markers */}
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border border-primary rounded-full" />
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border border-primary rounded-full" />
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border border-primary rounded-full" />
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border border-primary rounded-full" />

              {/* Center scan line */}
              <div className="absolute left-0 w-full h-0.5 bg-primary/50 scan-line" />
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs relative z-10">
            <div className="bg-secondary/50 rounded-lg p-2 border border-border/50">
              <span className="text-muted-foreground block text-[10px] mb-0.5">Coordinates</span>
              <span className="font-mono text-foreground font-medium">12.97°N, 77.59°E</span>
            </div>
            <div className="bg-secondary/50 rounded-lg p-2 border border-border/50">
              <span className="text-muted-foreground block text-[10px] mb-0.5">Total Area</span>
              <span className="font-mono text-foreground font-medium">2.4 Acres</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div variants={item} className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Activity className="w-4 h-4 text-warning" /> Live Alerts & Monitoring
            </h3>
            <span className="text-xs bg-secondary px-2 py-1 rounded text-muted-foreground">Last 24h</span>
          </div>
          <div className="space-y-3">
            <AlertCard severity="critical" title="Boundary Change Detected" description="Physical encroachment risk detected via SAR satellite." timestamp="12 mins ago" />
            <AlertCard severity="warning" title="Document Forgery Risk" description="Automated AI check found anomalies in latest transfer deed." timestamp="2 hours ago" />
            <AlertCard severity="success" title="Water Table Stable" description="Groundwater depth remains at optimal 45ft." timestamp="5 hours ago" />
          </div>
        </motion.div>

        <motion.div variants={item} className="glass-card rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -mx-20 -my-20 pointer-events-none" />
          <h3 className="text-sm font-semibold text-foreground mb-4">AI Insight Panel</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary/40 border border-border/50 rounded-xl p-4 hover:shadow-md transition-shadow">
              <p className="text-xs text-muted-foreground mb-1">Dispute Probability</p>
              <p className="text-2xl font-bold text-foreground">2.4<span className="text-sm text-foreground/60">%</span></p>
              <p className="text-[10px] text-primary mt-2 font-medium bg-primary/10 inline-block px-1.5 py-0.5 rounded">Highly Secure</p>
            </div>
            <div className="bg-secondary/40 border border-border/50 rounded-xl p-4 hover:shadow-md transition-shadow">
              <p className="text-xs text-muted-foreground mb-1">Investment Score</p>
              <p className="text-2xl font-bold text-foreground">94<span className="text-sm text-foreground/60">/100</span></p>
              <p className="text-[10px] text-accent mt-2 font-medium bg-accent/10 inline-block px-1.5 py-0.5 rounded">Top 5% Region</p>
            </div>
          </div>
          <button className="w-full mt-4 py-2.5 rounded-xl hero-gradient-subtle text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-[0_4px_14px_0_rgba(37,99,235,0.39)]">
            Generate Comprehensive AI Report
          </button>
        </motion.div>
      </div>

    </motion.div>
  );
};

export default DashboardPage;
