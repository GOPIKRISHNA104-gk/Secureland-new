import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Map, Fingerprint, CheckCircle, Hexagon, ArrowRight, Sparkles } from "lucide-react";

const DigitalTwinPage = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState<"generating" | "complete">("generating");

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setPhase("complete"), 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 80);
        return () => clearInterval(interval);
    }, []);

    const steps = [
        { label: "Processing Coordinates", threshold: 20 },
        { label: "Generating Boundary Hash", threshold: 40 },
        { label: "Creating 3D Terrain Model", threshold: 60 },
        { label: "Linking Owner Identity", threshold: 80 },
        { label: "Storing on Blockchain", threshold: 95 },
    ];

    return (
        <div className="min-h-screen hero-gradient flex items-center justify-center p-6 relative overflow-hidden">
            {/* Particle Background */}
            <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `radial-gradient(circle at 30% 30%, hsla(190,100%,50%,0.4) 0%, transparent 50%),
          radial-gradient(circle at 70% 70%, hsla(145,65%,32%,0.3) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, hsla(209,82%,50%,0.2) 0%, transparent 60%)`
            }} />

            {/* Animated Grid */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(255,255,255,0.2) 60px),
          repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(255,255,255,0.2) 60px)`
            }} />

            <div className="relative z-10 w-full max-w-2xl text-center">
                {phase === "generating" ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-10"
                    >
                        {/* Animated Hexagon Icon */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            className="w-32 h-32 mx-auto relative"
                        >
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Hexagon className="w-32 h-32 text-cyan/30" strokeWidth={0.5} />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <Fingerprint className="w-14 h-14 text-primary-foreground drop-shadow-[0_0_20px_rgba(0,210,255,0.8)]" />
                                </motion.div>
                            </div>
                        </motion.div>

                        <div>
                            <h1 className="text-3xl font-extrabold text-primary-foreground mb-3 tracking-tight">
                                Generating Digital Twin
                            </h1>
                            <p className="text-primary-foreground/60 text-sm">
                                SecureLand AI is creating the permanent digital identity of your land.
                            </p>
                        </div>

                        {/* Progress Bar */}
                        <div className="max-w-md mx-auto">
                            <div className="h-3 w-full bg-primary-foreground/10 rounded-full overflow-hidden backdrop-blur-sm border border-primary-foreground/10">
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{
                                        background: "linear-gradient(90deg, #3b82f6, #00d2ff, #10b981)",
                                        width: `${progress}%`,
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                            <p className="text-primary-foreground/80 text-sm font-mono mt-3">{progress}%</p>
                        </div>

                        {/* Processing Steps */}
                        <div className="space-y-3 max-w-sm mx-auto text-left">
                            {steps.map((s, i) => (
                                <motion.div
                                    key={s.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: progress >= s.threshold ? 1 : 0.3, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${progress >= s.threshold
                                            ? "bg-cyan/20 border-cyan text-cyan"
                                            : "border-primary-foreground/20 text-primary-foreground/30"
                                        }`}>
                                        {progress >= s.threshold ? (
                                            <CheckCircle className="w-4 h-4" />
                                        ) : (
                                            <span className="w-2 h-2 bg-primary-foreground/20 rounded-full" />
                                        )}
                                    </div>
                                    <span className={`text-sm font-medium ${progress >= s.threshold ? "text-primary-foreground" : "text-primary-foreground/30"
                                        }`}>
                                        {s.label}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, type: "spring" }}
                        className="space-y-8"
                    >
                        {/* Success State */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="w-28 h-28 mx-auto rounded-3xl bg-accent/20 backdrop-blur-xl border border-accent/30 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.4)]"
                        >
                            <CheckCircle className="w-14 h-14 text-accent" />
                        </motion.div>

                        <div>
                            <h1 className="text-3xl font-extrabold text-primary-foreground mb-3 tracking-tight">
                                Digital Twin Created!
                            </h1>
                            <p className="text-primary-foreground/60 text-sm max-w-md mx-auto">
                                Your land's digital identity has been securely generated and stored on the blockchain. You can now monitor, verify and protect this property.
                            </p>
                        </div>

                        {/* Twin Details Card */}
                        <div className="glass rounded-2xl p-6 max-w-lg mx-auto text-left space-y-4">
                            <div className="flex items-center gap-3 mb-4">
                                <Sparkles className="w-5 h-5 text-cyan" />
                                <span className="text-sm font-bold text-primary-foreground">Digital Twin Summary</span>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: "Twin ID", value: "DT-SL-2847A" },
                                    { label: "Fingerprint", value: "FP-KA-BLR-92X" },
                                    { label: "Blockchain TX", value: "0x7f3a...c91d" },
                                    { label: "Created At", value: new Date().toLocaleDateString() },
                                ].map((item) => (
                                    <div key={item.label} className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-3">
                                        <p className="text-xs text-primary-foreground/50 font-medium">{item.label}</p>
                                        <p className="text-sm font-bold text-primary-foreground font-mono mt-0.5">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                            <button
                                onClick={() => navigate("/dashboard")}
                                className="flex-1 h-12 rounded-xl hero-gradient-subtle text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 border border-white/10"
                            >
                                <Shield className="w-4 h-4" /> Go to Dashboard
                            </button>
                            <button
                                onClick={() => navigate("/register-land")}
                                className="flex-1 h-12 rounded-xl bg-primary-foreground/10 backdrop-blur border border-primary-foreground/20 text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:bg-primary-foreground/20 transition-all"
                            >
                                <Map className="w-4 h-4" /> Register Another
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default DigitalTwinPage;
