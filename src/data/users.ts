// User Data for Coutts & Co
// All users have password: "kinsey"

export interface UserProfile {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  memberSince: string;
  tier: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  totalBalance: number;
  validOtps: string[];
}

export interface Account {
  id: string;
  userId: string;
  name: string;
  type: "checking" | "savings" | "money-market" | "credit" | "investment";
  balance: number;
  accountNumber: string;
  lastFour: string;
  interestRate?: number;
  creditLimit?: number;
  availableCredit?: number;
  routingNumber?: string;
  isActive: boolean;
}

export interface Transaction {
  id: string;
  accountId: string;
  userId: string;
  date: string;
  description: string;
  merchant: string;
  category: TransactionCategory;
  amount: number;
  type: "credit" | "debit";
  status: "completed" | "pending" | "failed";
  logo?: string;
}

export type TransactionCategory =
  | "salary"
  | "investment"
  | "transfer"
  | "groceries"
  | "dining"
  | "travel"
  | "shopping"
  | "utilities"
  | "entertainment"
  | "healthcare"
  | "insurance"
  | "subscription"
  | "dividend"
  | "refund"
  | "atm"
  | "bill-payment";

export interface Card {
  id: string;
  userId: string;
  accountId: string;
  type: "debit" | "credit";
  name: string;
  cardNumber: string;
  lastFour: string;
  expiryDate: string;
  cvv: string;
  isLocked: boolean;
  network: "visa" | "mastercard";
  color: "navy" | "gold" | "platinum";
}

export interface Bill {
  id: string;
  userId: string;
  payeeName: string;
  category: string;
  accountNumber: string;
  amount: number;
  dueDate: string;
  isAutoPay: boolean;
  logo: string;
  status: "due" | "paid" | "overdue" | "scheduled";
}

export interface Investment {
  id: string;
  userId: string;
  symbol: string;
  name: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  value: number;
  gainLoss: number;
  gainLossPercent: number;
  type: "stock" | "etf" | "bond" | "mutual-fund";
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "alert";
  timestamp: string;
  isRead: boolean;
  icon: string;
}

// ============================================
// USERS DATABASE
// Password for all users: "kinsey"
// ============================================

export const users: UserProfile[] = [
  {
    id: "user-001",
    name: "Amelia Kinsey",
    firstName: "Amelia",
    lastName: "Kinsey",
    email: "amelia.kinsey@coutts.com",
    phone: "+44 20 7753 1000",
    avatar: "AK",
    memberSince: "2018",
    tier: "Platinum",
    address: {
      street: "440 Strand",
      city: "London",
      state: "",
      zip: "WC2R 0QS",
    },
    totalBalance: 6000000,
    validOtps: ["345912", "781204", "290847", "563719", "118493"],
  },
  {
    id: "user-002",
    name: "George Kinsey",
    firstName: "George",
    lastName: "Kinsey",
    email: "georgekinsey@gmail.com",
    phone: "+44 20 7753 1001",
    avatar: "GK",
    memberSince: "2019",
    tier: "Platinum",
    address: {
      street: "1 Cabot Square",
      city: "London",
      state: "",
      zip: "E14 4QJ",
    },
    totalBalance: 6000000,
    validOtps: ["678943", "412305", "987654", "305821", "750194"],
  },
  {
    id: "user-003",
    name: "Mary Kinsey",
    firstName: "Mary",
    lastName: "Kinsey",
    email: "mary.kinsey@coutts.com",
    phone: "+44 20 7753 1002",
    avatar: "MK",
    memberSince: "2020",
    tier: "Gold",
    address: {
      street: "25 Belgravia Square",
      city: "London",
      state: "",
      zip: "SW1X 8QB",
    },
    totalBalance: 5000000,
    validOtps: ["557689", "224466", "890123", "336699", "771144"],
  },
];

// Global password for all users
export const GLOBAL_PASSWORD = "SEYgeokiRGE@34521";

// Helper to find user by email
export const findUserByEmail = (email: string): UserProfile | undefined => {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
};

// Helper to validate OTP
export const validateOtp = (userId: string, otp: string): boolean => {
  const user = users.find((u) => u.id === userId);
  return user?.validOtps.includes(otp) ?? false;
};

// ============================================
// ACCOUNTS DATA
// ============================================

const generateAccounts = (): Account[] => {
  const allAccounts: Account[] = [];

  users.forEach((user) => {
    const baseId = user.id.split("-")[1];
    const isMary = user.id === "user-003";
    
    // Adjusted balances for Mary ($5M total)
    const checkingBal = isMary ? 350000 : 487320;
    const savingsBal = isMary ? 3200000 : 3850000;
    const moneyMarketBal = isMary ? 1000000 : 1200000;
    const investmentBal = isMary ? 441660 : 454340;
    const creditBal = 8340;

    allAccounts.push(
      {
        id: `acc-${baseId}-001`,
        userId: user.id,
        name: "Premier Checking",
        type: "checking",
        balance: checkingBal,
        accountNumber: `****${4521 + parseInt(baseId)}`,
        lastFour: `${4521 + parseInt(baseId)}`,
        routingNumber: "021000021",
        isActive: true,
      },
      {
        id: `acc-${baseId}-002`,
        userId: user.id,
        name: "High-Yield Savings",
        type: "savings",
        balance: savingsBal,
        accountNumber: `****${7832 + parseInt(baseId)}`,
        lastFour: `${7832 + parseInt(baseId)}`,
        interestRate: 4.75,
        routingNumber: "021000021",
        isActive: true,
      },
      {
        id: `acc-${baseId}-003`,
        userId: user.id,
        name: "Money Market",
        type: "money-market",
        balance: moneyMarketBal,
        accountNumber: `****${9156 + parseInt(baseId)}`,
        lastFour: `${9156 + parseInt(baseId)}`,
        interestRate: 5.1,
        routingNumber: "021000021",
        isActive: true,
      },
      {
        id: `acc-${baseId}-004`,
        userId: user.id,
        name: "Platinum Credit Card",
        type: "credit",
        balance: creditBal,
        accountNumber: `****${4567 + parseInt(baseId)}`,
        lastFour: `${4567 + parseInt(baseId)}`,
        creditLimit: 75000,
        availableCredit: 66660,
        isActive: true,
      },
      {
        id: `acc-${baseId}-005`,
        userId: user.id,
        name: "Investment Brokerage",
        type: "investment",
        balance: investmentBal,
        accountNumber: `****${2891 + parseInt(baseId)}`,
        lastFour: `${2891 + parseInt(baseId)}`,
        isActive: true,
      }
    );
  });

  return allAccounts;
};

export const accounts = generateAccounts();

// ============================================
// TRANSACTIONS DATA
// ============================================

const generateTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [];
  const now = new Date();

  const merchants = {
    salary: [{ name: "Apex Technologies Inc.", logo: "💼" }],
    investment: [
      { name: "Vanguard", logo: "📈" },
      { name: "Charles Schwab", logo: "📊" },
      { name: "Fidelity", logo: "💹" },
    ],
    transfer: [
      { name: "Wire Transfer", logo: "🔄" },
      { name: "ACH Transfer", logo: "↔️" },
      { name: "Zelle Transfer", logo: "💸" },
    ],
    groceries: [
      { name: "Whole Foods Market", logo: "🥬" },
      { name: "Trader Joe's", logo: "🛒" },
      { name: "Costco", logo: "🏪" },
    ],
    dining: [
      { name: "Nobu Restaurant", logo: "🍣" },
      { name: "The French Laundry", logo: "🍽️" },
      { name: "Blue Bottle Coffee", logo: "☕" },
    ],
    travel: [
      { name: "United Airlines", logo: "✈️" },
      { name: "Marriott Hotels", logo: "🏨" },
      { name: "Uber", logo: "🚗" },
    ],
    shopping: [
      { name: "Apple Store", logo: "🍎" },
      { name: "Nordstrom", logo: "👔" },
      { name: "Amazon", logo: "📦" },
    ],
    utilities: [
      { name: "PG&E", logo: "💡" },
      { name: "Comcast Xfinity", logo: "📡" },
      { name: "San Francisco Water", logo: "💧" },
    ],
    entertainment: [
      { name: "Netflix", logo: "🎬" },
      { name: "Spotify", logo: "🎵" },
      { name: "SF Opera House", logo: "🎭" },
    ],
    healthcare: [
      { name: "Kaiser Permanente", logo: "🏥" },
      { name: "CVS Pharmacy", logo: "💊" },
    ],
    subscription: [
      { name: "Wall Street Journal", logo: "📰" },
      { name: "Bloomberg Terminal", logo: "📊" },
    ],
    dividend: [
      { name: "AAPL Dividend", logo: "🍎" },
      { name: "VOO Distribution", logo: "📈" },
    ],
    "bill-payment": [
      { name: "Mortgage Payment", logo: "🏠" },
      { name: "Property Tax", logo: "📋" },
    ],
  };

  users.forEach((user) => {
    const baseId = user.id.split("-")[1];
    const checkingAccId = `acc-${baseId}-001`;
    const savingsAccId = `acc-${baseId}-002`;
    const creditAccId = `acc-${baseId}-004`;
    const investmentAccId = `acc-${baseId}-005`;

    // Monthly salary
    for (let i = 0; i < 6; i++) {
      const date = new Date(now);
      date.setMonth(date.getMonth() - i);
      date.setDate(1);
      transactions.push({
        id: `txn-${user.id}-salary-${i}`,
        accountId: checkingAccId,
        userId: user.id,
        date: date.toISOString(),
        description: "Monthly Salary Deposit",
        merchant: "Apex Technologies Inc.",
        category: "salary",
        amount: 45000,
        type: "credit",
        status: "completed",
        logo: "💼",
      });
    }

    // Investment dividends
    for (let i = 0; i < 4; i++) {
      const date = new Date(now);
      date.setMonth(date.getMonth() - i * 3);
      transactions.push({
        id: `txn-${user.id}-div-${i}`,
        accountId: investmentAccId,
        userId: user.id,
        date: date.toISOString(),
        description: "Quarterly Dividend Payment",
        merchant: "VOO Distribution",
        category: "dividend",
        amount: 8500 + Math.random() * 2000,
        type: "credit",
        status: "completed",
        logo: "📈",
      });
    }

    // Regular expenses (50-60 per user)
    const expenseCategories: TransactionCategory[] = [
      "groceries", "dining", "travel", "shopping", "utilities",
      "entertainment", "healthcare", "subscription"
    ];

    for (let day = 0; day < 45; day++) {
      const date = new Date(now);
      date.setDate(date.getDate() - day);

      const transactionsPerDay = 1 + Math.floor(Math.random() * 2);

      for (let t = 0; t < transactionsPerDay; t++) {
        const category = expenseCategories[Math.floor(Math.random() * expenseCategories.length)];
        const merchantList = merchants[category];
        const merchant = merchantList[Math.floor(Math.random() * merchantList.length)];

        let amount = 0;
        switch (category) {
          case "groceries": amount = 80 + Math.random() * 320; break;
          case "dining": amount = 45 + Math.random() * 455; break;
          case "travel": amount = 150 + Math.random() * 2850; break;
          case "shopping": amount = 50 + Math.random() * 950; break;
          case "utilities": amount = 120 + Math.random() * 280; break;
          case "entertainment": amount = 15 + Math.random() * 285; break;
          case "healthcare": amount = 25 + Math.random() * 475; break;
          case "subscription": amount = 10 + Math.random() * 90; break;
        }

        const accountId = category === "shopping" || category === "dining" || category === "travel"
          ? creditAccId
          : checkingAccId;

        transactions.push({
          id: `txn-${user.id}-${day}-${t}`,
          accountId,
          userId: user.id,
          date: date.toISOString(),
          description: merchant.name,
          merchant: merchant.name,
          category,
          amount: Math.round(amount * 100) / 100,
          type: "debit",
          status: day === 0 && t === 0 ? "pending" : "completed",
          logo: merchant.logo,
        });
      }
    }

    // Large transfers
    const transferDates = [5, 15, 30, 45];
    transferDates.forEach((daysAgo, i) => {
      const date = new Date(now);
      date.setDate(date.getDate() - daysAgo);

      transactions.push({
        id: `txn-${user.id}-transfer-${i}`,
        accountId: savingsAccId,
        userId: user.id,
        date: date.toISOString(),
        description: "Transfer from Checking",
        merchant: "Internal Transfer",
        category: "transfer",
        amount: 25000 + Math.random() * 75000,
        type: "credit",
        status: "completed",
        logo: "🔄",
      });
    });

    // Bill payments
    const billPayments = [
      { name: "Mortgage Payment", amount: 12500, day: 1 },
      { name: "Property Tax", amount: 2800, day: 15 },
      { name: "Insurance Premium", amount: 1200, day: 10 },
    ];

    for (let month = 0; month < 3; month++) {
      billPayments.forEach((bill, i) => {
        const date = new Date(now);
        date.setMonth(date.getMonth() - month);
        date.setDate(bill.day);

        transactions.push({
          id: `txn-${user.id}-bill-${month}-${i}`,
          accountId: checkingAccId,
          userId: user.id,
          date: date.toISOString(),
          description: bill.name,
          merchant: bill.name,
          category: "bill-payment",
          amount: bill.amount,
          type: "debit",
          status: "completed",
          logo: "🏠",
        });
      });
    }
  });

  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const transactions = generateTransactions();

// ============================================
// CARDS DATA
// ============================================

const generateCards = (): Card[] => {
  const allCards: Card[] = [];

  users.forEach((user, idx) => {
    const baseId = user.id.split("-")[1];
    const checkingAccId = `acc-${baseId}-001`;
    const creditAccId = `acc-${baseId}-004`;

    allCards.push(
      {
        id: `card-${baseId}-001`,
        userId: user.id,
        accountId: checkingAccId,
        type: "debit",
        name: "Premier Debit Card",
        cardNumber: `4532 1234 5678 ${4521 + parseInt(baseId)}`,
        lastFour: `${4521 + parseInt(baseId)}`,
        expiryDate: "12/27",
        cvv: "***",
        isLocked: false,
        network: "visa",
        color: "navy",
      },
      {
        id: `card-${baseId}-002`,
        userId: user.id,
        accountId: creditAccId,
        type: "credit",
        name: "Platinum Rewards Card",
        cardNumber: `5412 7534 8901 ${4567 + parseInt(baseId)}`,
        lastFour: `${4567 + parseInt(baseId)}`,
        expiryDate: "09/26",
        cvv: "***",
        isLocked: false,
        network: "mastercard",
        color: "platinum",
      },
      {
        id: `card-${baseId}-003`,
        userId: user.id,
        accountId: creditAccId,
        type: "credit",
        name: "Gold Travel Card",
        cardNumber: `4716 8523 9012 ${3456 + parseInt(baseId)}`,
        lastFour: `${3456 + parseInt(baseId)}`,
        expiryDate: "03/28",
        cvv: "***",
        isLocked: idx === 0, // First user has locked card
        network: "visa",
        color: "gold",
      }
    );
  });

  return allCards;
};

export const cards = generateCards();

// ============================================
// BILLS DATA
// ============================================

const generateBills = (): Bill[] => {
  const allBills: Bill[] = [];

  users.forEach((user) => {
    const baseId = user.id.split("-")[1];

    allBills.push(
      {
        id: `bill-${baseId}-001`,
        userId: user.id,
        payeeName: "Bay Area Mortgage Co.",
        category: "Mortgage",
        accountNumber: "****8901",
        amount: 12500,
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        isAutoPay: true,
        logo: "🏠",
        status: "scheduled",
      },
      {
        id: `bill-${baseId}-002`,
        userId: user.id,
        payeeName: "Amazon Prime",
        category: "Subscription",
        accountNumber: "****2345",
        amount: 14.99,
        dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
        isAutoPay: true,
        logo: "📦",
        status: "scheduled",
      },
      {
        id: `bill-${baseId}-003`,
        userId: user.id,
        payeeName: "Verizon Wireless",
        category: "Phone",
        accountNumber: "****5678",
        amount: 185.0,
        dueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
        isAutoPay: false,
        logo: "📱",
        status: "due",
      },
      {
        id: `bill-${baseId}-004`,
        userId: user.id,
        payeeName: "PG&E",
        category: "Utilities",
        accountNumber: "****9012",
        amount: 342.5,
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        isAutoPay: true,
        logo: "💡",
        status: "due",
      },
      {
        id: `bill-${baseId}-005`,
        userId: user.id,
        payeeName: "Comcast Xfinity",
        category: "Internet",
        accountNumber: "****3456",
        amount: 129.99,
        dueDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
        isAutoPay: true,
        logo: "📡",
        status: "scheduled",
      },
      {
        id: `bill-${baseId}-006`,
        userId: user.id,
        payeeName: "Tesla Financing",
        category: "Auto",
        accountNumber: "****5670",
        amount: 1850.0,
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        isAutoPay: true,
        logo: "🚗",
        status: "scheduled",
      }
    );
  });

  return allBills;
};

export const bills = generateBills();

// ============================================
// INVESTMENTS DATA
// ============================================

const generateInvestments = (): Investment[] => {
  const allInvestments: Investment[] = [];

  users.forEach((user) => {
    const baseId = user.id.split("-")[1];

    allInvestments.push(
      {
        id: `inv-${baseId}-001`,
        userId: user.id,
        symbol: "AAPL",
        name: "Apple Inc.",
        shares: 250,
        avgCost: 145.0,
        currentPrice: 178.5,
        value: 44625,
        gainLoss: 8375,
        gainLossPercent: 23.1,
        type: "stock",
      },
      {
        id: `inv-${baseId}-002`,
        userId: user.id,
        symbol: "TSLA",
        name: "Tesla Inc.",
        shares: 100,
        avgCost: 220.0,
        currentPrice: 248.75,
        value: 24875,
        gainLoss: 2875,
        gainLossPercent: 13.07,
        type: "stock",
      },
      {
        id: `inv-${baseId}-003`,
        userId: user.id,
        symbol: "VOO",
        name: "Vanguard S&P 500 ETF",
        shares: 450,
        avgCost: 380.0,
        currentPrice: 425.0,
        value: 191250,
        gainLoss: 20250,
        gainLossPercent: 11.84,
        type: "etf",
      },
      {
        id: `inv-${baseId}-004`,
        userId: user.id,
        symbol: "MSFT",
        name: "Microsoft Corp.",
        shares: 180,
        avgCost: 310.0,
        currentPrice: 378.5,
        value: 68130,
        gainLoss: 12330,
        gainLossPercent: 22.1,
        type: "stock",
      },
      {
        id: `inv-${baseId}-005`,
        userId: user.id,
        symbol: "NVDA",
        name: "NVIDIA Corp.",
        shares: 45,
        avgCost: 420.0,
        currentPrice: 485.3,
        value: 21835,
        gainLoss: 2935,
        gainLossPercent: 15.54,
        type: "stock",
      }
    );
  });

  return allInvestments;
};

export const investments = generateInvestments();

// ============================================
// NOTIFICATIONS DATA
// ============================================

const generateNotifications = (): Notification[] => {
  const allNotifications: Notification[] = [];

  users.forEach((user) => {
    const baseId = user.id.split("-")[1];

    allNotifications.push(
      {
        id: `notif-${baseId}-001`,
        userId: user.id,
        title: "Large Deposit Received",
        message: "A deposit of $45,000.00 has been credited to your Premier Checking account.",
        type: "success",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        isRead: false,
        icon: "💰",
      },
      {
        id: `notif-${baseId}-002`,
        userId: user.id,
        title: "New Card Shipped",
        message: "Your replacement Platinum Rewards Card has been shipped.",
        type: "info",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        isRead: false,
        icon: "📦",
      },
      {
        id: `notif-${baseId}-003`,
        userId: user.id,
        title: "Bill Due Soon",
        message: "Your Verizon Wireless bill of $185.00 is due in 3 days.",
        type: "warning",
        timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        isRead: false,
        icon: "📋",
      },
      {
        id: `notif-${baseId}-004`,
        userId: user.id,
        title: "Investment Alert",
        message: "NVDA has increased by 5.2% today.",
        type: "info",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        isRead: true,
        icon: "📈",
      },
      {
        id: `notif-${baseId}-005`,
        userId: user.id,
        title: "Security Alert",
        message: "New login detected from San Francisco, CA.",
        type: "alert",
        timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
        isRead: true,
        icon: "🔒",
      }
    );
  });

  return allNotifications;
};

export const notifications = generateNotifications();

// ============================================
// HELPER FUNCTIONS
// ============================================

export const quickTransferAmounts = [500, 1000, 2500, 5000, 10000];

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const formatTime = (dateString: string): string => {
  return new Date(dateString).toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const getAccountsByUserId = (userId: string): Account[] => {
  return accounts.filter((acc) => acc.userId === userId);
};

export const getAccountById = (id: string): Account | undefined => {
  return accounts.find((acc) => acc.id === id);
};

export const getTransactionsByUserId = (userId: string): Transaction[] => {
  return transactions.filter((txn) => txn.userId === userId);
};

export const getTransactionsByAccountId = (accountId: string): Transaction[] => {
  return transactions.filter((txn) => txn.accountId === accountId);
};

export const getCardsByUserId = (userId: string): Card[] => {
  return cards.filter((card) => card.userId === userId);
};

export const getBillsByUserId = (userId: string): Bill[] => {
  return bills.filter((bill) => bill.userId === userId);
};

export const getInvestmentsByUserId = (userId: string): Investment[] => {
  return investments.filter((inv) => inv.userId === userId);
};

export const getNotificationsByUserId = (userId: string): Notification[] => {
  return notifications.filter((notif) => notif.userId === userId);
};
