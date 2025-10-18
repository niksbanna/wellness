import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Progress from "./pages/Progress";
import Labs from "./pages/Labs";
import Medications from "./pages/Medications";
import Appointments from "./pages/Appointments";
import ProviderDirectory from "./pages/ProviderDirectory";
import ProviderProfile from "./pages/ProviderProfile";
import ScheduleAppointment from "./pages/ScheduleAppointment";
import BookingConfirmation from "./pages/BookingConfirmation";
import HowItWorksPage from "./pages/HowItWorksPage";
import SuccessStoriesPage from "./pages/SuccessStoriesPage";
import ResourceLibrary from "./pages/ResourceLibrary";
import ResourceDetail from "./pages/ResourceDetail";
import ProgramComparison from "./pages/ProgramComparison";
import PricingCalculator from "./pages/PricingCalculator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/success-stories" element={<SuccessStoriesPage />} />

            {/* Resource Library - Public Routes */}
            <Route path="/resources" element={<ResourceLibrary />} />
            <Route path="/resources/:slug" element={<ResourceDetail />} />

            {/* Program & Pricing - Public Routes */}
            <Route path="/program-comparison" element={<ProgramComparison />} />
            <Route path="/pricing-calculator" element={<PricingCalculator />} />

            {/* Provider Directory & Scheduling - Public Routes */}
            <Route path="/providers" element={<ProviderDirectory />} />
            <Route path="/providers/:providerId" element={<ProviderProfile />} />
            <Route path="/schedule/:providerId" element={<ScheduleAppointment />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />

            {/* Member Portal - Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/progress"
              element={
                <ProtectedRoute>
                  <Progress />
                </ProtectedRoute>
              }
            />
            <Route
              path="/labs"
              element={
                <ProtectedRoute>
                  <Labs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/medications"
              element={
                <ProtectedRoute>
                  <Medications />
                </ProtectedRoute>
              }
            />
            <Route
              path="/appointments"
              element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
