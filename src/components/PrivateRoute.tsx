// src/components/PrivateRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function PrivateRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

// import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "@/contexts/AuthContext";

// interface PrivateRouteProps {
//   children: React.ReactNode;
// }

// export function PrivateRoute({ children }: PrivateRouteProps) {
//   const { isAuthenticated, pendingUser } = useAuth();
//   const location = useLocation();

//   // If there's a pending user (mid-login), redirect to OTP
//   if (pendingUser && location.pathname !== "/otp") {
//     return <Navigate to="/otp" replace />;
//   }

//   // If not authenticated and no pending user, redirect to login
//   if (!isAuthenticated && !pendingUser) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return <>{children}</>;
// }
