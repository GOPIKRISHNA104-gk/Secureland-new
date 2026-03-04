import { motion } from "framer-motion";
import { Shield, Fingerprint, CheckCircle, AlertTriangle, Lock, TrendingUp, ShieldAlert } from "lucide-react";
import ScoreGauge from "@/components/ScoreGauge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

const valueData = [
  { year: "2020", value: 45 }, { year: "2021", value: 52 }, { year: "2022", value: 58 },
  { year: "2023", value: 65 }, { year: "2024", value: 78 }, { year: "2025", value: 92 },
];

const FraudProtectionPage = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-full max-w-[1400px] mx-auto space-y-8 pb-8">
      {/* Hero Header */}
      <motion.div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-1">AI Insights & Fraud Detection</h1>
          <p className="text-muted-foreground text-sm">Predictive valuation and deep ownership history verification.</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-500/10 dark:bg-emerald-500/20 backdrop-blur-md rounded-full px-4 py-2 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
          <ShieldAlert className="w-4 h-4 text-emerald-500" />
          <span className="text-xs font-semibold text-emerald-500">Protection Active</span>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Fraud Risk Score */}
        <div className="glass-card rounded-[24px] p-8 text-center flex flex-col items-center justify-center relative overflow-hidden group border border-border/50 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />

          <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2 relative z-10">
            Fraud Risk Score
          </h3>
          <p className="text-xs text-muted-foreground mb-8 relative z-10">Comprehensive title & history check</p>

          <div className="relative z-10">
            <ScoreGauge score={98} label="" variant="primary" size="lg" />
          </div>

          <div className="mt-8 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl relative z-10 w-full flex gap-3 text-left">
            <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0" />
            <div>
              <p className="text-sm text-foreground font-bold">98% Safe</p>
              <p className="text-xs text-muted-foreground mt-0.5">No duplicate registrations found.</p>
            </div>
          </div>
        </div>

        {/* Predictive Land Value Chart */}
        <div className="lg:col-span-2 glass-card rounded-[24px] p-8 relative overflow-hidden border border-border/50 shadow-2xl">
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div>
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary" /> Predictive Land Value</h3>
              <p className="text-xs text-muted-foreground">AI-forecasted market appreciation based on infrastructure developments</p>
            </div>
            <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold border border-primary/20">
              ROI: +104% (5Y)
            </div>
          </div>
          <div className="relative z-10 h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={valueData}>
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="year" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} padding={{ left: 20, right: 20 }} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value}L`} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
                  itemStyle={{ color: "hsl(var(--foreground))", fontWeight: "600" }}
                  formatter={(value: number) => [`₹${value} Lakhs`, 'Value']}
                />
                <Line type="monotone" dataKey="value" stroke="url(#lineGrad)" strokeWidth={4} activeDot={{ r: 8, fill: "#10b981", stroke: "hsl(var(--background))", strokeWidth: 2 }} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 pt-4">
        {/* Verification Checkpoints */}
        <div className="glass-card rounded-[24px] p-8 border border-border/50 shadow-xl">
          <h3 className="text-lg font-semibold text-foreground mb-6">Verification Ledger</h3>
          <div className="space-y-4">
            {[
              { icon: CheckCircle, title: "Title Deed Hash", desc: "Blockchain record verified on Polygon network", status: "verified" },
              { icon: Lock, title: "Owner Authentication", desc: "Aadhaar e-KYC linked to property deed", status: "verified" },
              { icon: Shield, title: "Encumbrance Status", desc: "Zero active liens or mortgages detected", status: "verified" },
              { icon: AlertTriangle, title: "Litigation Check", desc: "Low risk. Minor adjacent plot dispute resolved 2019.", status: "warning" },
            ].map((item, i) => (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={item.title}
                className="bg-secondary/40 rounded-xl p-4 flex items-start gap-4 border border-border/50 hover:border-border transition-colors"
              >
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-inner",
                  item.status === "verified" ? "bg-emerald-500/10 border-emerald-500/20" : "bg-warning/10 border-warning/20"
                )}>
                  <item.icon className={cn("w-5 h-5", item.status === "verified" ? "text-emerald-500" : "text-warning")} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Boundary Fingerprint Identity */}
        <div className="glass-card rounded-[24px] p-8 flex flex-col items-center justify-center relative overflow-hidden text-center border border-border/50 shadow-xl">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6 relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-75" />
            <Fingerprint className="w-12 h-12 text-primary relative z-10 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Digital Twin Fingerprint</h3>
          <p className="text-sm text-muted-foreground max-w-sm mb-6">
            A unique cryptographic hash is generated from the exact GPS coordinate boundaries of your land to prevent physical displacement spoofing.
          </p>
          <div className="bg-background/80 backdrop-blur-md border border-border/50 px-6 py-3 rounded-full shadow-lg">
            <p className="text-sm text-primary font-mono tracking-widest font-bold">FP-2847A-KA-BLR-92X</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FraudProtectionPage;
