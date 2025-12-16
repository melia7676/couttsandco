import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { transactions } from "@/data/mockData";
import { TransactionRow } from "./TransactionRow";
import { Button } from "@/components/ui/button";

interface RecentActivityFeedProps {
  limit?: number;
  accountId?: string;
}

export function RecentActivityFeed({ limit = 5, accountId }: RecentActivityFeedProps) {
  const filteredTransactions = accountId
    ? transactions.filter((t) => t.accountId === accountId)
    : transactions;

  const recentTransactions = filteredTransactions.slice(0, limit);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl sm:rounded-2xl border border-border/50 overflow-hidden"
    >
      <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border/50">
        <h2 className="text-base sm:text-lg font-semibold text-foreground">Recent Activity</h2>
        <Link to="/activity">
          <Button variant="ghost" size="sm" className="text-primary text-xs sm:text-sm">
            View All
            <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </Link>
      </div>

      <div className="divide-y divide-border/50">
        {recentTransactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <TransactionRow transaction={transaction} />
          </motion.div>
        ))}
      </div>

      {recentTransactions.length === 0 && (
        <div className="p-6 sm:p-8 text-center text-muted-foreground text-sm">
          No recent transactions
        </div>
      )}
    </motion.div>
  );
}
