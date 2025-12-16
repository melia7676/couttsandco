import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Lock, Unlock, Settings, Eye, EyeOff } from "lucide-react";
import { cards, formatCurrency, getAccountById } from "@/data/mockData";
import { CreditCardVisual } from "@/components/CreditCardVisual";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function Cards() {
  const [cardStates, setCardStates] = useState(
    cards.reduce((acc, card) => ({ ...acc, [card.id]: card.isLocked }), {} as Record<string, boolean>)
  );
  const [showDetails, setShowDetails] = useState<Record<string, boolean>>({});

  const toggleCardLock = (cardId: string) => {
    setCardStates((prev) => {
      const newState = !prev[cardId];
      toast.success(newState ? "Card locked" : "Card unlocked", {
        description: newState 
          ? "Your card has been temporarily locked for security." 
          : "Your card is now active and ready to use.",
      });
      return { ...prev, [cardId]: newState };
    });
  };

  const toggleShowDetails = (cardId: string) => {
    setShowDetails((prev) => ({ ...prev, [cardId]: !prev[cardId] }));
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Cards</h1>
          <p className="text-muted-foreground">Manage your debit and credit cards</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Request New Card
        </Button>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {cards.map((card, index) => {
          const account = getAccountById(card.accountId);
          const isLocked = cardStates[card.id];
          const isDetailsVisible = showDetails[card.id];

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl border border-border/50 p-6"
            >
              {/* Card Visual */}
              <div className="flex justify-center mb-6">
                <CreditCardVisual 
                  card={{ ...card, isLocked }} 
                  size="md"
                />
              </div>

              {/* Card Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{card.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">
                      {card.type} • {card.network}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isLocked 
                      ? "bg-destructive/10 text-destructive" 
                      : "bg-success/10 text-success"
                  }`}>
                    {isLocked ? "Locked" : "Active"}
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-4 bg-secondary/30 rounded-xl space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Card Number</span>
                    <span className="text-sm font-mono">
                      {isDetailsVisible ? card.cardNumber : `•••• •••• •••• ${card.lastFour}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Expires</span>
                    <span className="text-sm font-mono">{card.expiryDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">CVV</span>
                    <span className="text-sm font-mono">
                      {isDetailsVisible ? "247" : "•••"}
                    </span>
                  </div>
                  {account && (
                    <div className="flex justify-between pt-2 border-t border-border/50">
                      <span className="text-sm text-muted-foreground">
                        {card.type === "credit" ? "Balance Owed" : "Available"}
                      </span>
                      <span className="text-sm font-semibold">
                        {formatCurrency(account.balance)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleShowDetails(card.id)}
                    className="flex-1"
                  >
                    {isDetailsVisible ? (
                      <><EyeOff className="h-4 w-4 mr-2" /> Hide Details</>
                    ) : (
                      <><Eye className="h-4 w-4 mr-2" /> Show Details</>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </div>

                {/* Lock Toggle */}
                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    {isLocked ? (
                      <Lock className="h-5 w-5 text-destructive" />
                    ) : (
                      <Unlock className="h-5 w-5 text-success" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {isLocked ? "Card Locked" : "Card Active"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {isLocked 
                          ? "All transactions are blocked" 
                          : "Card is ready for use"}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={!isLocked}
                    onCheckedChange={() => toggleCardLock(card.id)}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
