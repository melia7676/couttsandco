import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Download, Search, Filter, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getTransactionsByUserId, Transaction, formatDate } from "@/data/users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TransactionRow } from "@/components/TransactionRow";

export default function Activity() {
  const { user } = useAuth();
  const userTransactions = user ? getTransactionsByUserId(user.id) : [];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  const categories = useMemo(() => {
    const cats = new Set(userTransactions.map((t) => t.category));
    return Array.from(cats).sort();
  }, [userTransactions]);

  const filteredTransactions = useMemo(() => {
    return userTransactions.filter((transaction) => {
      const matchesSearch =
        searchQuery === "" ||
        transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.merchant.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || transaction.category === selectedCategory;

      const matchesType =
        selectedType === "all" || transaction.type === selectedType;

      return matchesSearch && matchesCategory && matchesType;
    });
  }, [userTransactions, searchQuery, selectedCategory, selectedType]);

  const handleExportCSV = () => {
    const headers = ["Date", "Description", "Category", "Type", "Amount"];
    const rows = filteredTransactions.map((t) => [
      formatDate(t.date),
      t.description,
      t.category,
      t.type,
      t.amount.toString(),
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Activity</h1>
          <p className="text-muted-foreground">
            {userTransactions.length} total transactions
          </p>
        </div>
        <Button variant="outline" onClick={handleExportCSV}>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-xl border border-border/50 p-4 space-y-4"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[140px]">
                <ArrowUpRight className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="credit">
                  <span className="flex items-center gap-2">
                    <ArrowDownLeft className="h-4 w-4 text-success" />
                    Income
                  </span>
                </SelectItem>
                <SelectItem value="debit">
                  <span className="flex items-center gap-2">
                    <ArrowUpRight className="h-4 w-4 text-destructive" />
                    Expense
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      {/* Transactions List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-xl border border-border/50 overflow-hidden"
      >
        <div className="divide-y divide-border/50">
          {filteredTransactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.02 }}
            >
              <TransactionRow transaction={transaction} />
            </motion.div>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            <p className="text-lg font-medium mb-2">No transactions found</p>
            <p className="text-sm">
              {userTransactions.length === 0
                ? "Your transaction history is empty."
                : "Try adjusting your filters to see more results."}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}











// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Download, Search, Filter, Calendar } from "lucide-react";
// import { transactions, Transaction, formatDate } from "@/data/mockData";
// import { TransactionRow } from "@/components/TransactionRow";
// import { TransactionModal } from "@/components/TransactionModal";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { toast } from "sonner";

// export default function Activity() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("all");
//   const [typeFilter, setTypeFilter] = useState("all");
//   const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

//   const categories = [...new Set(transactions.map((t) => t.category))];

//   const filteredTransactions = transactions.filter((t) => {
//     const matchesSearch = t.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       t.description.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = categoryFilter === "all" || t.category === categoryFilter;
//     const matchesType = typeFilter === "all" || t.type === typeFilter;
//     return matchesSearch && matchesCategory && matchesType;
//   });

//   // Group transactions by date
//   const groupedTransactions = filteredTransactions.reduce((groups, transaction) => {
//     const date = formatDate(transaction.date);
//     if (!groups[date]) {
//       groups[date] = [];
//     }
//     groups[date].push(transaction);
//     return groups;
//   }, {} as Record<string, Transaction[]>);

//   const handleExportCSV = () => {
//     const csv = [
//       ["Date", "Merchant", "Category", "Amount", "Type", "Status"].join(","),
//       ...filteredTransactions.map((t) =>
//         [t.date, t.merchant, t.category, t.amount, t.type, t.status].join(",")
//       ),
//     ].join("\n");

//     const blob = new Blob([csv], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "all_transactions.csv";
//     a.click();
//     URL.revokeObjectURL(url);

//     toast.success("Transactions exported successfully!");
//   };

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
//       >
//         <div>
//           <h1 className="text-3xl font-bold text-foreground mb-2">Activity</h1>
//           <p className="text-muted-foreground">
//             View all transactions across your accounts
//           </p>
//         </div>
//         <Button variant="outline" onClick={handleExportCSV}>
//           <Download className="h-4 w-4 mr-2" />
//           Export All
//         </Button>
//       </motion.div>

//       {/* Filters */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.1 }}
//         className="bg-card rounded-2xl border border-border/50 p-6"
//       >
//         <div className="flex flex-wrap gap-4">
//           <div className="relative flex-1 min-w-64">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Search transactions..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-9"
//             />
//           </div>
//           <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//             <SelectTrigger className="w-48">
//               <Filter className="h-4 w-4 mr-2" />
//               <SelectValue placeholder="Category" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Categories</SelectItem>
//               {categories.map((cat) => (
//                 <SelectItem key={cat} value={cat} className="capitalize">
//                   {cat.replace("-", " ")}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           <Select value={typeFilter} onValueChange={setTypeFilter}>
//             <SelectTrigger className="w-40">
//               <SelectValue placeholder="Type" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Types</SelectItem>
//               <SelectItem value="credit">Income</SelectItem>
//               <SelectItem value="debit">Expense</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </motion.div>

//       {/* Transactions Grouped by Date */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2 }}
//         className="space-y-6"
//       >
//         {Object.entries(groupedTransactions).map(([date, txns], groupIndex) => (
//           <div key={date} className="bg-card rounded-2xl border border-border/50 overflow-hidden">
//             <div className="px-6 py-4 border-b border-border/50 bg-secondary/30">
//               <div className="flex items-center gap-2">
//                 <Calendar className="h-4 w-4 text-muted-foreground" />
//                 <h3 className="font-medium text-foreground">{date}</h3>
//                 <span className="text-sm text-muted-foreground">
//                   ({txns.length} transactions)
//                 </span>
//               </div>
//             </div>
//             <div className="divide-y divide-border/50">
//               {txns.map((transaction) => (
//                 <TransactionRow
//                   key={transaction.id}
//                   transaction={transaction}
//                   onClick={() => setSelectedTransaction(transaction)}
//                 />
//               ))}
//             </div>
//           </div>
//         ))}

//         {filteredTransactions.length === 0 && (
//           <div className="bg-card rounded-2xl border border-border/50 p-12 text-center">
//             <p className="text-muted-foreground">No transactions found matching your criteria</p>
//           </div>
//         )}
//       </motion.div>

//       {/* Transaction Modal */}
//       <TransactionModal
//         transaction={selectedTransaction}
//         isOpen={!!selectedTransaction}
//         onClose={() => setSelectedTransaction(null)}
//       />
//     </div>
//   );
// }
