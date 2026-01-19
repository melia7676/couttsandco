import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, AlertCircle, ArrowLeft, Building, User, Clock, Shield } from "lucide-react";
import { accounts, formatCurrency } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { QuickTransferButtons } from "@/components/QuickTransferButtons";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ukPayees = [
  { id: "payee-1", name: "John Smith", sortCode: "20-45-67", accountNo: "****4523", bank: "Barclays" },
  { id: "payee-2", name: "Sarah Williams", sortCode: "40-12-34", accountNo: "****7891", bank: "HSBC" },
  { id: "payee-3", name: "Thames Water", sortCode: "30-90-12", accountNo: "****3456", bank: "NatWest" },
  { id: "payee-4", name: "British Gas", sortCode: "20-00-00", accountNo: "****8901", bank: "Lloyds" },
];

const internationalPayees = [
  { id: "int-1", name: "Marie Dupont", iban: "FR76 **** **** 4523", country: "France" },
  { id: "int-2", name: "Hans Mueller", iban: "DE89 **** **** 7891", country: "Germany" },
];

export default function Transfer() {
  const [transferType, setTransferType] = useState<string>("");
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [sortCode, setSortCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [payeeName, setPayeeName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [step, setStep] = useState<"type" | "details" | "confirm">("type");
  const [showUnavailable, setShowUnavailable] = useState(false);

  const sourceAccounts = accounts.filter((a) => a.type !== "credit" && a.type !== "investment");

  const selectedFromAccount = accounts.find((a) => a.id === fromAccount);
  const amountNum = parseFloat(amount) || 0;
  const isValidAmount = amountNum > 0 && (!selectedFromAccount || amountNum <= selectedFromAccount.balance);

  const handleTransfer = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsComplete(true);

    toast.success(`Payment of ${formatCurrency(amountNum)} sent!`, {
      description: "Your payment has been processed successfully.",
    });

    setTimeout(() => {
      resetForm();
    }, 3000);
  };

  const resetForm = () => {
    setIsComplete(false);
    setTransferType("");
    setFromAccount("");
    setToAccount("");
    setAmount("");
    setReference("");
    setSortCode("");
    setAccountNumber("");
    setPayeeName("");
    setStep("type");
  };

  const handleSelectType = (type: string) => {
    setShowUnavailable(true);
  };

  const handleBack = () => {
    if (step === "confirm") {
      setStep("details");
    } else if (step === "details") {
      setStep("type");
      setTransferType("");
    }
  };

  const getTransferTitle = () => {
    switch (transferType) {
      case "bank-transfer": return "UK Bank Transfer";
      case "wire-transfer": return "International Wire Transfer";
      case "pay-bills": return "Pay a Bill";
      case "standing-order": return "Set Up Standing Order";
      case "between-accounts": return "Transfer Between Accounts";
      case "pay-someone": return "Pay a Saved Payee";
      default: return "Make a Payment";
    }
  };

  const renderDetailsForm = () => {
    switch (transferType) {
      case "bank-transfer":
      case "pay-someone":
        return (
          <div className="space-y-5">
            {/* From Account */}
            <div className="space-y-2">
              <Label htmlFor="from" className="text-sm font-medium">Pay from</Label>
              <Select value={fromAccount} onValueChange={setFromAccount}>
                <SelectTrigger id="from" className="h-12">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  {sourceAccounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      <div className="flex justify-between items-center gap-4">
                        <span>{account.name}</span>
                        <span className="text-muted-foreground text-sm">
                          {formatCurrency(account.balance)}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Payee Selection or New */}
            {transferType === "pay-someone" ? (
              <div className="space-y-2">
                <Label htmlFor="payee" className="text-sm font-medium">Pay to</Label>
                <Select value={toAccount} onValueChange={setToAccount}>
                  <SelectTrigger id="payee" className="h-12">
                    <SelectValue placeholder="Select payee" />
                  </SelectTrigger>
                  <SelectContent>
                    {ukPayees.map((payee) => (
                      <SelectItem key={payee.id} value={payee.id}>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            <User className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <div className="font-medium">{payee.name}</div>
                            <div className="text-xs text-muted-foreground">{payee.sortCode} • {payee.accountNo}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="payeeName" className="text-sm font-medium">Payee name</Label>
                  <Input
                    id="payeeName"
                    placeholder="Enter payee name"
                    value={payeeName}
                    onChange={(e) => setPayeeName(e.target.value)}
                    className="h-12"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sortCode" className="text-sm font-medium">Sort code</Label>
                    <Input
                      id="sortCode"
                      placeholder="00-00-00"
                      value={sortCode}
                      onChange={(e) => setSortCode(e.target.value)}
                      className="h-12"
                      maxLength={8}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber" className="text-sm font-medium">Account number</Label>
                    <Input
                      id="accountNumber"
                      placeholder="12345678"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className="h-12"
                      maxLength={8}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-medium">Amount</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg font-medium">£</span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10 h-14 text-2xl font-semibold"
                  step="0.01"
                  min="0"
                />
              </div>
              {selectedFromAccount && amountNum > selectedFromAccount.balance && (
                <div className="flex items-center gap-2 text-destructive text-sm">
                  <AlertCircle className="h-4 w-4" />
                  Insufficient funds
                </div>
              )}
            </div>

            {/* Reference */}
            <div className="space-y-2">
              <Label htmlFor="reference" className="text-sm font-medium">Payment reference</Label>
              <Input
                id="reference"
                placeholder="What's this payment for?"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="h-12"
                maxLength={18}
              />
              <p className="text-xs text-muted-foreground">Maximum 18 characters</p>
            </div>
          </div>
        );

      case "between-accounts":
        return (
          <div className="space-y-5">
            <div className="space-y-2">
              <Label className="text-sm font-medium">From</Label>
              <Select value={fromAccount} onValueChange={setFromAccount}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  {sourceAccounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      <div className="flex items-center gap-3">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div>{account.name}</div>
                          <div className="text-xs text-muted-foreground">{formatCurrency(account.balance)} available</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <ArrowRight className="h-5 w-5 text-muted-foreground rotate-90" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">To</Label>
              <Select value={toAccount} onValueChange={setToAccount}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  {sourceAccounts.filter(a => a.id !== fromAccount).map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      <div className="flex items-center gap-3">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div>{account.name}</div>
                          <div className="text-xs text-muted-foreground">{formatCurrency(account.balance)} available</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Amount</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg font-medium">£</span>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10 h-14 text-2xl font-semibold"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>
          </div>
        );

      case "wire-transfer":
        return (
          <div className="space-y-5">
            <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-700">International transfer</p>
                  <p className="text-xs text-amber-600 mt-1">Transfers typically take 2-5 business days</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Pay from</Label>
              <Select value={fromAccount} onValueChange={setFromAccount}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  {sourceAccounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name} - {formatCurrency(account.balance)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Beneficiary</Label>
              <Select value={toAccount} onValueChange={setToAccount}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select beneficiary" />
                </SelectTrigger>
                <SelectContent>
                  {internationalPayees.map((payee) => (
                    <SelectItem key={payee.id} value={payee.id}>
                      <div>
                        <div className="font-medium">{payee.name}</div>
                        <div className="text-xs text-muted-foreground">{payee.iban} • {payee.country}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Amount (GBP)</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg font-medium">£</span>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10 h-14 text-2xl font-semibold"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Reference</Label>
              <Textarea
                placeholder="Payment reference or message"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                rows={2}
              />
            </div>
          </div>
        );

      case "pay-bills":
        return (
          <div className="space-y-5">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Pay from</Label>
              <Select value={fromAccount} onValueChange={setFromAccount}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  {sourceAccounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name} - {formatCurrency(account.balance)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Bill payee</Label>
              <Select value={toAccount} onValueChange={setToAccount}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select bill" />
                </SelectTrigger>
                <SelectContent>
                  {ukPayees.filter(p => p.name.includes("Water") || p.name.includes("Gas")).map((payee) => (
                    <SelectItem key={payee.id} value={payee.id}>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                          <Building className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div>
                          <div className="font-medium">{payee.name}</div>
                          <div className="text-xs text-muted-foreground">{payee.bank}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Amount</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg font-medium">£</span>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10 h-14 text-2xl font-semibold"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Customer reference</Label>
              <Input
                placeholder="Account or reference number"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="h-12"
              />
            </div>
          </div>
        );

      case "standing-order":
        return (
          <div className="space-y-5">
            <div className="p-4 bg-violet-500/10 rounded-lg border border-violet-500/20">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-violet-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-violet-700">Regular payment</p>
                  <p className="text-xs text-violet-600 mt-1">Set up a recurring payment to the same payee</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Pay from</Label>
              <Select value={fromAccount} onValueChange={setFromAccount}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  {sourceAccounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name} - {formatCurrency(account.balance)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Pay to</Label>
              <Select value={toAccount} onValueChange={setToAccount}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select payee" />
                </SelectTrigger>
                <SelectContent>
                  {ukPayees.map((payee) => (
                    <SelectItem key={payee.id} value={payee.id}>
                      {payee.name} - {payee.sortCode}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Amount each time</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg font-medium">£</span>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10 h-14 text-2xl font-semibold"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Frequency</Label>
              <Select defaultValue="monthly">
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="fortnightly">Fortnightly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Reference</Label>
              <Input
                placeholder="Payment reference"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="h-12"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    if (!fromAccount || !isValidAmount) return false;
    if (transferType === "between-accounts" && !toAccount) return false;
    if (transferType === "pay-someone" && !toAccount) return false;
    if (transferType === "bank-transfer" && (!sortCode || !accountNumber || !payeeName)) return false;
    return true;
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        {step !== "type" && (
          <Button variant="ghost" size="icon" onClick={handleBack} className="shrink-0">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <div>
          <h1 className="text-2xl font-bold text-foreground">{getTransferTitle()}</h1>
          <p className="text-muted-foreground text-sm">
            {step === "type" 
              ? "Fast, secure payments with Coutts & Co" 
              : transferType === "wire-transfer" 
                ? "Send money internationally"
                : "Enter payment details"}
          </p>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {isComplete ? (
          <motion.div
            key="complete"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-card rounded-2xl border border-border/50 p-8"
          >
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
                <Check className="h-10 w-10 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Payment Sent</h2>
              <p className="text-muted-foreground mb-4">
                {formatCurrency(amountNum)} has been sent successfully
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Secured by Coutts & Co</span>
              </div>
            </div>
          </motion.div>
        ) : step === "type" ? (
          <motion.div
            key="type"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-card rounded-2xl border border-border/50 p-6"
          >
            <QuickTransferButtons onSelectType={handleSelectType} selectedType={transferType} />
          </motion.div>
        ) : (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-card rounded-2xl border border-border/50 p-6 md:p-8"
          >
            <form onSubmit={(e) => { e.preventDefault(); handleTransfer(); }}>
              {renderDetailsForm()}

              <div className="mt-8 pt-6 border-t border-border/50">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 text-base font-semibold"
                  disabled={!canProceed() || isProcessing}
                >
                  {isProcessing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                    />
                  ) : (
                    <>
                      {transferType === "standing-order" ? "Set Up Standing Order" : `Pay ${amount ? formatCurrency(amountNum) : ""}`}
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-4 flex items-center justify-center gap-1">
                  <Shield className="h-3 w-3" />
                  Payments are protected by 256-bit encryption
                </p>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <AlertDialog open={showUnavailable} onOpenChange={setShowUnavailable}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle> Account Protection in Effect </AlertDialogTitle>
            <AlertDialogDescription>
              For security reasons, electronic transfers are temporarily disabled.Please visit a bank branch to withdraw funds safely.
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
