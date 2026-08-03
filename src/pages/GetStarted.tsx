// src/pages/GetStarted.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, Phone, MapPin, Landmark, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function GetStarted() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    city: "",
    postcode: "",
    country: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await signUp(formData.email, formData.password, formData.fullName, {
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      postcode: formData.postcode,
      country: formData.country,
    });

    if (result.success) {
      toast({
        title: "Account created",
        description: "Welcome to Coutts & Co Private Banking.",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Registration failed",
        description: result.error || "Something went wrong. Please try again.",
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
            Join the World's Most Exclusive Bank
          </h2>
          <p className="text-lg opacity-90">
            Create your account and gain access to personalized wealth management,
            premium investment opportunities, and dedicated client service.
          </p>
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-primary-foreground" />
              <span>Secure, encrypted account protection</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-primary-foreground" />
              <span>Real-time portfolio tracking</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-primary-foreground" />
              <span>24/7 dedicated client support</span>
            </div>
          </div>
        </div>

        <div className="text-sm opacity-60">
          © 2026 Coutts & Co. All rights reserved.
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center px-8 sm:px-12 lg:px-20 overflow-y-auto">
        <div className="mx-auto w-full max-w-md py-12 space-y-8">
          <Button
            variant="ghost"
            className="mb-4 -ml-4 text-muted-foreground"
            onClick={() => navigate("/login")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Sign In
          </Button>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Get Started</h2>
            <p className="text-muted-foreground">
              Create your private banking account in just a few steps.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="John William Smith"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="pl-10 h-12 bg-secondary/50 border-border"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john.smith@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 h-12 bg-secondary/50 border-border"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10 h-12 bg-secondary/50 border-border"
                  required
                  minLength={6}
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

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+44 20 7946 0958"
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-10 h-12 bg-secondary/50 border-border"
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="address"
                  name="address"
                  placeholder="440 Strand"
                  value={formData.address}
                  onChange={handleChange}
                  className="pl-10 h-12 bg-secondary/50 border-border"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="London"
                  value={formData.city}
                  onChange={handleChange}
                  className="h-12 bg-secondary/50 border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postcode">Postcode</Label>
                <Input
                  id="postcode"
                  name="postcode"
                  placeholder="WC2R 0QS"
                  value={formData.postcode}
                  onChange={handleChange}
                  className="h-12 bg-secondary/50 border-border"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                placeholder="United Kingdom"
                value={formData.country}
                onChange={handleChange}
                className="h-12 bg-secondary/50 border-border"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium mt-2"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}