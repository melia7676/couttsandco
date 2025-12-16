// User Data
export const currentUser = {
  id: "user-001",
  name: "George Kinsey",
  firstName: "George",
  lastName: "Kinsey",
  email: "george.kinsey@apexbank.com",
  phone: "(555) 123-4567",
  avatar: "GK",
  memberSince: "2019",
  tier: "Platinum",
  address: {
    street: "1847 Parkview Drive",
    city: "San Francisco",
    state: "CA",
    zip: "94102",
  },
};

// Account Types
export type AccountType = "checking" | "savings" | "money-market" | "credit" | "investment";

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  accountNumber: string;
  lastFour: string;
  interestRate?: number;
  creditLimit?: number;
  availableCredit?: number;
  routingNumber?: string;
  isActive: boolean;
}

export const accounts: Account[] = [
  {
    id: "acc-001",
    name: "Premier Checking",
    type: "checking",
    balance: 487320.0,
    accountNumber: "****4521",
    lastFour: "4521",
    routingNumber: "021000021",
    isActive: true,
  },
  {
    id: "acc-002",
    name: "High-Yield Savings",
    type: "savings",
    balance: 3850000.0,
    accountNumber: "****7832",
    lastFour: "7832",
    interestRate: 4.75,
    routingNumber: "021000021",
    isActive: true,
  },
  {
    id: "acc-003",
    name: "Money Market",
    type: "money-market",
    balance: 1200000.0,
    accountNumber: "****9156",
    lastFour: "9156",
    interestRate: 5.1,
    routingNumber: "021000021",
    isActive: true,
  },
  {
    id: "acc-004",
    name: "Platinum Credit Card",
    type: "credit",
    balance: 8340.0,
    accountNumber: "****4567",
    lastFour: "4567",
    creditLimit: 75000,
    availableCredit: 66660,
    isActive: true,
  },
  {
    id: "acc-005",
    name: "Investment Brokerage",
    type: "investment",
    balance: 454340.0,
    accountNumber: "****2891",
    lastFour: "2891",
    isActive: true,
  },
];

export const totalPortfolioBalance = 6000000.0;

// Transaction Categories
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

export interface Transaction {
  id: string;
  accountId: string;
  date: string;
  description: string;
  merchant: string;
  category: TransactionCategory;
  amount: number;
  type: "credit" | "debit";
  status: "completed" | "pending" | "failed";
  logo?: string;
}

// Generate realistic transactions
const generateTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [];
  // Use November 2018 as the base date for all transactions
  const now = new Date('2018-11-28T12:00:00.000Z');

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
    insurance: [
      { name: "Allstate Insurance", logo: "🛡️" },
      { name: "Blue Cross", logo: "🏥" },
    ],
    subscription: [
      { name: "Wall Street Journal", logo: "📰" },
      { name: "New York Times", logo: "📰" },
      { name: "Bloomberg Terminal", logo: "📊" },
    ],
    dividend: [
      { name: "AAPL Dividend", logo: "🍎" },
      { name: "VOO Distribution", logo: "📈" },
    ],
    refund: [{ name: "Merchant Refund", logo: "↩️" }],
    atm: [{ name: "ATM Withdrawal", logo: "🏧" }],
    "bill-payment": [
      { name: "Mortgage Payment", logo: "🏠" },
      { name: "Property Tax", logo: "📋" },
    ],
  };

  // Monthly salary
  for (let i = 0; i < 6; i++) {
    const date = new Date(now);
    date.setMonth(date.getMonth() - i);
    date.setDate(1);
    transactions.push({
      id: `txn-salary-${i}`,
      accountId: "acc-001",
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
      id: `txn-div-${i}`,
      accountId: "acc-005",
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

  // Regular expenses
  const expenseCategories: TransactionCategory[] = [
    "groceries", "dining", "travel", "shopping", "utilities",
    "entertainment", "healthcare", "subscription"
  ];

  for (let day = 0; day < 90; day++) {
    const date = new Date(now);
    date.setDate(date.getDate() - day);

    // 2-4 transactions per day
    const transactionsPerDay = 2 + Math.floor(Math.random() * 3);

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
        ? "acc-004"
        : "acc-001";

      transactions.push({
        id: `txn-${day}-${t}`,
        accountId,
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
  const transferDates = [5, 15, 30, 45, 60];
  transferDates.forEach((daysAgo, i) => {
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);

    transactions.push({
      id: `txn-transfer-${i}`,
      accountId: "acc-002",
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
        id: `txn-bill-${month}-${i}`,
        accountId: "acc-001",
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

  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const transactions = generateTransactions();

// Cards
export interface Card {
  id: string;
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

export const cards: Card[] = [
  {
    id: "card-001",
    accountId: "acc-001",
    type: "debit",
    name: "Premier Debit Card",
    cardNumber: "4532 1234 5678 4521",
    lastFour: "4521",
    expiryDate: "12/27",
    cvv: "***",
    isLocked: false,
    network: "visa",
    color: "navy",
  },
  {
    id: "card-002",
    accountId: "acc-004",
    type: "credit",
    name: "Platinum Rewards Card",
    cardNumber: "5412 7534 8901 4567",
    lastFour: "4567",
    expiryDate: "09/26",
    cvv: "***",
    isLocked: false,
    network: "mastercard",
    color: "platinum",
  },
  {
    id: "card-003",
    accountId: "acc-004",
    type: "credit",
    name: "Gold Travel Card",
    cardNumber: "4716 8523 9012 3456",
    lastFour: "3456",
    expiryDate: "03/28",
    cvv: "***",
    isLocked: true,
    network: "visa",
    color: "gold",
  },
];

// Bills / Payees
export interface Bill {
  id: string;
  payeeName: string;
  category: string;
  accountNumber: string;
  amount: number;
  dueDate: string;
  isAutoPay: boolean;
  logo: string;
  status: "due" | "paid" | "overdue" | "scheduled";
}

export const bills: Bill[] = [
  {
    id: "bill-001",
    payeeName: "Bay Area Mortgage Co.",
    category: "Mortgage",
    accountNumber: "****8901",
    amount: 12500,
    dueDate: new Date('2018-11-15T12:00:00.000Z').toISOString(),
    isAutoPay: true,
    logo: "🏠",
    status: "paid",
  },
  {
    id: "bill-002",
    payeeName: "Amazon Prime",
    category: "Subscription",
    accountNumber: "****2345",
    amount: 14.99,
    dueDate: new Date('2018-11-20T12:00:00.000Z').toISOString(),
    isAutoPay: true,
    logo: "📦",
    status: "paid",
  },
  {
    id: "bill-003",
    payeeName: "Verizon Wireless",
    category: "Phone",
    accountNumber: "****5678",
    amount: 185.0,
    dueDate: new Date('2018-11-22T12:00:00.000Z').toISOString(),
    isAutoPay: false,
    logo: "📱",
    status: "paid",
  },
  {
    id: "bill-004",
    payeeName: "PG&E",
    category: "Utilities",
    accountNumber: "****9012",
    amount: 342.5,
    dueDate: new Date('2018-11-10T12:00:00.000Z').toISOString(),
    isAutoPay: true,
    logo: "💡",
    status: "paid",
  },
  {
    id: "bill-005",
    payeeName: "Comcast Xfinity",
    category: "Internet",
    accountNumber: "****3456",
    amount: 129.99,
    dueDate: new Date('2018-11-25T12:00:00.000Z').toISOString(),
    isAutoPay: true,
    logo: "📡",
    status: "paid",
  },
  {
    id: "bill-006",
    payeeName: "Allstate Insurance",
    category: "Insurance",
    accountNumber: "****7890",
    amount: 1250.0,
    dueDate: new Date('2018-11-28T12:00:00.000Z').toISOString(),
    isAutoPay: false,
    logo: "🛡️",
    status: "paid",
  },
  {
    id: "bill-007",
    payeeName: "SF Country Club",
    category: "Membership",
    accountNumber: "****1234",
    amount: 2500.0,
    dueDate: new Date('2018-11-05T12:00:00.000Z').toISOString(),
    isAutoPay: false,
    logo: "⛳",
    status: "paid",
  },
  {
    id: "bill-008",
    payeeName: "Tesla Financing",
    category: "Auto",
    accountNumber: "****5670",
    amount: 1850.0,
    dueDate: new Date('2018-11-18T12:00:00.000Z').toISOString(),
    isAutoPay: true,
    logo: "🚗",
    status: "paid",
  },
];

// Investments
export interface Investment {
  id: string;
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

export const investments: Investment[] = [
  {
    id: "inv-001",
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
    id: "inv-002",
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
    id: "inv-003",
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
    id: "inv-004",
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    shares: 150,
    avgCost: 125.0,
    currentPrice: 142.3,
    value: 21345,
    gainLoss: 2595,
    gainLossPercent: 13.84,
    type: "stock",
  },
  {
    id: "inv-005",
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
    id: "inv-006",
    symbol: "BND",
    name: "Vanguard Total Bond",
    shares: 500,
    avgCost: 72.0,
    currentPrice: 71.5,
    value: 35750,
    gainLoss: -250,
    gainLossPercent: -0.69,
    type: "bond",
  },
  {
    id: "inv-007",
    symbol: "VTI",
    name: "Vanguard Total Stock",
    shares: 200,
    avgCost: 210.0,
    currentPrice: 232.65,
    value: 46530,
    gainLoss: 4530,
    gainLossPercent: 10.79,
    type: "etf",
  },
  {
    id: "inv-008",
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    shares: 45,
    avgCost: 420.0,
    currentPrice: 485.3,
    value: 21835,
    gainLoss: 2935,
    gainLossPercent: 15.54,
    type: "stock",
  },
];

// Notifications
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "alert";
  timestamp: string;
  isRead: boolean;
  icon: string;
}

export const notifications: Notification[] = [
  {
    id: "notif-001",
    title: "Large Deposit Received",
    message: "A deposit of $45,000.00 has been credited to your Premier Checking account.",
    type: "success",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isRead: false,
    icon: "💰",
  },
  {
    id: "notif-002",
    title: "New Card Shipped",
    message: "Your replacement Platinum Rewards Card has been shipped and will arrive in 3-5 business days.",
    type: "info",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    isRead: false,
    icon: "📦",
  },
  {
    id: "notif-003",
    title: "Bill Due Soon",
    message: "Your Verizon Wireless bill of $185.00 is due in 3 days.",
    type: "warning",
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    isRead: false,
    icon: "📋",
  },
  {
    id: "notif-004",
    title: "Investment Alert",
    message: "NVDA has increased by 5.2% today. Your holdings are now worth $21,835.00.",
    type: "info",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    isRead: true,
    icon: "📈",
  },
  {
    id: "notif-005",
    title: "Security Alert",
    message: "New login detected from San Francisco, CA. If this wasn't you, please contact us immediately.",
    type: "alert",
    timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    isRead: true,
    icon: "🔒",
  },
];

// Quick Transfer Amounts
export const quickTransferAmounts = [500, 1000, 2500, 5000, 10000];

// Helper functions
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const formatTime = (dateString: string): string => {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const getAccountById = (id: string): Account | undefined => {
  return accounts.find((acc) => acc.id === id);
};

export const getTransactionsByAccountId = (accountId: string): Transaction[] => {
  return transactions.filter((txn) => txn.accountId === accountId);
};

export const getCardsByAccountId = (accountId: string): Card[] => {
  return cards.filter((card) => card.accountId === accountId);
};
