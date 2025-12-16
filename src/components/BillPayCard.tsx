import { motion } from "framer-motion";
import { Calendar, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Bill, formatCurrency, formatDate } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface BillPayCardProps {
  bill: Bill;
  index?: number;
}

const statusConfig = {
  due: {
    icon: Clock,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    label: "Due Soon",
  },
  paid: {
    icon: CheckCircle,
    color: "text-success",
    bg: "bg-success/10",
    label: "Paid",
  },
  overdue: {
    icon: AlertCircle,
    color: "text-destructive",
    bg: "bg-destructive/10",
    label: "Overdue",
  },
  scheduled: {
    icon: Calendar,
    color: "text-primary",
    bg: "bg-primary/10",
    label: "Scheduled",
  },
};

export function BillPayCard({ bill, index = 0 }: BillPayCardProps) {
  const status = statusConfig[bill.status];
  const StatusIcon = status.icon;

  const handlePayNow = () => {
    toast.success(`Payment of ${formatCurrency(bill.amount)} to ${bill.payeeName} initiated!`, {
      description: "Payment will be processed within 24 hours.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-card rounded-xl border border-border/50 p-4 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl shrink-0">
          {bill.logo}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-medium text-foreground truncate">{bill.payeeName}</h3>
              <p className="text-sm text-muted-foreground">{bill.category}</p>
            </div>
            <div className={cn("px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1", status.bg, status.color)}>
              <StatusIcon className="h-3 w-3" />
              {status.label}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-foreground">{formatCurrency(bill.amount)}</p>
              <p className="text-xs text-muted-foreground">
                Due {formatDate(bill.dueDate)}
              </p>
            </div>

            {bill.status !== "paid" && (
              <Button
                size="sm"
                variant={bill.status === "overdue" ? "destructive" : "default"}
                onClick={handlePayNow}
              >
                Pay Now
              </Button>
            )}
          </div>

          {bill.isAutoPay && (
            <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
              <CheckCircle className="h-3 w-3 text-success" />
              Auto-pay enabled
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
