// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { Session, User } from "@supabase/supabase-js";

export interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  postcode: string | null;
  country: string | null;
  date_of_birth: string | null;
  avatar_url: string | null;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, fullName: string, extraData?: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch profile from Supabase
  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching profile:", error.message);
      return;
    }

    setProfile(data as UserProfile);
  };

  // Listen for auth state changes
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setIsLoading(false);
    });

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (data.user) {
      await fetchProfile(data.user.id);
    }

    return { success: true };
  };

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    extraData?: Partial<UserProfile>
  ): Promise<{ success: boolean; error?: string }> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    // If email confirmation is disabled, user is logged in immediately
    if (data.user) {
      // Update profile with extra data
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          ...extraData,
        })
        .eq("id", data.user.id);

      if (updateError) {
        console.error("Error updating profile:", updateError.message);
      }

      await fetchProfile(data.user.id);
    }

    return { success: true };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setSession(null);
  };

  const refreshProfile = async () => {
    if (user?.id) {
      await fetchProfile(user.id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        isAuthenticated: !!user,
        isLoading,
        login,
        signUp,
        logout,
        refreshProfile,
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

// import { createContext, useContext, useState, useEffect, ReactNode } from "react";
// import { UserProfile, findUserByEmail, validateOtp, GLOBAL_PASSWORD } from "@/data/users";

// interface AuthContextType {
//   user: UserProfile | null;
//   pendingUser: UserProfile | null;
//   isAuthenticated: boolean;
//   login: (email: string, password: string) => { success: boolean; error?: string };
//   verifyOtp: (otp: string) => { success: boolean; error?: string };
//   logout: () => void;
//   resendOtp: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// const STORAGE_KEY = "apexbank_user";

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<UserProfile | null>(null);
//   const [pendingUser, setPendingUser] = useState<UserProfile | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Load user from localStorage on mount
//   useEffect(() => {
//     const stored = localStorage.getItem(STORAGE_KEY);
//     if (stored) {
//       try {
//         const parsed = JSON.parse(stored);
//         setUser(parsed);
//       } catch {
//         localStorage.removeItem(STORAGE_KEY);
//       }
//     }
//     setIsLoading(false);
//   }, []);

//   const login = (email: string, password: string): { success: boolean; error?: string } => {
//     const foundUser = findUserByEmail(email);
    
//     if (!foundUser) {
//       return { success: false, error: "No account found with this email" };
//     }
    
//     if (password !== GLOBAL_PASSWORD) {
//       return { success: false, error: "Incorrect password" };
//     }
    
//     // Store pending user for OTP verification
//     setPendingUser(foundUser);
//     return { success: true };
//   };

//   const verifyOtp = (otp: string): { success: boolean; error?: string } => {
//     if (!pendingUser) {
//       return { success: false, error: "No pending login session" };
//     }
    
//     if (!validateOtp(pendingUser.id, otp)) {
//       return { success: false, error: "Invalid verification code" };
//     }
    
//     // OTP valid - complete login
//     setUser(pendingUser);
//     setPendingUser(null);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(pendingUser));
    
//     return { success: true };
//   };

//   const logout = () => {
//     setUser(null);
//     setPendingUser(null);
//     localStorage.removeItem(STORAGE_KEY);
//   };

//   const resendOtp = () => {
//     // In a real app, this would trigger an API call
//     // For demo, we just show a toast (handled in component)
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center animate-pulse">
//           <span className="text-xl font-bold text-primary-foreground">A</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         pendingUser,
//         isAuthenticated: !!user,
//         login,
//         verifyOtp,
//         logout,
//         resendOtp,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }
