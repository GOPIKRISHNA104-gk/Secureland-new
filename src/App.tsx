import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import AppLayout from "./components/AppLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ModuleSelectionPage from "./pages/ModuleSelectionPage";
import DashboardPage from "./pages/DashboardPage";
import LandProtectionPage from "./pages/LandProtectionPage";
import RegisterLandPage from "./pages/RegisterLandPage";
import DigitalTwinPage from "./pages/DigitalTwinPage";
import SatelliteMonitoringPage from "./pages/SatelliteMonitoringPage";
import FraudProtectionPage from "./pages/FraudProtectionPage";
import ConstructionAnalyzerPage from "./pages/ConstructionAnalyzerPage";
import WaterIntelligencePage from "./pages/WaterIntelligencePage";
import MarketplacePage from "./pages/MarketplacePage";
import InvestmentAnalyticsPage from "./pages/InvestmentAnalyticsPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import PropertyDetailsPage from "./pages/PropertyDetailsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Step 1: After splash, go to Module Selection */}
            <Route path="/" element={<Navigate to="/modules" replace />} />

            {/* Step 2: Module Selection (Land Protection / Land Marketplace) */}
            <Route path="/modules" element={<ModuleSelectionPage />} />

            {/* Step 3: Login (Mobile + OTP + New Register button) */}
            <Route path="/login" element={<LoginPage />} />

            {/* Step 4: New Register Page */}
            <Route path="/register" element={<RegisterPage />} />

            {/* Step 9: Digital Twin generation result */}
            <Route path="/digital-twin" element={<DigitalTwinPage />} />

            {/* Protected App Layout routes */}
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/land-protection" element={<LandProtectionPage />} />
              {/* Steps 5-8: Register Land (Camera or Manual) */}
              <Route path="/register-land" element={<RegisterLandPage />} />
              <Route path="/satellite" element={<SatelliteMonitoringPage />} />
              <Route path="/fraud-protection" element={<FraudProtectionPage />} />
              <Route path="/construction" element={<ConstructionAnalyzerPage />} />
              <Route path="/water" element={<WaterIntelligencePage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/property/:id" element={<PropertyDetailsPage />} />
              <Route path="/investments" element={<InvestmentAnalyticsPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
