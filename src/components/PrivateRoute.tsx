import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated, pendingUser } = useAuth();
  const location = useLocation();

  // If there's a pending user (mid-login), redirect to OTP
  if (pendingUser && location.pathname !== "/otp") {
    return <Navigate to="/otp" replace />;
  }

  // If not authenticated and no pending user, redirect to login
  if (!isAuthenticated && !pendingUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
