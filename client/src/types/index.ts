
export interface Income {
  id: string;
  title: string;
  amount: number;
  date: string;
  category?: string;
  createdAt: string;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  category?: string;
  createdAt: string;
}

export interface Loan {
  id: string;
  employeeName: string;
  amount: number;
  reason: string;
  date: string;
  createdAt: string;
}

export interface DashboardSummary {
  totalIncome: number;
  totalExpenses: number;
  totalLoans: number;
  profit: number;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  loans: number;
  profit: number;
}
