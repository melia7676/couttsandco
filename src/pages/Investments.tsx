import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, PieChart, ArrowUpRight, RefreshCw } from "lucide-react";
import { investments, formatCurrency, accounts } from "@/data/mockData";
import { BalanceDisplay } from "@/components/BalanceDisplay";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Investments() {
  const investmentAccount = accounts.find((a) => a.type === "investment");
  const totalValue = investments.reduce((sum, inv) => sum + inv.value, 0);
  const totalGainLoss = investments.reduce((sum, inv) => sum + inv.gainLoss, 0);
  const overallReturn = ((totalGainLoss / (totalValue - totalGainLoss)) * 100).toFixed(2);

  const stockHoldings = investments.filter((i) => i.type === "stock");
  const etfHoldings = investments.filter((i) => i.type === "etf");
  const bondHoldings = investments.filter((i) => i.type === "bond");

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Investments</h1>
          <p className="text-muted-foreground">Monitor your investment portfolio</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <ArrowUpRight className="h-4 w-4 mr-2" />
            Trade
          </Button>
        </div>
      </motion.div>

      {/* Portfolio Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-card rounded-2xl border border-border/50 p-6">
          <BalanceDisplay
            amount={totalValue}
            label="Total Portfolio Value"
            size="md"
          />
        </div>
        <div className="bg-card rounded-2xl border border-border/50 p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Gain/Loss</p>
          <p className={cn(
            "text-2xl font-bold",
            totalGainLoss >= 0 ? "text-success" : "text-destructive"
          )}>
            {totalGainLoss >= 0 ? "+" : ""}{formatCurrency(totalGainLoss)}
          </p>
          <div className={cn(
            "flex items-center gap-1 mt-1 text-sm",
            totalGainLoss >= 0 ? "text-success" : "text-destructive"
          )}>
            {totalGainLoss >= 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span>{overallReturn}%</span>
          </div>
        </div>
        <div className="bg-card rounded-2xl border border-border/50 p-6">
          <p className="text-sm text-muted-foreground mb-2">Cash Available</p>
          <p className="text-2xl font-bold text-foreground">
            {formatCurrency((investmentAccount?.balance || 0) - totalValue + 50000)}
          </p>
          <p className="text-sm text-muted-foreground mt-1">For trading</p>
        </div>
      </motion.div>

      {/* Holdings by Type */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stocks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl border border-border/50 overflow-hidden"
        >
          <div className="p-6 border-b border-border/50">
            <h2 className="text-lg font-semibold text-foreground">Stocks</h2>
          </div>
          <div className="divide-y divide-border/50">
            {stockHoldings.map((holding) => (
              <HoldingRow key={holding.id} holding={holding} />
            ))}
          </div>
        </motion.div>

        {/* ETFs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl border border-border/50 overflow-hidden"
        >
          <div className="p-6 border-b border-border/50">
            <h2 className="text-lg font-semibold text-foreground">ETFs</h2>
          </div>
          <div className="divide-y divide-border/50">
            {etfHoldings.map((holding) => (
              <HoldingRow key={holding.id} holding={holding} />
            ))}
          </div>
        </motion.div>

        {/* Bonds */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-2xl border border-border/50 overflow-hidden"
        >
          <div className="p-6 border-b border-border/50">
            <h2 className="text-lg font-semibold text-foreground">Bonds</h2>
          </div>
          <div className="divide-y divide-border/50">
            {bondHoldings.map((holding) => (
              <HoldingRow key={holding.id} holding={holding} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* All Holdings Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-card rounded-2xl border border-border/50 overflow-hidden"
      >
        <div className="p-6 border-b border-border/50">
          <h2 className="text-lg font-semibold text-foreground">All Holdings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-muted-foreground border-b border-border/50">
                <th className="p-4 font-medium">Symbol</th>
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium text-right">Shares</th>
                <th className="p-4 font-medium text-right">Avg Cost</th>
                <th className="p-4 font-medium text-right">Current Price</th>
                <th className="p-4 font-medium text-right">Market Value</th>
                <th className="p-4 font-medium text-right">Gain/Loss</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {investments.map((inv) => (
                <tr key={inv.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="p-4 font-semibold text-foreground">{inv.symbol}</td>
                  <td className="p-4 text-muted-foreground">{inv.name}</td>
                  <td className="p-4 text-right">{inv.shares}</td>
                  <td className="p-4 text-right">{formatCurrency(inv.avgCost)}</td>
                  <td className="p-4 text-right">{formatCurrency(inv.currentPrice)}</td>
                  <td className="p-4 text-right font-medium">{formatCurrency(inv.value)}</td>
                  <td className={cn(
                    "p-4 text-right font-medium",
                    inv.gainLoss >= 0 ? "text-success" : "text-destructive"
                  )}>
                    <div className="flex items-center justify-end gap-2">
                      {inv.gainLoss >= 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      <span>
                        {inv.gainLoss >= 0 ? "+" : ""}{formatCurrency(inv.gainLoss)}
                      </span>
                      <span className="text-xs">
                        ({inv.gainLossPercent >= 0 ? "+" : ""}{inv.gainLossPercent.toFixed(2)}%)
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

function HoldingRow({ holding }: { holding: typeof investments[0] }) {
  const isPositive = holding.gainLoss >= 0;

  return (
    <div className="p-4 hover:bg-secondary/30 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="font-semibold text-foreground">{holding.symbol}</p>
          <p className="text-xs text-muted-foreground">{holding.shares} shares</p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-foreground">{formatCurrency(holding.value)}</p>
          <div className={cn(
            "flex items-center gap-1 justify-end text-xs",
            isPositive ? "text-success" : "text-destructive"
          )}>
            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            <span>{isPositive ? "+" : ""}{holding.gainLossPercent.toFixed(2)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
