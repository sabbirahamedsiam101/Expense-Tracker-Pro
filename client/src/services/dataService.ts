
import { Income, Expense, Loan, DashboardSummary, MonthlyData } from '@/types';

const STORAGE_KEYS = {
  INCOMES: 'expense_tracker_incomes',
  EXPENSES: 'expense_tracker_expenses',
  LOANS: 'expense_tracker_loans'
};

// Helper function to generate unique IDs
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Generic storage functions
const getFromStorage = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const saveToStorage = <T>(key: string, data: T[]): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Income Services
export const incomeService = {
  getAll: (): Income[] => getFromStorage<Income>(STORAGE_KEYS.INCOMES),
  
  create: (income: Omit<Income, 'id' | 'createdAt'>): Income => {
    const newIncome: Income = {
      ...income,
      id: generateId(),
      createdAt: new Date().toISOString()
    };
    const incomes = incomeService.getAll();
    incomes.push(newIncome);
    saveToStorage(STORAGE_KEYS.INCOMES, incomes);
    return newIncome;
  },
  
  update: (id: string, updates: Partial<Income>): Income | null => {
    const incomes = incomeService.getAll();
    const index = incomes.findIndex(item => item.id === id);
    if (index === -1) return null;
    
    incomes[index] = { ...incomes[index], ...updates };
    saveToStorage(STORAGE_KEYS.INCOMES, incomes);
    return incomes[index];
  },
  
  delete: (id: string): boolean => {
    const incomes = incomeService.getAll();
    const filtered = incomes.filter(item => item.id !== id);
    if (filtered.length === incomes.length) return false;
    
    saveToStorage(STORAGE_KEYS.INCOMES, filtered);
    return true;
  }
};

// Expense Services
export const expenseService = {
  getAll: (): Expense[] => getFromStorage<Expense>(STORAGE_KEYS.EXPENSES),
  
  create: (expense: Omit<Expense, 'id' | 'createdAt'>): Expense => {
    const newExpense: Expense = {
      ...expense,
      id: generateId(),
      createdAt: new Date().toISOString()
    };
    const expenses = expenseService.getAll();
    expenses.push(newExpense);
    saveToStorage(STORAGE_KEYS.EXPENSES, expenses);
    return newExpense;
  },
  
  update: (id: string, updates: Partial<Expense>): Expense | null => {
    const expenses = expenseService.getAll();
    const index = expenses.findIndex(item => item.id === id);
    if (index === -1) return null;
    
    expenses[index] = { ...expenses[index], ...updates };
    saveToStorage(STORAGE_KEYS.EXPENSES, expenses);
    return expenses[index];
  },
  
  delete: (id: string): boolean => {
    const expenses = expenseService.getAll();
    const filtered = expenses.filter(item => item.id !== id);
    if (filtered.length === expenses.length) return false;
    
    saveToStorage(STORAGE_KEYS.EXPENSES, filtered);
    return true;
  }
};

// Loan Services
export const loanService = {
  getAll: (): Loan[] => getFromStorage<Loan>(STORAGE_KEYS.LOANS),
  
  create: (loan: Omit<Loan, 'id' | 'createdAt'>): Loan => {
    const newLoan: Loan = {
      ...loan,
      id: generateId(),
      createdAt: new Date().toISOString()
    };
    const loans = loanService.getAll();
    loans.push(newLoan);
    saveToStorage(STORAGE_KEYS.LOANS, loans);
    return newLoan;
  },
  
  update: (id: string, updates: Partial<Loan>): Loan | null => {
    const loans = loanService.getAll();
    const index = loans.findIndex(item => item.id === id);
    if (index === -1) return null;
    
    loans[index] = { ...loans[index], ...updates };
    saveToStorage(STORAGE_KEYS.LOANS, loans);
    return loans[index];
  },
  
  delete: (id: string): boolean => {
    const loans = loanService.getAll();
    const filtered = loans.filter(item => item.id !== id);
    if (filtered.length === loans.length) return false;
    
    saveToStorage(STORAGE_KEYS.LOANS, filtered);
    return true;
  }
};

// Dashboard Services
export const dashboardService = {
  getMonthlySummary: (year: number, month: number): DashboardSummary => {
    const incomes = incomeService.getAll();
    const expenses = expenseService.getAll();
    const loans = loanService.getAll();
    
    const filterByMonth = (items: any[]) => 
      items.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.getFullYear() === year && itemDate.getMonth() === month;
      });
    
    const monthlyIncomes = filterByMonth(incomes);
    const monthlyExpenses = filterByMonth(expenses);
    const monthlyLoans = filterByMonth(loans);
    
    const totalIncome = monthlyIncomes.reduce((sum, item) => sum + item.amount, 0);
    const totalExpenses = monthlyExpenses.reduce((sum, item) => sum + item.amount, 0);
    const totalLoans = monthlyLoans.reduce((sum, item) => sum + item.amount, 0);
    const profit = totalIncome - (totalExpenses + totalLoans);
    
    return { totalIncome, totalExpenses, totalLoans, profit };
  },
  
  getAnnualSummary: (year: number): DashboardSummary => {
    const incomes = incomeService.getAll();
    const expenses = expenseService.getAll();
    const loans = loanService.getAll();
    
    const filterByYear = (items: any[]) => 
      items.filter(item => new Date(item.date).getFullYear() === year);
    
    const yearlyIncomes = filterByYear(incomes);
    const yearlyExpenses = filterByYear(expenses);
    const yearlyLoans = filterByYear(loans);
    
    const totalIncome = yearlyIncomes.reduce((sum, item) => sum + item.amount, 0);
    const totalExpenses = yearlyExpenses.reduce((sum, item) => sum + item.amount, 0);
    const totalLoans = yearlyLoans.reduce((sum, item) => sum + item.amount, 0);
    const profit = totalIncome - (totalExpenses + totalLoans);
    
    return { totalIncome, totalExpenses, totalLoans, profit };
  },
  
  getMonthlyData: (year: number): MonthlyData[] => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    return months.map((month, index) => {
      const summary = dashboardService.getMonthlySummary(year, index);
      return {
        month,
        income: summary.totalIncome,
        expenses: summary.totalExpenses,
        loans: summary.totalLoans,
        profit: summary.profit
      };
    });
  }
};
