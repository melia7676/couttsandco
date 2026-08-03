import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  PoundSterling,
  User,
  Send,
  CheckCircle2,
  Wallet,
  Landmark,
} from "lucide-react";
import { getUserIdByEmail, getAccountsByUserId, fundAccount, formatCurrency, Account } from "@/data/users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function FundMe() {
  const navigate = useNavigate();

  // Step 1: Email lookup
  const [email, setEmail] = useState("");
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [recipient, setRecipient] = useState<{ userId: string; fullName: string; email: string } | null>(null);
  const [recipientAccounts, setRecipientAccounts] = useState<Account[]>([]);

  // Step 2: Fund form
  const [selectedAccount, setSelectedAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [senderName, setSenderName] = useState("");
  const [isFunding, setIsFunding] = useState(false);
  const [funded, setFunded] = useState(false);

  const handleLookup = async () => {
    if (!email.trim()) {
      toast.error("Please enter an email address");
      return;
    }
    setIsLookingUp(true);
    setRecipient(null);
    setRecipientAccounts([]);
    setSelectedAccount("");

    const result = await getUserIdByEmail(email.trim());
    if (result) {
      setRecipient(result);
      const accounts = getAccountsByUserId(result.userId);
      setRecipientAccounts(accounts);
      toast.success("Recipient found", {
        description: `${result.fullName} (${result.email})`,
      });
    } else {
      toast.error("User not found", {
        description: `No account found for ${email.trim()}`,
      });
    }
    setIsLookingUp(false);
  };

  const handleFund = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !selectedAccount) return;

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (!senderName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    setIsFunding(true);
    const result = fundAccount(recipient.userId, selectedAccount, numAmount, senderName.trim());

    if (result.success) {
      toast.success("Transfer Complete", { description: result.message });
      setFunded(true);
    } else {
      toast.error("Transfer Failed", { description: result.message });
    }
    setIsFunding(false);
  };

  const selectedAccountData = recipientAccounts.find((acc) => acc.id === selectedAccount);

  const handleReset = () => {
    setEmail("");
    setRecipient(null);
    setRecipientAccounts([]);
    setSelectedAccount("");
    setAmount("");
    setSenderName("");
    setFunded(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Landmark className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-lg font-bold text-foreground">Coutts & Co</h1>
              <p className="text-xs text-muted-foreground">Send Funds</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
            Sign In
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-start justify-center pt-8 sm:pt-16 px-4 pb-24">
        <div className="w-full max-w-lg space-y-6">
          <AnimatePresence mode="wait">
            {/* Success State */}
            {funded ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card rounded-2xl border border-border/50 p-8 text-center space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-10 w-10 text-success" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Transfer Sent!</h2>
                  <p className="text-muted-foreground">
                    {senderName} sent {formatCurrency(parseFloat(amount))} to {recipient?.fullName}
                  </p>
                </div>
                <div className="bg-secondary/30 rounded-xl p-4 text-left space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Recipient</span>
                    <span className="font-medium text-foreground">{recipient?.fullName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium text-foreground">{recipient?.email}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Account</span>
                    <span className="font-medium text-foreground">{selectedAccountData?.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-bold text-foreground">{formatCurrency(parseFloat(amount))}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button onClick={handleReset} className="flex-1">
                    Send Another
                  </Button>
                  <Button variant="outline" onClick={() => navigate("/login")} className="flex-1">
                    Go to Login
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Title */}
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-foreground mb-2">Send Funds</h1>
                  <p className="text-muted-foreground">
                    Deposit money into anyone's Coutts & Co account
                  </p>
                </div>

                {/* Step 1: Find Recipient */}
                <div className="bg-card rounded-2xl border border-border/50 p-6 space-y-4">
                  <h2 className="font-semibold text-foreground flex items-center gap-2">
                    <Search className="h-4 w-4 text-primary" />
                    Find Recipient
                  </h2>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        type="email"
                        placeholder="recipient@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleLookup()}
                        disabled={isLookingUp || !!recipient}
                        className="h-12"
                      />
                    </div>
                    {!recipient ? (
                      <Button
                        onClick={handleLookup}
                        disabled={isLookingUp || !email.trim()}
                        className="h-12 px-6"
                      >
                        {isLookingUp ? "Searching..." : "Find"}
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={handleReset}
                        className="h-12 px-6"
                      >
                        Change
                      </Button>
                    )}
                  </div>

                  {/* Recipient Info */}
                  <AnimatePresence>
                    {recipient && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-4 bg-primary/5 border border-primary/20 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                            <span className="text-sm font-bold text-primary-foreground">
                              {recipient.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{recipient.fullName}</p>
                            <p className="text-sm text-muted-foreground">{recipient.email}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Step 2: Fund Details */}
                <AnimatePresence>
                  {recipient && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-card rounded-2xl border border-border/50 p-6 space-y-6"
                    >
                      <h2 className="font-semibold text-foreground flex items-center gap-2">
                        <PoundSterling className="h-4 w-4 text-primary" />
                        Transfer Details
                      </h2>

                      <form onSubmit={handleFund} className="space-y-5">
                        {/* Select Account */}
                        <div className="space-y-2">
                          <Label htmlFor="account">Recipient Account</Label>
                          <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                            <SelectTrigger id="account" className="h-12">
                              <SelectValue placeholder="Choose account to fund" />
                            </SelectTrigger>
                            <SelectContent>
                              {recipientAccounts.map((account) => (
                                <SelectItem key={account.id} value={account.id}>
                                  <div className="flex items-center justify-between w-full gap-4">
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

                        {/* Selected Account Preview */}
                        <AnimatePresence>
                          {selectedAccountData && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="p-4 bg-secondary/30 rounded-xl flex items-center justify-between"
                            >
                              <div>
                                <p className="text-sm text-muted-foreground">Current Balance</p>
                                <p className="text-xl font-bold text-foreground">
                                  {formatCurrency(selectedAccountData.balance)}
                                </p>
                              </div>
                              <Wallet className="h-8 w-8 text-muted-foreground" />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Amount */}
                        <div className="space-y-2">
                          <Label htmlFor="amount" className="flex items-center gap-2">
                            <PoundSterling className="h-4 w-4 text-muted-foreground" />
                            Amount
                          </Label>
                          <div className="relative">
                            <PoundSterling className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="amount"
                              type="number"
                              min="0.01"
                              step="0.01"
                              placeholder="0.00"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                              className="pl-10 h-12"
                              required
                            />
                          </div>
                        </div>

                        {/* Sender Name */}
                        <div className="space-y-2">
                          <Label htmlFor="sender" className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            Your Name
                          </Label>
                          <Input
                            id="sender"
                            type="text"
                            placeholder="e.g. John Smith"
                            value={senderName}
                            onChange={(e) => setSenderName(e.target.value)}
                            className="h-12"
                            required
                          />
                        </div>

                        {/* Submit */}
                        <Button
                          type="submit"
                          className="w-full h-12 text-base gap-2"
                          disabled={isFunding || !selectedAccount}
                        >
                          {isFunding ? (
                            "Processing..."
                          ) : (
                            <>
                              <Send className="h-4 w-4" />
                              Send Funds
                            </>
                          )}
                        </Button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Info */}
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-medium text-foreground mb-1">How it works</h3>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Enter the recipient's registered email address</li>
                        <li>• Choose which of their accounts to fund</li>
                        <li>• The money is credited instantly</li>
                        <li>• They'll receive a notification and transaction record</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        © 2026 Coutts & Co. All rights reserved.
      </footer>
    </div>
  );
}