// src/pages/Login.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Eye, EyeOff, Landmark } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      toast({
        title: "Welcome back",
        description: "Successfully signed in.",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Login failed",
        description: result.error || "Invalid credentials",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12 text-primary-foreground">
        <div>
          <div className="flex items-center gap-2">
            <Landmark className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Coutts & Co</h1>
              <p className="text-sm opacity-80">Private Banking</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-4xl font-bold leading-tight">
            Welcome to Premium Private Banking
          </h2>
          <p className="text-lg opacity-90">
            Experience world-class wealth management with personalized service
            and exclusive benefits reserved for our distinguished clients.
          </p>
          <div className="grid grid-cols-3 gap-6 pt-4">
            {[
              { label: "Assets Managed", value: "£35B+" },
              { label: "Client Retention", value: "98%" },
              { label: "Years of Trust", value: "330+" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-sm opacity-60">
          © 2026 Coutts & Co. All rights reserved.
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center px-8 sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Landmark className="h-10 w-10 mx-auto mb-2" />
            <h1 className="text-2xl font-bold">Coutts & Co</h1>
            <p className="text-sm text-muted-foreground">Private Banking</p>
          </div>

          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Sign in to your account</h2>
            <p className="text-muted-foreground">
              Enter your credentials to access your portfolio
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-secondary/50 border-border"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12 bg-secondary/50 border-border"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                New to Coutts & Co?
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full h-12 text-base font-medium"
            onClick={() => navigate("/get-started")}
          >
            Get Started
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            By continuing, you agree to our{" "}
            <Link to="#" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="#" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
// import { useAuth } from "@/contexts/AuthContext";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { toast } from "sonner";
// import couttsLogo from "@/assets/coutts-logo.png";

// export default function Login() {
//   const navigate = useNavigate();
//   const { login, isAuthenticated } = useAuth();
  
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // Redirect if already authenticated
//   if (isAuthenticated) {
//     navigate("/dashboard", { replace: true });
//     return null;
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!email || !password) {
//       toast.error("Please enter email and password");
//       return;
//     }
    
//     setIsLoading(true);
    
//     // Simulate network delay
//     await new Promise(resolve => setTimeout(resolve, 800));
    
//     const result = login(email, password);
    
//     setIsLoading(false);
    
//     if (result.success) {
//       toast.success("Credentials verified! Please enter your OTP.");
//       navigate("/otp");
//     } else {
//       toast.error(result.error || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background flex">
//       {/* Left Side - Branding */}
//       <div className="hidden lg:flex lg:w-1/2 gradient-card relative overflow-hidden">
//         <div className="absolute inset-0">
//           <div className="absolute top-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
//           <div className="absolute bottom-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
//         </div>
        
//         <div className="relative z-10 flex flex-col justify-center px-16">
//           <div className="flex items-center gap-3 mb-8">
//             <img src={couttsLogo} alt="Coutts & Co" className="h-14 w-auto invert" />
//             <div>
//               <h1 className="text-3xl font-bold text-primary-foreground">Coutts & Co</h1>
//               <p className="text-primary-foreground/70">Private Banking</p>
//             </div>
//           </div>
          
//           <h2 className="text-4xl font-bold text-primary-foreground mb-4">
//             Welcome to Premium<br />Private Banking
//           </h2>
//           <p className="text-lg text-primary-foreground/70 max-w-md">
//             Experience world-class wealth management with personalized service 
//             and exclusive benefits reserved for our distinguished clients.
//           </p>
          
//           <div className="mt-12 grid grid-cols-3 gap-8">
//             {[
//               { label: "Assets Managed", value: "£35B+" },
//               { label: "Client Retention", value: "98%" },
//               { label: "Years of Trust", value: "330+" },
//             ].map((stat) => (
//               <div key={stat.label}>
//                 <p className="text-2xl font-bold text-primary-foreground">{stat.value}</p>
//                 <p className="text-sm text-primary-foreground/60">{stat.label}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
      
//       {/* Right Side - Login Form */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="w-full max-w-md"
//         >
//           {/* Mobile Logo */}
//           <div className="flex items-center gap-3 mb-8 lg:hidden">
//             <img src={couttsLogo} alt="Coutts & Co" className="h-12 w-auto dark:invert" />
//             <div>
//               <h1 className="text-2xl font-bold text-foreground">Coutts & Co</h1>
//               <p className="text-sm text-muted-foreground">Private Banking</p>
//             </div>
//           </div>
          
//           <div className="mb-8">
//             <h2 className="text-2xl font-bold text-foreground mb-2">Sign in to your account</h2>
//             <p className="text-muted-foreground">Enter your credentials to access your portfolio</p>
//           </div>
          
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-foreground">Email Address</label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
//                 <Input
//                   type="email"
//                   placeholder="name@coutts.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="pl-10 h-12 bg-secondary/50 border-border"
//                 />
//               </div>
//             </div>
            
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-foreground">Password</label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
//                 <Input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="pl-10 pr-10 h-12 bg-secondary/50 border-border"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
//                 >
//                   {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                 </button>
//               </div>
//             </div>
            
//             <Button
//               type="submit"
//               className="w-full h-12 gradient-primary text-primary-foreground font-semibold"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
//                   Verifying...
//                 </div>
//               ) : (
//                 <div className="flex items-center gap-2">
//                   Continue
//                   <ArrowRight className="h-4 w-4" />
//                 </div>
//               )}
//             </Button>
//           </form>
          
//           {/* <div className="mt-8 p-4 rounded-xl bg-secondary/50 border border-border">
//             <p className="text-sm text-muted-foreground mb-2">Demo Credentials:</p>
//             <div className="space-y-1 text-sm">
//               <p className="text-foreground">
//                 <span className="text-muted-foreground">Email:</span> amelia.kinsey@coutts.com
//               </p>
//               <p className="text-foreground">
//                 <span className="text-muted-foreground">Password:</span> kinsey
//               </p>
//             </div>
//           </div> */}
//         </motion.div>
//       </div>
//     </div>
//   );
// }
