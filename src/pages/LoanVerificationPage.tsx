import { useState } from "react";
import { motion } from "framer-motion";
import { Landmark, FileCheck, Shield, CheckCircle, Clock, Upload, Building2, CreditCard, ArrowRight, AlertTriangle } from "lucide-react";

const verificationSteps = [
    { label: "Property Ownership", status: "verified", desc: "Digital Twin ownership confirmed" },
    { label: "Document Authenticity", status: "verified", desc: "Land deed verified against registrar records" },
    { label: "Fraud Check", status: "verified", desc: "No fraud flags detected by AI engine" },
    { label: "Encumbrance Certificate", status: "pending", desc: "Awaiting verification from Sub-Registrar" },
    { label: "Bank Approval", status: "pending", desc: "Pending bank's internal evaluation" },
];

const LoanVerificationPage = () => {
    const [selectedBank, setSelectedBank] = useState<string | null>(null);

    const banks = [
        { name: "State Bank of India", logo: "SBI", rate: "8.5%", maxLoan: "₹2.5 Cr" },
        { name: "HDFC Bank", logo: "HDFC", rate: "8.7%", maxLoan: "₹3.0 Cr" },
        { name: "ICICI Bank", logo: "ICICI", rate: "8.9%", maxLoan: "₹2.8 Cr" },
        { name: "Bank of Baroda", logo: "BOB", rate: "8.4%", maxLoan: "₹2.0 Cr" },
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-[1200px] mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Loan & Bank Verification</h1>
                <p className="text-muted-foreground text-sm mt-1">Verify land ownership for bank loans and get instant pre-approvals.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Left: Verification Status */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Property Summary */}
                    <div className="glass-card rounded-2xl p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 rounded-2xl hero-gradient flex items-center justify-center">
                                <Shield className="w-7 h-7 text-primary-foreground" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-foreground">Plot #SL-2847A</h3>
                                <p className="text-sm text-muted-foreground">Coimbatore North • 1.50 Acres • Digital Twin Active</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { label: "Market Value", value: "₹1.85 Cr" },
                                { label: "Eligible Loan", value: "₹1.30 Cr" },
                                { label: "LTV Ratio", value: "70%" },
                            ].map((s) => (
                                <div key={s.label} className="bg-secondary/50 rounded-xl p-3 border border-border/50">
                                    <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
                                    <p className="text-lg font-bold text-foreground mt-0.5">{s.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Verification Checklist */}
                    <div className="glass-card rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-foreground mb-2">Verification Checklist</h3>
                        <p className="text-sm text-muted-foreground mb-5">AI-powered multi-step verification for bank loan eligibility.</p>
                        <div className="space-y-3">
                            {verificationSteps.map((s, i) => (
                                <motion.div
                                    key={s.label}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`flex items-center gap-4 p-4 rounded-xl border ${s.status === "verified" ? "bg-accent/5 border-accent/20" : "bg-secondary/50 border-border/50"
                                        }`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.status === "verified" ? "bg-accent/10" : "bg-yellow-500/10"
                                        }`}>
                                        {s.status === "verified" ? (
                                            <CheckCircle className="w-5 h-5 text-accent" />
                                        ) : (
                                            <Clock className="w-5 h-5 text-yellow-500" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-foreground">{s.label}</p>
                                        <p className="text-xs text-muted-foreground">{s.desc}</p>
                                    </div>
                                    <span className={`text-xs font-semibold px-3 py-1 rounded-lg ${s.status === "verified" ? "bg-accent/10 text-accent" : "bg-yellow-500/10 text-yellow-500"
                                        }`}>
                                        {s.status === "verified" ? "Verified" : "Pending"}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Upload Documents */}
                    <div className="glass-card rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-foreground mb-4">Upload Additional Documents</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {["Income Proof", "ID Proof (Aadhaar)", "PAN Card", "Bank Statement"].map((doc) => (
                                <div key={doc} className="border-2 border-dashed border-border rounded-xl p-4 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all">
                                    <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                                    <p className="text-sm font-medium text-foreground">{doc}</p>
                                    <p className="text-xs text-muted-foreground mt-1">Click to upload</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Bank Selection */}
                <div className="space-y-4">
                    <div className="glass-card rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-foreground mb-1">Select Bank</h3>
                        <p className="text-xs text-muted-foreground mb-4">Choose a bank for loan pre-approval.</p>
                        <div className="space-y-3">
                            {banks.map((bank) => (
                                <motion.div
                                    key={bank.name}
                                    whileHover={{ scale: 1.01 }}
                                    onClick={() => setSelectedBank(bank.name)}
                                    className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedBank === bank.name
                                            ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                                            : "border-border/50 bg-secondary/30 hover:bg-secondary/60"
                                        }`}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold ${selectedBank === bank.name ? "hero-gradient text-primary-foreground" : "bg-secondary text-foreground"
                                            }`}>
                                            {bank.logo}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-foreground">{bank.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                        <span>Rate: <span className="font-bold text-foreground">{bank.rate}</span></span>
                                        <span>Max: <span className="font-bold text-foreground">{bank.maxLoan}</span></span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <button
                        disabled={!selectedBank}
                        className="w-full h-12 rounded-xl hero-gradient-subtle text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Apply for Pre-Approval <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default LoanVerificationPage;
