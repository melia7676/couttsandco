import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Wallet, 
  PiggyBank, 
  TrendingUp, 
  CreditCard, 
  Building2,
  ChevronRight,
  Percent
} from "lucide-react";
import { Account, formatCurrency } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface AccountCardProps {
  account: Account;
  index?: number;
}

const accountIcons = {
  checking: Wallet,
  savings: PiggyBank,
  "money-market": Building2,
  credit: CreditCard,
  investment: TrendingUp,
};

const accountColors = {
  checking: "from-blue-600 to-blue-800",
  savings: "from-emerald-600 to-emerald-800",
  "money-market": "from-violet-600 to-violet-800",
  credit: "from-rose-600 to-rose-800",
  investment: "from-amber-600 to-amber-800",
};

export function AccountCard({ account, index = 0 }: AccountCardProps) {
  const Icon = accountIcons[account.type];
  const gradientClass = accountColors[account.type];

  const isCredit = account.type === "credit";
  const displayBalance = isCredit ? account.balance : account.balance;
  const balanceLabel = isCredit ? "Current Balance" : "Available Balance";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/accounts/${account.id}`}>
        <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-card border border-border/50 p-4 sm:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1">
          {/* Gradient accent */}
          <div className={cn(
            "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r",
            gradientClass
          )} />

          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className={cn(
              "p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br",
              gradientClass
            )}>
              <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </div>

          <div className="space-y-0.5 sm:space-y-1 mb-3 sm:mb-4">
            <h3 className="font-semibold text-foreground text-sm sm:text-base truncate">{account.name}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              •••• {account.lastFour}
            </p>
          </div>

          <div className="space-y-0.5 sm:space-y-1">
            <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">
              {balanceLabel}
            </p>
            <p className={cn(
              "text-lg sm:text-2xl font-bold",
              isCredit ? "text-destructive" : "text-foreground"
            )}>
              {isCredit ? "-" : ""}{formatCurrency(displayBalance)}
            </p>
          </div>

          {account.interestRate && (
            <div className="mt-3 sm:mt-4 flex items-center gap-2 text-xs sm:text-sm text-success">
              <Percent className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{account.interestRate}% APY</span>
            </div>
          )}

          {account.creditLimit && (
            <div className="mt-3 sm:mt-4">
              <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground mb-1">
                <span>Credit Used</span>
                <span>{formatCurrency(account.availableCredit || 0)} available</span>
              </div>
              <div className="h-1.5 sm:h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-rose-600 rounded-full transition-all"
                  style={{
                    width: `${(account.balance / account.creditLimit) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
