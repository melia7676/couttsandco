import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserProfile, findUserByEmail, validateOtp, GLOBAL_PASSWORD } from "@/data/users";

interface AuthContextType {
  user: UserProfile | null;
  pendingUser: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  verifyOtp: (otp: string) => { success: boolean; error?: string };
  logout: () => void;
  resendOtp: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "apexbank_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [pendingUser, setPendingUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string): { success: boolean; error?: string } => {
    const foundUser = findUserByEmail(email);
    
    if (!foundUser) {
      return { success: false, error: "No account found with this email" };
    }
    
    if (password !== GLOBAL_PASSWORD) {
      return { success: false, error: "Incorrect password" };
    }
    
    // Store pending user for OTP verification
    setPendingUser(foundUser);
    return { success: true };
  };

  const verifyOtp = (otp: string): { success: boolean; error?: string } => {
    if (!pendingUser) {
      return { success: false, error: "No pending login session" };
    }
    
    if (!validateOtp(pendingUser.id, otp)) {
      return { success: false, error: "Invalid verification code" };
    }
    
    // OTP valid - complete login
    setUser(pendingUser);
    setPendingUser(null);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pendingUser));
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setPendingUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const resendOtp = () => {
    // In a real app, this would trigger an API call
    // For demo, we just show a toast (handled in component)
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center animate-pulse">
          <span className="text-xl font-bold text-primary-foreground">A</span>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        pendingUser,
        isAuthenticated: !!user,
        login,
        verifyOtp,
        logout,
        resendOtp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
