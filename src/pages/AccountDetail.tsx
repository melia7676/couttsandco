import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Search, Filter, Calendar } from "lucide-react";
import { 
  getAccountById, 
  getTransactionsByAccountId, 
  Transaction,
  formatCurrency 
} from "@/data/mockData";
import { BalanceDisplay } from "@/components/BalanceDisplay";
import { TransactionRow } from "@/components/TransactionRow";
import { TransactionModal } from "@/components/TransactionModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function AccountDetail() {
  const { id } = useParams<{ id: string }>();
  const account = getAccountById(id || "");
  const transactions = getTransactionsByAccountId(id || "");

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  if (!account) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Account Not Found</h2>
        <p className="text-muted-foreground mb-4">The account you're looking for doesn't exist.</p>
        <Link to="/accounts">
          <Button>Back to Accounts</Button>
        </Link>
      </div>
    );
  }

  const categories = [...new Set(transactions.map((t) => t.category))];

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = t.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || t.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleExportCSV = () => {
    const csv = [
      ["Date", "Merchant", "Category", "Amount", "Type", "Status"].join(","),
      ...filteredTransactions.map((t) =>
        [t.date, t.merchant, t.category, t.amount, t.type, t.status].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${account.name.replace(/\s+/g, "_")}_transactions.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success("Transactions exported successfully!");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <Link to="/accounts">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{account.name}</h1>
          <p className="text-muted-foreground">Account •••• {account.lastFour}</p>
        </div>
      </motion.div>

      {/* Account Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl border border-border/50 p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <BalanceDisplay
              amount={account.balance}
              label={account.type === "credit" ? "Current Balance" : "Available Balance"}
              size="lg"
            />
          </div>
          {account.interestRate && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">Interest Rate</p>
              <p className="text-2xl font-bold text-success">{account.interestRate}% APY</p>
            </div>
          )}
          {account.creditLimit && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">Credit Limit</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(account.creditLimit)}</p>
            </div>
          )}
          {account.routingNumber && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">Routing Number</p>
              <p className="text-lg font-mono text-foreground">{account.routingNumber}</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl border border-border/50 overflow-hidden"
      >
        {/* Filters */}
        <div className="p-6 border-b border-border/50">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <h2 className="text-lg font-semibold text-foreground">Transaction History</h2>
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full sm:w-64"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat} className="capitalize">
                      {cat.replace("-", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={handleExportCSV}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Transaction List */}
        <div className="divide-y divide-border/50">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
                onClick={() => setSelectedTransaction(transaction)}
              />
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              No transactions found matching your criteria
            </div>
          )}
        </div>
      </motion.div>

      {/* Transaction Modal */}
      <TransactionModal
        transaction={selectedTransaction}
        isOpen={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
    </div>
  );
}
