import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { PrivateRoute } from "@/components/PrivateRoute";
import { DashboardLayout } from "@/layouts/DashboardLayout";

// Pages
import Login from "@/pages/Login";
import Otp from "@/pages/Otp";
import Dashboard from "@/pages/Dashboard";
import Accounts from "@/pages/Accounts";
import AccountDetail from "@/pages/AccountDetail";
import Transfer from "@/pages/Transfer";
import Bills from "@/pages/Bills";
import Cards from "@/pages/Cards";
import Investments from "@/pages/Investments";
import Activity from "@/pages/Activity";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" />
      <HashRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/otp" element={<Otp />} />
            
            {/* Protected Routes */}
            <Route
              element={
                <PrivateRoute>
                  <DashboardLayout />
                </PrivateRoute>
              }
            >
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/accounts/:id" element={<AccountDetail />} />
              <Route path="/transfer" element={<Transfer />} />
              <Route path="/bills" element={<Bills />} />
              <Route path="/cards" element={<Cards />} />
              <Route path="/investments" element={<Investments />} />
              <Route path="/activity" element={<Activity />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            
            {/* Logout Route */}
            <Route path="/logout" element={<Navigate to="/login" replace />} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
