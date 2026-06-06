export interface Income {
  id: string;
  customer: string;
  amount: number;
  month: string;
  user_id: string;
  created_at: string;
}

export interface Expense {
  id: string;
  category: string;
  amount: number;
  month: string;
  expense_date: string;
  user_id: string;
  created_at: string;
}

export interface Transaction {
  id: string;
  type: "income" | "expense";
  label: string;
  amount: number;
  date: string;
}

export interface DashboardStats {
  totalIncome: number;
  totalExpense: number;
  netProfit: number;
  driverShare: number;
  ownerShare: number;
}
