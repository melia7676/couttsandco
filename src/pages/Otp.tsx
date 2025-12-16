import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCw, ShieldCheck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Otp() {
  const navigate = useNavigate();
  const { pendingUser, verifyOtp, isAuthenticated } = useAuth();
  
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Redirect if no pending user
  useEffect(() => {
    if (!pendingUser && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [pendingUser, isAuthenticated, navigate]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    
    // Auto-submit when complete
    if (value && index === 5 && newOtp.every(d => d !== "")) {
      handleVerify(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    
    if (pastedData.length === 6) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
      handleVerify(pastedData);
    }
  };

  const handleVerify = async (otpValue: string) => {
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const result = verifyOtp(otpValue);
    
    setIsLoading(false);
    
    if (result.success) {
      toast.success("Welcome back! Redirecting to dashboard...");
      navigate("/dashboard", { replace: true });
    } else {
      toast.error(result.error || "Invalid verification code");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  const handleResend = () => {
    if (resendCooldown > 0) return;
    
    setResendCooldown(30);
    toast.success("A new verification code has been sent to your email");
  };

  if (!pendingUser) return null;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/login")}
          className="mb-8 -ml-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Login
        </Button>
        
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-6">
          <ShieldCheck className="h-8 w-8 text-primary-foreground" />
        </div>
        
        {/* Header */}
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Verify Your Identity
        </h1>
        <p className="text-muted-foreground mb-8">
          We've sent a 6-digit verification code to{" "}
          <span className="text-foreground font-medium">{pendingUser.email}</span>
        </p>
        
        {/* OTP Inputs */}
        <div className="flex gap-3 mb-8" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold rounded-xl border-2 border-border bg-secondary/50 text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              disabled={isLoading}
            />
          ))}
        </div>
        
        {/* Verify Button */}
        <Button
          onClick={() => handleVerify(otp.join(""))}
          className="w-full h-12 gradient-primary text-primary-foreground font-semibold mb-6"
          disabled={isLoading || otp.some(d => d === "")}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Verifying...
            </div>
          ) : (
            "Verify & Sign In"
          )}
        </Button>
        
        {/* Resend */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm mb-2">Didn't receive the code?</p>
          <Button
            variant="ghost"
            onClick={handleResend}
            disabled={resendCooldown > 0}
            className="text-primary"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${resendCooldown > 0 ? "" : "animate-none"}`} />
            {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend Code"}
          </Button>
        </div>
        
        {/* Demo OTPs */}
        {/* <div className="mt-8 p-4 rounded-xl bg-secondary/50 border border-border">
          <p className="text-sm text-muted-foreground mb-2">Demo OTPs for {pendingUser.firstName}:</p>
          <div className="flex flex-wrap gap-2">
            {pendingUser.validOtps.map((code) => (
              <button
                key={code}
                onClick={() => {
                  const newOtp = code.split("");
                  setOtp(newOtp);
                  handleVerify(code);
                }}
                className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-mono hover:bg-primary/20 transition-colors"
              >
                {code}
              </button>
            ))}
          </div>
        </div> */}
      </motion.div>
    </div>
  );
}
