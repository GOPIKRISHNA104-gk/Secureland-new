import { motion } from "framer-motion";
import { Shield, MapPin, Satellite, AlertTriangle, SearchX, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FeatureCard from "@/components/FeatureCard";

const LandProtectionPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-[1200px] mx-auto space-y-8">
      {/* Hero Header */}
      <motion.div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-1">Land Protection</h1>
          <p className="text-muted-foreground text-sm">Secure, verify, and digitally monitor your properties.</p>
        </div>
        <div className="flex items-center gap-2 bg-primary/10 dark:bg-primary/20 backdrop-blur-md rounded-full px-4 py-2 border border-primary/20">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-primary">Protection Portal</span>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard icon={Shield} title="Register Land" description="Add property to protection network" variant="primary" onClick={() => navigate("/register-land")} />
        <FeatureCard icon={Satellite} title="Satellite Monitoring" description="Real-time boundary surveillance" variant="accent" onClick={() => navigate("/satellite")} />
        <FeatureCard icon={AlertTriangle} title="Fraud Detection" description="AI-powered fraud analysis" variant="warning" onClick={() => navigate("/fraud-protection")} />
        <FeatureCard icon={MapPin} title="Digital Twin" description="3D land visualization" variant="primary" />
      </div>

      <div className="glass-card rounded-[24px] p-12 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

        {/* Beautiful Empty State */}
        <div className="relative z-10 flex flex-col items-center max-w-md mx-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-32 h-32 rounded-3xl bg-secondary/80 flex items-center justify-center mb-6 shadow-xl shadow-primary/10 border border-border/50 relative"
          >
            <div className="absolute -inset-4 bg-primary/10 blur-2xl rounded-full" />
            <SearchX className="w-12 h-12 text-muted-foreground" />
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-background border border-border/50 flex items-center justify-center shadow-lg">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
          </motion.div>

          <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">No Land Registered Yet</h3>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            You haven't added any properties to your SecureLand portfolio. Register your first property to activate AI monitoring, satellite surveillance, and fraud protection.
          </p>

          <motion.button
            whileHover={{ scale: 1.02, translateY: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/register-land")}
            className="flex items-center gap-2 hero-gradient-subtle px-8 py-3.5 rounded-full text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all border border-white/10"
          >
            <Plus className="w-5 h-5" />
            Register New Land
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default LandProtectionPage;
