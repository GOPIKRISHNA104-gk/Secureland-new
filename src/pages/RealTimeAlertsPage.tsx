import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, AlertTriangle, Shield, MapPin, Satellite, Clock, CheckCircle, XCircle, Filter } from "lucide-react";

const alerts = [
    {
        id: 1,
        type: "boundary",
        severity: "high",
        title: "Boundary Breach Detected",
        description: "Unusual activity detected along the eastern boundary of Plot #SL-2847A near marker point E3.",
        location: "Coimbatore North, Plot #SL-2847A",
        time: "2 minutes ago",
        status: "active",
    },
    {
        id: 2,
        type: "fraud",
        severity: "critical",
        title: "Fraudulent Registration Attempt",
        description: "An unauthorized party attempted to register a sub-division of your land at the local sub-registrar office.",
        location: "Survey No. 42A, Ooty Road",
        time: "15 minutes ago",
        status: "active",
    },
    {
        id: 3,
        type: "satellite",
        severity: "medium",
        title: "Construction Activity Nearby",
        description: "Satellite imagery shows new construction activity within 50m of your northern boundary.",
        location: "Adjacent to Plot #SL-2847A",
        time: "1 hour ago",
        status: "investigating",
    },
    {
        id: 4,
        type: "boundary",
        severity: "low",
        title: "Vegetation Change Detected",
        description: "Seasonal vegetation changes detected on your property. No human activity suspected.",
        location: "Southern boundary, Plot #SL-2847A",
        time: "3 hours ago",
        status: "resolved",
    },
    {
        id: 5,
        type: "fraud",
        severity: "medium",
        title: "Document Verification Request",
        description: "A third party has requested verification of your ownership documents at the district registrar.",
        location: "District Registrar Office, CBE",
        time: "6 hours ago",
        status: "resolved",
    },
];

const severityConfig = {
    critical: { color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/30", badge: "bg-red-500" },
    high: { color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/30", badge: "bg-orange-500" },
    medium: { color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/30", badge: "bg-yellow-500" },
    low: { color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/30", badge: "bg-emerald-500" },
};

const statusConfig = {
    active: { icon: AlertTriangle, label: "Active", color: "text-red-400", bg: "bg-red-500/10" },
    investigating: { icon: Clock, label: "Investigating", color: "text-yellow-400", bg: "bg-yellow-500/10" },
    resolved: { icon: CheckCircle, label: "Resolved", color: "text-emerald-400", bg: "bg-emerald-500/10" },
};

const RealTimeAlertsPage = () => {
    const [filter, setFilter] = useState<"all" | "active" | "resolved">("all");

    const filtered = alerts.filter((a) => {
        if (filter === "all") return true;
        if (filter === "active") return a.status === "active" || a.status === "investigating";
        return a.status === "resolved";
    });

    const activeCount = alerts.filter((a) => a.status === "active").length;
    const criticalCount = alerts.filter((a) => a.severity === "critical").length;

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-[1200px] mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Real-Time Alerts</h1>
                    <p className="text-muted-foreground text-sm mt-1">Live monitoring of your land protection events.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-sm font-semibold text-red-500">{activeCount} Active</span>
                    </div>
                    {criticalCount > 0 && (
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20">
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                            <span className="text-sm font-semibold text-red-500">{criticalCount} Critical</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-4">
                {[
                    { label: "Total Alerts", value: alerts.length, icon: Bell, color: "text-primary" },
                    { label: "Active Alerts", value: activeCount, icon: AlertTriangle, color: "text-red-500" },
                    { label: "Investigating", value: alerts.filter((a) => a.status === "investigating").length, icon: Clock, color: "text-yellow-500" },
                    { label: "Resolved", value: alerts.filter((a) => a.status === "resolved").length, icon: CheckCircle, color: "text-emerald-500" },
                ].map((stat) => (
                    <div key={stat.label} className="glass-card rounded-2xl p-5">
                        <div className="flex items-center justify-between mb-3">
                            <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-xs text-muted-foreground font-medium mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2">
                {(["all", "active", "resolved"] as const).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filter === f
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                : "bg-secondary text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            {/* Alerts List */}
            <div className="space-y-4">
                {filtered.map((alert, i) => {
                    const sev = severityConfig[alert.severity as keyof typeof severityConfig];
                    const stat = statusConfig[alert.status as keyof typeof statusConfig];
                    return (
                        <motion.div
                            key={alert.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={`glass-card rounded-2xl p-6 border-l-4 ${sev.border} hover:shadow-lg transition-shadow`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded-md ${sev.bg} ${sev.color}`}>
                                            {alert.severity}
                                        </span>
                                        <div className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md ${stat.bg} ${stat.color}`}>
                                            <stat.icon className="w-3 h-3" />
                                            {stat.label}
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground mb-1">{alert.title}</h3>
                                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{alert.description}</p>
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {alert.location}</span>
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {alert.time}</span>
                                    </div>
                                </div>
                                {alert.status === "active" && (
                                    <button className="shrink-0 px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-semibold hover:bg-primary/20 transition-colors">
                                        Investigate
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default RealTimeAlertsPage;
