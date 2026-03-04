import { motion } from "framer-motion";
import { MapPin, Shield, Droplets, Maximize2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  id?: string;
  image?: string;
  title: string;
  location: string;
  price: string;
  area: string;
  safetyScore: number;
  waterScore: number;
  type?: "sale" | "rent" | "investment";
}

const typeBadge = {
  sale: "bg-primary text-primary-foreground shadow-md shadow-primary/20",
  rent: "bg-accent text-accent-foreground shadow-md shadow-accent/20",
  investment: "bg-warning text-warning-foreground shadow-md shadow-warning/20",
};

const PropertyCard = ({ id = "1", image, title, location, price, area, safetyScore, waterScore, type = "sale" }: PropertyCardProps) => {
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ y: -6 }}
      onClick={() => navigate(`/property/${id}`)}
      className="glass-card-hover rounded-[20px] overflow-hidden group cursor-pointer border border-border/50 bg-card/60 backdrop-blur-xl relative"
    >
      <div className="relative h-48 bg-secondary overflow-hidden">
        {image ? (
          <>
            <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
          </>
        ) : (
          <div className="w-full h-full hero-gradient-subtle flex items-center justify-center">
            <MapPin className="w-8 h-8 text-white/50" />
          </div>
        )}
        <span className={cn("absolute top-4 right-4 text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full", typeBadge[type])}>
          {type}
        </span>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <span className="text-xl font-bold text-white tracking-tight drop-shadow-md">{price}</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-base font-semibold text-foreground mb-1.5 truncate group-hover:text-primary transition-colors">{title}</h3>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
          <MapPin className="w-3.5 h-3.5" />
          <span className="truncate">{location}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="flex items-center gap-1.5 bg-secondary/50 rounded-lg px-2.5 py-1 border border-border/50">
            <Maximize2 className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs font-medium text-foreground">{area}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-4 border-t border-border/50">
          <div className="flex-1 flex items-center gap-2 bg-accent/5 rounded-lg px-2.5 py-1.5 border border-accent/10">
            <Shield className="w-4 h-4 text-accent" />
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground leading-none mb-0.5">Safety</span>
              <span className="text-xs font-bold text-foreground leading-none">{safetyScore}%</span>
            </div>
          </div>
          <div className="flex-1 flex items-center gap-2 bg-primary/5 rounded-lg px-2.5 py-1.5 border border-primary/10">
            <Droplets className="w-4 h-4 text-primary" />
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground leading-none mb-0.5">Water</span>
              <span className="text-xs font-bold text-foreground leading-none">{waterScore}%</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
