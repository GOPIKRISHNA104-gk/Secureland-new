import { Search, Bell, Globe, Moon, Sun, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check local storage or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 h-[68px] glass-light border-b border-border/40 flex items-center justify-between px-6 lg:px-10"
    >
      <div className="flex items-center gap-3 w-[220px]">
        <div className="w-10 h-10 rounded-xl hero-gradient flex items-center justify-center shadow-lg shadow-primary/20">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-foreground hidden sm:block">
          Secure<span className="gradient-text font-black">Land</span>
        </span>
      </div>

      <div className="flex-1 max-w-xl mx-8 hidden md:block">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search verified lands, coordinates, owners..."
            className="w-full h-11 pl-10 pr-4 rounded-full bg-secondary/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 focus:bg-background transition-all"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-border/50 bg-secondary/50 px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 justify-end w-[220px]">
        <button 
          onClick={toggleTheme}
          className="w-10 h-10 rounded-full hover:bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <button className="w-10 h-10 rounded-full hover:bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all">
          <Globe className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 rounded-full hover:bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-destructive animate-pulse" />
        </button>
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-sm font-bold text-white ml-2 shadow-md">
          JD
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
