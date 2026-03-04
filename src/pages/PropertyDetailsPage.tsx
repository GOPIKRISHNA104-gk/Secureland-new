import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Shield, Droplets, Map, Banknote, Share2 } from "lucide-react";
import ScoreGauge from "@/components/ScoreGauge";
import { cn } from "@/lib/utils";

const PropertyDetailsPage = () => {
    const navigate = useNavigate();
    // We'll use mock data for this demonstration
    const property = {
        title: "Premium Plot - Whitefield",
        location: "Whitefield, Bangalore, Karnataka",
        price: "₹1.2 Cr",
        area: "2,400 sq.m",
        safetyScore: 92,
        waterScore: 85,
        type: "Sale",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop",
        description: "An exceptional verified plot in the heart of Whitefield. Perfect for commercial development or premium residential layouts. Fully cleared by SecureLand AI for boundary integrity and land history.",
    };

    return (
        <div className="relative min-h-[calc(100vh-8rem)]">
            {/* Hero Image Spanning 50% height */}
            <div className="absolute top-0 left-[-2rem] right-[-2rem] h-[55vh] overflow-hidden">
                <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background" />
            </div>

            <div className="relative z-10 pt-6">
                {/* Navigation Bar overlaying hero */}
                <div className="flex items-center justify-between mb-[20vh]">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-background/80 backdrop-blur-md rounded-full p-3 border border-border/50 hover:bg-secondary transition-colors text-foreground shadow-lg group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </button>

                    <div className="flex gap-3">
                        <button className="bg-background/80 backdrop-blur-md rounded-full p-3 border border-border/50 hover:bg-secondary transition-colors text-foreground shadow-lg hover:text-primary">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Hovering Glass Card Content */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="glass-card rounded-[32px] p-8 md:p-12 shadow-2xl border border-white/20 dark:border-white/5 relative bg-background/70 backdrop-blur-2xl"
                >
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Left Content Area */}
                        <div className="flex-1 space-y-8">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="bg-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/30">
                                        {property.type}
                                    </span>
                                    <div className="flex items-center gap-2 text-primary font-semibold bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                                        <Shield className="w-4 h-4" /> SecureLand Verified
                                    </div>
                                </div>

                                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-3">{property.title}</h1>
                                <div className="flex items-center gap-2 text-muted-foreground text-lg">
                                    <MapPin className="w-5 h-5 flex-shrink-0" />
                                    <span>{property.location}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-border/50">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground flex items-center gap-1.5"><Banknote className="w-4 h-4" /> Price</p>
                                    <p className="text-2xl font-bold text-foreground">{property.price}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground flex items-center gap-1.5"><Map className="w-4 h-4" /> Area</p>
                                    <p className="text-2xl font-bold text-foreground">{property.area}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">Price/sq.m</p>
                                    <p className="text-xl font-bold text-foreground">₹5,000</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                                    <p className="text-xl font-bold text-primary">Available</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-3">About this Property</h3>
                                <p className="text-muted-foreground leading-relaxed text-lg">
                                    {property.description}
                                </p>
                            </div>
                        </div>

                        {/* Right Action Area */}
                        <div className="w-full lg:w-[380px] shrink-0 space-y-6">
                            <div className="bg-secondary/40 rounded-[24px] p-6 border border-border/50">
                                <h3 className="font-semibold text-lg mb-6">AI Evaluation Scores</h3>

                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center gap-6">
                                        <ScoreGauge score={property.safetyScore} label="" variant="primary" size="md" />
                                        <div>
                                            <p className="font-bold text-lg text-foreground mb-1">Safety Rating</p>
                                            <p className="text-sm text-muted-foreground">Low risk of environmental hazards or encumbrances.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <ScoreGauge score={property.waterScore} label="" variant="accent" size="md" />
                                        <div>
                                            <p className="font-bold text-lg text-foreground mb-1">Water Abundance</p>
                                            <p className="text-sm text-muted-foreground">High groundwater table detected nearby.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02, translateY: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full relative group overflow-hidden rounded-2xl p-5 bg-gradient-to-r from-primary to-blue-600 font-bold text-white text-xl shadow-[0_0_30px_rgba(37,99,235,0.4)] border border-blue-400/50"
                            >
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.3),transparent_50%)] group-hover:scale-150 transition-transform duration-500" />
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Initiate Secure Purchase
                                </span>
                            </motion.button>

                            <p className="text-center text-xs text-muted-foreground font-medium">
                                Uses blockchain & AI validation. 100% secure transaction.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PropertyDetailsPage;
