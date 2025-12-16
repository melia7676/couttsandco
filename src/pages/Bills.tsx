import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { bills } from "@/data/mockData";
import { BillPayCard } from "@/components/BillPayCard";
import { Button } from "@/components/ui/button";

export default function Bills() {
  const dueSoon = bills.filter((b) => b.status === "due" || b.status === "overdue");
  const scheduled = bills.filter((b) => b.status === "scheduled");
  const paid = bills.filter((b) => b.status === "paid");

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Pay Bills</h1>
          <p className="text-muted-foreground">Manage and pay your recurring bills</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Payee
        </Button>
      </motion.div>

      {/* Due Soon / Overdue */}
      {dueSoon.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">Action Required</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dueSoon.map((bill, index) => (
              <BillPayCard key={bill.id} bill={bill} index={index} />
            ))}
          </div>
        </motion.div>
      )}

      {/* Scheduled */}
      {scheduled.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">Scheduled Payments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scheduled.map((bill, index) => (
              <BillPayCard key={bill.id} bill={bill} index={index} />
            ))}
          </div>
        </motion.div>
      )}

      {/* Paid */}
      {paid.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">Recently Paid</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paid.map((bill, index) => (
              <BillPayCard key={bill.id} bill={bill} index={index} />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
