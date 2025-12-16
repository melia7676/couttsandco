import { motion } from "framer-motion";
import { Transaction, formatCurrency, formatDate } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface TransactionRowProps {
  transaction: Transaction;
  onClick?: () => void;
  showAccount?: boolean;
}

export function TransactionRow({ transaction, onClick, showAccount }: TransactionRowProps) {
  const isCredit = transaction.type === "credit";
  const isPending = transaction.status === "pending";

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ backgroundColor: "hsl(var(--secondary) / 0.5)" }}
      onClick={onClick}
      className={cn(
        "flex items-center justify-between p-3 sm:p-4 rounded-lg sm:rounded-xl cursor-pointer transition-colors",
        isPending && "opacity-70"
      )}
    >
      <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-secondary flex items-center justify-center text-lg sm:text-2xl shrink-0">
          {transaction.logo || "💳"}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-foreground text-sm sm:text-base truncate">{transaction.merchant}</p>
          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
            <span className="truncate">{formatDate(transaction.date)}</span>
            {isPending && (
              <span className="px-1.5 sm:px-2 py-0.5 bg-amber-500/10 text-amber-600 rounded-full text-[10px] sm:text-xs font-medium shrink-0">
                Pending
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="text-right shrink-0 ml-2">
        <p className={cn(
          "font-semibold text-sm sm:text-base",
          isCredit ? "text-success" : "text-foreground"
        )}>
          {isCredit ? "+" : "-"}{formatCurrency(transaction.amount)}
        </p>
        <p className="text-[10px] sm:text-xs text-muted-foreground capitalize truncate max-w-[80px] sm:max-w-none">
          {transaction.category.replace("-", " ")}
        </p>
      </div>
    </motion.div>
  );
}
