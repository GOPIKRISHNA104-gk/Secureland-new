import { motion } from "framer-motion";
import { Shield, Droplets, Building2, AlertTriangle, MapPin, TrendingUp, Users, Wifi, TreePine, Star } from "lucide-react";

const areas = [
    {
        name: "Coimbatore North",
        overall: 92,
        scores: { crime: 94, flood: 88, construction: 96, infrastructure: 90, greenCover: 85, connectivity: 93 },
        trend: "+3.2%",
        population: "1.2L",
    },
    {
        name: "RS Puram",
        overall: 96,
        scores: { crime: 97, flood: 92, construction: 98, infrastructure: 95, greenCover: 78, connectivity: 97 },
        trend: "+5.1%",
        population: "85K",
    },
    {
        name: "Ooty Road",
        overall: 84,
        scores: { crime: 86, flood: 75, construction: 90, infrastructure: 82, greenCover: 92, connectivity: 80 },
        trend: "+1.8%",
        population: "60K",
    },
    {
        name: "Mettupalayam",
        overall: 78,
        scores: { crime: 82, flood: 70, construction: 85, infrastructure: 72, greenCover: 95, connectivity: 68 },
        trend: "+0.5%",
        population: "45K",
    },
];

const scoreConfig = [
    { key: "crime", label: "Crime Safety", icon: Shield, color: "text-emerald-500", bgColor: "bg-emerald-500" },
    { key: "flood", label: "Flood Risk", icon: Droplets, color: "text-blue-500", bgColor: "bg-blue-500" },
    { key: "construction", label: "Construction", icon: Building2, color: "text-purple-500", bgColor: "bg-purple-500" },
    { key: "infrastructure", label: "Infrastructure", icon: Wifi, color: "text-orange-500", bgColor: "bg-orange-500" },
    { key: "greenCover", label: "Green Cover", icon: TreePine, color: "text-green-500", bgColor: "bg-green-500" },
    { key: "connectivity", label: "Connectivity", icon: TrendingUp, color: "text-cyan-500", bgColor: "bg-cyan-500" },
];

const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-500";
    if (score >= 75) return "text-yellow-500";
    return "text-red-500";
};

const AreaSafetyPage = () => {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-[1200px] mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Area Safety Scores</h1>
                <p className="text-muted-foreground text-sm mt-1">AI-analyzed safety and livability scores for different areas.</p>
            </div>

            {/* Score Legend */}
            <div className="flex flex-wrap gap-3">
                {scoreConfig.map((s) => (
                    <div key={s.key} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border/50">
                        <s.icon className={`w-3.5 h-3.5 ${s.color}`} />
                        <span className="text-xs font-medium text-foreground">{s.label}</span>
                    </div>
                ))}
            </div>

            {/* Area Cards */}
            <div className="space-y-6">
                {areas.map((area, i) => (
                    <motion.div
                        key={area.name}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card rounded-2xl p-6"
                    >
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-4">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${area.overall >= 90 ? "bg-emerald-500/10" : area.overall >= 80 ? "bg-yellow-500/10" : "bg-red-500/10"
                                    }`}>
                                    <span className={`text-2xl font-extrabold ${getScoreColor(area.overall)}`}>{area.overall}</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground">{area.name}</h3>
                                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Tamil Nadu</span>
                                        <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {area.population}</span>
                                        <span className={`flex items-center gap-1 font-semibold ${area.trend.startsWith("+") ? "text-accent" : "text-red-500"}`}>
                                            <TrendingUp className="w-3 h-3" /> {area.trend} YoY
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} className={`w-4 h-4 ${s <= Math.round(area.overall / 20) ? "text-yellow-400 fill-yellow-400" : "text-border"}`} />
                                ))}
                            </div>
                        </div>

                        {/* Score Bars */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {scoreConfig.map((sc) => {
                                const score = area.scores[sc.key as keyof typeof area.scores];
                                return (
                                    <div key={sc.key}>
                                        <div className="flex items-center justify-between mb-1.5">
                                            <div className="flex items-center gap-1.5">
                                                <sc.icon className={`w-3.5 h-3.5 ${sc.color}`} />
                                                <span className="text-xs font-medium text-foreground">{sc.label}</span>
                                            </div>
                                            <span className={`text-xs font-bold ${getScoreColor(score)}`}>{score}</span>
                                        </div>
                                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${score}%` }}
                                                transition={{ duration: 1, delay: i * 0.1 }}
                                                className={`h-full rounded-full ${sc.bgColor}`}
                                                style={{ opacity: 0.8 }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default AreaSafetyPage;
