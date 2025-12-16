import { motion } from "framer-motion";
import { Wifi, Lock } from "lucide-react";
import { Card } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface CreditCardVisualProps {
  card: Card;
  size?: "sm" | "md" | "lg";
}

const cardGradients = {
  navy: "from-slate-800 via-slate-900 to-slate-950",
  gold: "from-amber-500 via-amber-600 to-amber-700",
  platinum: "from-zinc-400 via-zinc-500 to-zinc-600",
};

export function CreditCardVisual({ card, size = "md" }: CreditCardVisualProps) {
  const gradient = cardGradients[card.color];

  const sizeClasses = {
    sm: "w-64 h-40",
    md: "w-80 h-48",
    lg: "w-96 h-56",
  };

  const networkLogo = card.network === "visa" ? "VISA" : "Mastercard";

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -15 }}
      animate={{ opacity: 1, rotateY: 0 }}
      whileHover={{ scale: 1.02, rotateY: 5 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "relative rounded-2xl p-6 overflow-hidden card-shine",
        "bg-gradient-to-br shadow-2xl",
        sizeClasses[size],
        gradient,
        card.isLocked && "grayscale"
      )}
      style={{ perspective: "1000px" }}
    >
      {/* Card pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24" />
      </div>

      {card.isLocked && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
          <div className="flex items-center gap-2 text-white bg-black/50 px-4 py-2 rounded-full">
            <Lock className="h-4 w-4" />
            <span className="font-medium">Card Locked</span>
          </div>
        </div>
      )}

      <div className="relative h-full flex flex-col justify-between text-white">
        {/* Top row */}
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-xs opacity-70">ApexBank</p>
            <p className="text-sm font-medium">{card.name}</p>
          </div>
          <Wifi className="h-6 w-6 rotate-90 opacity-80" />
        </div>

        {/* Chip */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-9 rounded-md bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center">
            <div className="w-8 h-6 border-2 border-amber-600/30 rounded-sm" />
          </div>
        </div>

        {/* Card number */}
        <div>
          <p className="text-lg tracking-[0.25em] font-mono">
            •••• •••• •••• {card.lastFour}
          </p>
        </div>

        {/* Bottom row */}
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] opacity-60 uppercase">Card Holder</p>
            <p className="text-sm font-medium tracking-wide">GEORGE KINSEY</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] opacity-60 uppercase">Expires</p>
            <p className="text-sm font-medium">{card.expiryDate}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold tracking-wider">{networkLogo}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
