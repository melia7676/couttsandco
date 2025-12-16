import { motion } from "framer-motion";
import { accounts, totalPortfolioBalance } from "@/data/mockData";
import { AccountCard } from "@/components/AccountCard";
import { BalanceDisplay } from "@/components/BalanceDisplay";

export default function Accounts() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">All Accounts</h1>
        <p className="text-muted-foreground">Manage and monitor all your financial accounts</p>
      </motion.div>

      {/* Total Balance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl border border-border/50 p-8"
      >
        <BalanceDisplay
          amount={totalPortfolioBalance}
          label="Total Portfolio Value"
          size="lg"
        />
      </motion.div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account, index) => (
          <AccountCard key={account.id} account={account} index={index} />
        ))}
      </div>
    </div>
  );
}
