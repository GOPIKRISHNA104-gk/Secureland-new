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
import RealTimeAlertsPage from "./pages/RealTimeAlertsPage";
import OwnershipTransferPage from "./pages/OwnershipTransferPage";
import LoanVerificationPage from "./pages/LoanVerificationPage";
import MarketplacePage from "./pages/MarketplacePage";
import PropertyExplorerPage from "./pages/PropertyExplorerPage";
import AreaSafetyPage from "./pages/AreaSafetyPage";
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

            {/* Step 2: Module Selection */}
            <Route path="/modules" element={<ModuleSelectionPage />} />

            {/* Step 3: Login */}
            <Route path="/login" element={<LoginPage />} />

            {/* Step 4: Register */}
            <Route path="/register" element={<RegisterPage />} />

            {/* Digital Twin generation */}
            <Route path="/digital-twin" element={<DigitalTwinPage />} />

            {/* App Layout routes */}
            <Route element={<AppLayout />}>
              {/* Dashboard */}
              <Route path="/dashboard" element={<DashboardPage />} />

              {/* LAND PROTECTION */}
              <Route path="/register-land" element={<RegisterLandPage />} />
              <Route path="/land-protection" element={<LandProtectionPage />} />
              <Route path="/fraud-protection" element={<FraudProtectionPage />} />
              <Route path="/satellite" element={<SatelliteMonitoringPage />} />
              <Route path="/alerts" element={<RealTimeAlertsPage />} />
              <Route path="/construction" element={<ConstructionAnalyzerPage />} />
              <Route path="/water" element={<WaterIntelligencePage />} />
              <Route path="/ownership-transfer" element={<OwnershipTransferPage />} />
              <Route path="/loan-verification" element={<LoanVerificationPage />} />
              <Route path="/reports" element={<ReportsPage />} />

              {/* LAND MARKETPLACE */}
              <Route path="/property-explorer" element={<PropertyExplorerPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/property/:id" element={<PropertyDetailsPage />} />
              <Route path="/investments" element={<InvestmentAnalyticsPage />} />
              <Route path="/area-safety" element={<AreaSafetyPage />} />

              {/* Common */}
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
