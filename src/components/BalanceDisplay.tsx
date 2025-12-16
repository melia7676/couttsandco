import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { formatCurrency } from "@/data/mockData";

interface BalanceDisplayProps {
  amount: number;
  label?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showCents?: boolean;
  className?: string;
}

export function BalanceDisplay({
  amount,
  label,
  size = "lg",
  showCents = true,
  className = "",
}: BalanceDisplayProps) {
  const animatedValue = useAnimatedCounter(amount, 2500);

  const sizeClasses = {
    sm: "text-lg sm:text-xl font-semibold",
    md: "text-xl sm:text-2xl font-bold",
    lg: "text-2xl sm:text-4xl md:text-5xl font-bold",
    xl: "text-3xl sm:text-5xl md:text-6xl font-bold",
  };

  const formattedValue = showCents
    ? formatCurrency(animatedValue)
    : formatCurrency(animatedValue).split(".")[0];

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
      )}
      <p className={`${sizeClasses[size]} tracking-tight animate-count-up`}>
        {formattedValue}
      </p>
    </div>
  );
}
