import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Tag, CreditCard, MapPin, Hash } from "lucide-react";
import { Transaction, formatCurrency, formatDate, formatTime, getAccountById } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TransactionModalProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TransactionModal({ transaction, isOpen, onClose }: TransactionModalProps) {
  if (!transaction) return null;

  const account = getAccountById(transaction.accountId);
  const isCredit = transaction.type === "credit";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
          >
            <div className="bg-card rounded-2xl border border-border shadow-2xl overflow-hidden mx-4">
              {/* Header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center text-3xl">
                      {transaction.logo || "💳"}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">
                        {transaction.merchant}
                      </h2>
                      <p className="text-sm text-muted-foreground capitalize">
                        {transaction.category.replace("-", " ")}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Amount */}
              <div className="p-6 bg-secondary/30">
                <p className="text-sm text-muted-foreground mb-1">Amount</p>
                <p className={cn(
                  "text-4xl font-bold",
                  isCredit ? "text-success" : "text-foreground"
                )}>
                  {isCredit ? "+" : "-"}{formatCurrency(transaction.amount)}
                </p>
              </div>

              {/* Details */}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date & Time</p>
                    <p className="font-medium">
                      {formatDate(transaction.date)} at {formatTime(transaction.date)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Account</p>
                    <p className="font-medium">
                      {account?.name} (•••• {account?.lastFour})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Tag className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className={cn(
                      "font-medium capitalize",
                      transaction.status === "completed" && "text-success",
                      transaction.status === "pending" && "text-amber-500",
                      transaction.status === "failed" && "text-destructive"
                    )}>
                      {transaction.status}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Hash className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Transaction ID</p>
                    <p className="font-medium font-mono text-sm">{transaction.id.toUpperCase()}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 border-t border-border flex gap-3">
                <Button variant="outline" className="flex-1">
                  Report Issue
                </Button>
                <Button className="flex-1">
                  Download Receipt
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
