import {
  LayoutDashboard, Shield, FileText, Satellite, AlertTriangle,
  Building2, Droplets, Store, TrendingUp, BarChart3, Settings,
  ChevronLeft, ChevronRight, Menu
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { title: "Register Land", path: "/register-land", icon: FileText },
  { title: "Land Protection", path: "/land-protection", icon: Shield },
  { title: "Satellite Monitoring", path: "/satellite", icon: Satellite },
  { title: "Fraud Protection", path: "/fraud-protection", icon: AlertTriangle },
  { title: "Construction Analyzer", path: "/construction", icon: Building2 },
  { title: "Water Intelligence", path: "/water", icon: Droplets },
  { title: "Property Intelligence", path: "/investments", icon: TrendingUp },
  { title: "Marketplace", path: "/marketplace", icon: Store },
  { title: "Reports", path: "/reports", icon: BarChart3 },
  { title: "Settings", path: "/settings", icon: Settings },
];

const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-[calc(100vh-68px)] sticky top-[68px] glass-light dark:bg-card/40 border-r border-border/40 flex flex-col overflow-hidden z-40 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]"
    >
      <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-300 group relative overflow-hidden",
                isActive
                  ? "text-primary font-semibold bg-primary/10 shadow-[inset_4px_0_0_0_hsl(var(--primary))] dark:bg-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="active-sidebar-bg"
                    className="absolute inset-0 bg-primary/5 dark:bg-primary/10 z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon className={cn("w-[22px] h-[22px] shrink-0 z-10 transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="whitespace-nowrap z-10"
                    >
                      {item.title}
                    </motion.span>
                  )}
                </AnimatePresence>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border/40">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all border border-transparent hover:border-border/50"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </motion.aside>
  );
};

export default AppSidebar;
