import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Receipt, Calendar, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getBillsByUserId, formatCurrency, formatDate } from "@/data/users";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Bills() {
  const { user } = useAuth();
  const userBills = user ? getBillsByUserId(user.id) : [];

  const [bills, setBills] = useState(userBills);

  const handlePayBill = (billId: string) => {
    setBills((prev) =>
      prev.map((b) =>
        b.id === billId ? { ...b, status: "paid" as const } : b
      )
    );
    toast.success("Bill payment scheduled", {
      description: "Your payment will be processed within 24 hours.",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      case "overdue":
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      default:
        return <Calendar className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-success/10 text-success";
      case "overdue":
        return "bg-destructive/10 text-destructive";
      case "scheduled":
        return "bg-primary/10 text-primary";
      default:
        return "bg-warning/10 text-warning";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Bill Pay</h1>
          <p className="text-muted-foreground">Manage and pay your bills</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Payee
        </Button>
      </motion.div>

      {/* Bills List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl border border-border/50 overflow-hidden"
      >
        {bills.length === 0 ? (
          <div className="p-12 text-center">
            <Receipt className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Bills Found</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              You don't have any bills set up yet. Add a payee to get started with bill payments.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {bills.map((bill, index) => (
              <motion.div
                key={bill.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 flex items-center justify-between hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl">
                    {bill.logo}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{bill.payeeName}</h3>
                    <p className="text-sm text-muted-foreground">{bill.category}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Account: {bill.accountNumber}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-foreground">
                    {formatCurrency(bill.amount)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Due {formatDate(bill.dueDate)}
                  </p>
                  <div className="flex items-center gap-2 mt-2 justify-end">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bill.status)}`}>
                      {bill.status}
                    </span>
                    {bill.isAutoPay && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        AutoPay
                      </span>
                    )}
                  </div>
                </div>

                <div className="ml-6 flex items-center gap-3">
                  {getStatusIcon(bill.status)}
                  {bill.status !== "paid" && (
                    <Button size="sm" onClick={() => handlePayBill(bill.id)}>
                      Pay Now
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}





// import { motion } from "framer-motion";
// import { Plus } from "lucide-react";
// import { bills } from "@/data/mockData";
// import { BillPayCard } from "@/components/BillPayCard";
// import { Button } from "@/components/ui/button";

// export default function Bills() {
//   const dueSoon = bills.filter((b) => b.status === "due" || b.status === "overdue");
//   const scheduled = bills.filter((b) => b.status === "scheduled");
//   const paid = bills.filter((b) => b.status === "paid");

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
//       >
//         <div>
//           <h1 className="text-3xl font-bold text-foreground mb-2">Pay Bills</h1>
//           <p className="text-muted-foreground">Manage and pay your recurring bills</p>
//         </div>
//         <Button>
//           <Plus className="h-4 w-4 mr-2" />
//           Add Payee
//         </Button>
//       </motion.div>

//       {/* Due Soon / Overdue */}
//       {dueSoon.length > 0 && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//         >
//           <h2 className="text-lg font-semibold text-foreground mb-4">Action Required</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {dueSoon.map((bill, index) => (
//               <BillPayCard key={bill.id} bill={bill} index={index} />
//             ))}
//           </div>
//         </motion.div>
//       )}

//       {/* Scheduled */}
//       {scheduled.length > 0 && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//         >
//           <h2 className="text-lg font-semibold text-foreground mb-4">Scheduled Payments</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {scheduled.map((bill, index) => (
//               <BillPayCard key={bill.id} bill={bill} index={index} />
//             ))}
//           </div>
//         </motion.div>
//       )}

//       {/* Paid */}
//       {paid.length > 0 && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//         >
//           <h2 className="text-lg font-semibold text-foreground mb-4">Recently Paid</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {paid.map((bill, index) => (
//               <BillPayCard key={bill.id} bill={bill} index={index} />
//             ))}
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// }
