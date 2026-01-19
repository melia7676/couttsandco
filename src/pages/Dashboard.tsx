import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft, Wallet, PiggyBank } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getAccountsByUserId, getTransactionsByUserId, formatCurrency } from "@/data/users";
import { BalanceDisplay } from "@/components/BalanceDisplay";
import { AccountCard } from "@/components/AccountCard";
import { RecentActivityFeed } from "@/components/RecentActivityFeed";
import { QuickTransferButtons } from "@/components/QuickTransferButtons";
import { DashboardSkeleton } from "@/components/Skeleton";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Dashboard() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [showUnavailable, setShowUnavailable] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading || !user) {
    return <DashboardSkeleton />;
  }

  const accounts = getAccountsByUserId(user.id);
  const transactions = getTransactionsByUserId(user.id);

  const totalIncome = transactions
    .filter((t) => t.type === "credit")
    .slice(0, 30)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "debit")
    .slice(0, 30)
    .reduce((sum, t) => sum + t.amount, 0);

  const checkingBalance = accounts.find((a) => a.type === "checking")?.balance || 0;
  const savingsBalance = accounts.find((a) => a.type === "savings")?.balance || 0;

  const stats = [
    { label: "Monthly Income", value: totalIncome, icon: ArrowDownLeft, color: "text-success", bg: "bg-success/10" },
    { label: "Monthly Expenses", value: totalExpenses, icon: ArrowUpRight, color: "text-destructive", bg: "bg-destructive/10" },
    { label: "Checking", value: checkingBalance, icon: Wallet, color: "text-primary", bg: "bg-primary/10" },
    { label: "Savings", value: savingsBalance, icon: PiggyBank, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  ];

  const handleTransferClick = () => {
    setShowUnavailable(true);
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl lg:rounded-3xl gradient-card p-4 sm:p-6 lg:p-8 text-primary-foreground"
      >
        <div className="absolute top-0 right-0 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-white/5 rounded-full -translate-y-24 sm:-translate-y-36 lg:-translate-y-48 translate-x-24 sm:translate-x-36 lg:translate-x-48" />
        <div className="absolute bottom-0 left-0 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-white/5 rounded-full translate-y-16 sm:translate-y-24 lg:translate-y-32 -translate-x-16 sm:-translate-x-24 lg:-translate-x-32" />
        
        <div className="relative z-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
            <div className="min-w-0">
              <p className="text-primary-foreground/70 text-xs sm:text-sm font-medium mb-1 sm:mb-2">Total Portfolio Balance</p>
              <BalanceDisplay amount={user.totalBalance} size="xl" className="text-primary-foreground" />
              <p className="text-primary-foreground/70 text-xs sm:text-sm mt-1 sm:mt-2 truncate">{user.tier} Member since {user.memberSince}</p>
            </div>
            <div className="flex gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
              <Link to="/transfer" className="flex-1 sm:flex-none">
                <Button variant="secondary" size="default" className="gap-2 w-full sm:w-auto text-sm">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="hidden xs:inline">Send Money</span>
                  <span className="xs:hidden">Send</span>
                </Button>
              </Link>
              <Link to="/accounts" className="flex-1 sm:flex-none">
                <Button variant="outline" size="default" className="gap-2 w-full sm:w-auto bg-white/10 border-white/20 text-primary-foreground hover:bg-white/20 text-sm">
                  <Wallet className="h-4 w-4" />
                  <span className="hidden xs:inline">View All</span>
                  <span className="xs:hidden">View</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-xl lg:rounded-2xl border border-border/50 p-3 sm:p-4 lg:p-5"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className={`p-1.5 sm:p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-3 w-3 sm:h-4 sm:w-4 ${stat.color}`} />
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground truncate">{stat.label}</span>
            </div>
            <p className="text-base sm:text-lg lg:text-xl font-bold text-foreground truncate">{formatCurrency(stat.value)}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-xl lg:rounded-2xl border border-border/50 p-4 sm:p-5 lg:p-6"
      >
        <QuickTransferButtons onSelectType={handleTransferClick} />
      </motion.div>

      <div>
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground">Your Accounts</h2>
          <Link to="/accounts">
            <Button variant="ghost" size="sm" className="text-primary text-sm">View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {accounts.slice(0, 3).map((account, index) => (
            <AccountCard key={account.id} account={account} index={index} />
          ))}
        </div>
      </div>

      <RecentActivityFeed limit={6} />

      <AlertDialog open={showUnavailable} onOpenChange={setShowUnavailable}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle> Account Protection in Effect  </AlertDialogTitle>
                        <AlertDialogDescription>
                          For security reasons, electronic transfers are temporarily disabled. Please visit a bank branch to withdraw funds safely.
                        </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
