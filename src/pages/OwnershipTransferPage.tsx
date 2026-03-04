import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRightLeft, User, Phone, MapPin, FileCheck, Shield, ChevronRight, Upload, CheckCircle, AlertTriangle, Banknote } from "lucide-react";

const OwnershipTransferPage = () => {
    const [step, setStep] = useState<"landing" | "form" | "verify" | "complete">("landing");

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-[1200px] mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Land Sale & Ownership Transfer</h1>
                <p className="text-muted-foreground text-sm mt-1">Securely transfer or sell your registered land with blockchain verification.</p>
            </div>

            {step === "landing" && (
                <div className="space-y-6">
                    {/* Active Properties */}
                    <div className="glass-card rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-foreground mb-4">Your Registered Properties</h3>
                        <div className="space-y-3">
                            {[
                                { name: "Plot #SL-2847A", location: "Coimbatore North", area: "1.50 Acres", status: "Protected" },
                                { name: "Plot #SL-1923B", location: "Ooty Road", area: "2.25 Acres", status: "Protected" },
                            ].map((prop) => (
                                <div key={prop.name} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border/50 hover:bg-secondary/80 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <Shield className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-foreground">{prop.name}</p>
                                            <p className="text-xs text-muted-foreground">{prop.location} • {prop.area}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-lg">{prop.status}</span>
                                        <button
                                            onClick={() => setStep("form")}
                                            className="px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-semibold hover:bg-primary/20 transition-colors flex items-center gap-1"
                                        >
                                            Transfer <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Transfer Types */}
                    <div className="grid md:grid-cols-3 gap-4">
                        {[
                            { title: "Full Transfer", desc: "Transfer complete ownership to a new party", icon: ArrowRightLeft, color: "text-primary" },
                            { title: "Partial Sale", desc: "Sell a portion of your registered land", icon: Banknote, color: "text-accent" },
                            { title: "Inheritance", desc: "Transfer ownership to family members", icon: User, color: "text-orange-500" },
                        ].map((type) => (
                            <motion.div
                                key={type.title}
                                whileHover={{ y: -2 }}
                                onClick={() => setStep("form")}
                                className="glass-card-hover rounded-2xl p-6 cursor-pointer group"
                            >
                                <type.icon className={`w-8 h-8 ${type.color} mb-4`} />
                                <h3 className="text-base font-bold text-foreground mb-1">{type.title}</h3>
                                <p className="text-sm text-muted-foreground">{type.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {step === "form" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <button onClick={() => setStep("landing")} className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">← Back</button>

                    <div className="grid lg:grid-cols-2 gap-6">
                        <div className="glass-card rounded-2xl p-6">
                            <h3 className="text-lg font-bold text-foreground mb-1">Buyer / Recipient Details</h3>
                            <p className="text-sm text-muted-foreground mb-6">Enter the details of the new owner.</p>
                            <div className="space-y-4">
                                {[
                                    { label: "Full Name", icon: User, placeholder: "Enter buyer's full name" },
                                    { label: "Mobile Number", icon: Phone, placeholder: "+91 9876543210" },
                                    { label: "Aadhaar Number", icon: FileCheck, placeholder: "XXXX-XXXX-XXXX" },
                                    { label: "Address", icon: MapPin, placeholder: "Enter buyer's address" },
                                ].map((f) => (
                                    <div key={f.label}>
                                        <label className="text-xs font-semibold text-foreground mb-1.5 block">{f.label}</label>
                                        <div className="relative">
                                            <f.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <input
                                                type="text"
                                                placeholder={f.placeholder}
                                                className="w-full h-11 pl-10 pr-4 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass-card rounded-2xl p-6">
                            <h3 className="text-lg font-bold text-foreground mb-1">Transfer Details</h3>
                            <p className="text-sm text-muted-foreground mb-6">Specify the sale/transfer conditions.</p>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-semibold text-foreground mb-1.5 block">Sale Price (₹)</label>
                                    <input type="number" placeholder="Enter amount" className="w-full h-11 px-4 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-foreground mb-1.5 block">Upload Transfer Document</label>
                                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all">
                                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                                        <p className="text-sm text-muted-foreground">Click to upload Sale Deed / Agreement</p>
                                    </div>
                                </div>
                                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex items-start gap-3">
                                    <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">OTP Verification Required</p>
                                        <p className="text-xs text-muted-foreground">Both buyer & seller must verify OTP to complete the transfer.</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setStep("verify")}
                                className="mt-6 w-full h-12 rounded-xl hero-gradient-subtle text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                            >
                                Proceed to Verification
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            {step === "verify" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center min-h-[50vh]">
                    <div className="glass-card rounded-2xl p-10 text-center max-w-md w-full">
                        <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-accent" />
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">Transfer Initiated</h2>
                        <p className="text-sm text-muted-foreground mb-6">
                            Both parties will receive an OTP on their registered mobile numbers. The transfer will be completed once verified.
                        </p>
                        <div className="bg-secondary/50 rounded-xl p-4 mb-6 text-left space-y-2">
                            <p className="text-xs text-muted-foreground">Transfer ID: <span className="font-mono font-bold text-foreground">TXN-SL-8847</span></p>
                            <p className="text-xs text-muted-foreground">Blockchain TX: <span className="font-mono font-bold text-foreground">0x4a2f...d81c</span></p>
                            <p className="text-xs text-muted-foreground">Status: <span className="font-bold text-yellow-500">Pending Verification</span></p>
                        </div>
                        <button
                            onClick={() => setStep("landing")}
                            className="w-full h-11 rounded-xl bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-colors"
                        >
                            Back to Properties
                        </button>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default OwnershipTransferPage;
