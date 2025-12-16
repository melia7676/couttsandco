import { motion } from "framer-motion";
import { Send, Building2, Receipt, CalendarClock, Users, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface TransferType {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const transferTypes: TransferType[] = [
  {
    id: "bank-transfer",
    label: "Bank Transfer",
    description: "Send to UK accounts",
    icon: Send,
    color: "bg-primary/10 text-primary",
  },
  {
    id: "wire-transfer",
    label: "Wire Transfer",
    description: "International payments",
    icon: Globe,
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    id: "pay-bills",
    label: "Pay Bills",
    description: "Utilities & services",
    icon: Receipt,
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    id: "standing-order",
    label: "Standing Order",
    description: "Regular payments",
    icon: CalendarClock,
    color: "bg-violet-500/10 text-violet-600",
  },
  {
    id: "between-accounts",
    label: "Between Accounts",
    description: "Move your money",
    icon: Building2,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    id: "pay-someone",
    label: "Pay Someone",
    description: "Saved payees",
    icon: Users,
    color: "bg-rose-500/10 text-rose-600",
  },
];

interface QuickTransferButtonsProps {
  onSelectType?: (type: string) => void;
  selectedType?: string;
}

export function QuickTransferButtons({ onSelectType, selectedType }: QuickTransferButtonsProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-foreground">Make a Payment</h3>
        <p className="text-xs sm:text-sm text-muted-foreground">Choose your payment type</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        {transferTypes.map((type, index) => (
          <motion.button
            key={type.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelectType?.(type.id)}
            className={cn(
              "flex flex-col items-start p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all text-left",
              "hover:shadow-md hover:border-primary/30",
              selectedType === type.id
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border/50 bg-card"
            )}
          >
            <div className={cn("w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center mb-2 sm:mb-3", type.color)}>
              <type.icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <span className="font-medium text-foreground text-xs sm:text-sm">{type.label}</span>
            <span className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 line-clamp-1">{type.description}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
