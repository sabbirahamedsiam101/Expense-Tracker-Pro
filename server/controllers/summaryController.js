// summary.controller.js

import Income from "../models/income.schema.js";
import Expense from "../models/expense.schema.js";
import Loan from "../models/loan.schema.js";

// GET /summary/monthly?year=2025
export const getMonthlyData = async (req, res) => {
  const { year } = req.query;

  try {
    const start = new Date(year, 0, 1);
    const end = new Date(Number(year) + 1, 0, 1);

    const [incomeMonthly, expenseMonthly, loanMonthly] = await Promise.all([
      Income.aggregate([
        { $match: { date: { $gte: start, $lt: end } } },
        {
          $group: {
            _id: { $month: "$date" },
            totalIncome: { $sum: "$amount" },
          },
        },
      ]),
      Expense.aggregate([
        { $match: { date: { $gte: start, $lt: end } } },
        {
          $group: {
            _id: { $month: "$date" },
            totalExpenses: { $sum: "$amount" },
          },
        },
      ]),
      Loan.aggregate([
        { $match: { date: { $gte: start, $lt: end } } },
        {
          $group: { _id: { $month: "$date" }, totalLoans: { $sum: "$amount" } },
        },
      ]),
    ]);

    const monthlyMap = {};
    for (let i = 1; i <= 12; i++) {
      monthlyMap[i] = {
        month: i,
        totalIncome: 0,
        totalExpenses: 0,
        totalLoans: 0,
        netProfit: 0,
      };
    }

    incomeMonthly.forEach((item) => {
      monthlyMap[item._id].totalIncome = item.totalIncome;
    });

    expenseMonthly.forEach((item) => {
      monthlyMap[item._id].totalExpenses = item.totalExpenses;
    });

    loanMonthly.forEach((item) => {
      monthlyMap[item._id].totalLoans = item.totalLoans;
    });

    const finalData = Object.values(monthlyMap).map((item) => {
      item.netProfit =
        item.totalIncome - (item.totalExpenses + item.totalLoans);
      return item;
    });

    res.json(finalData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /summary/monthly-one?year=2025&month=7
export const getMonthlySummary = async (req, res) => {
  const { year, month } = req.query;
  const parsedYear = parseInt(year);
  const parsedMonth = parseInt(month);
  try {
    // const start = new Date(year, month - 1, 1);
    // const end = new Date(year, month, 1);
    const start = new Date(parsedYear, parsedMonth, 1);
    const end = new Date(parsedYear, parsedMonth + 1, 1);
    const [income, expense, loan] = await Promise.all([
      Income.aggregate([
        { $match: { date: { $gte: start, $lt: end } } },
        { $group: { _id: null, totalIncome: { $sum: "$amount" } } },
      ]),
      Expense.aggregate([
        { $match: { date: { $gte: start, $lt: end } } },
        { $group: { _id: null, totalExpenses: { $sum: "$amount" } } },
      ]),
      Loan.aggregate([
        { $match: { date: { $gte: start, $lt: end } } },
        { $group: { _id: null, totalLoans: { $sum: "$amount" } } },
      ]),
    ]);

    const totalIncome = income[0]?.totalIncome || 0;
    const totalExpenses = expense[0]?.totalExpenses || 0;
    const totalLoans = loan[0]?.totalLoans || 0;

    const profit = totalIncome - (totalExpenses + totalLoans);
    console.log(
      "totalIncome:",
      totalIncome,
      "totalExpenses:",
      totalExpenses,
      "totalLoans:",
      totalLoans
    );

    res.json({ totalIncome, totalExpenses, totalLoans, profit });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /summary/annual?year=2025
export const getAnnualSummary = async (req, res) => {
  const { year } = req.query;

  try {
    const start = new Date(year, 0, 1);
    const end = new Date(Number(year) + 1, 0, 1);

    const [income, expense, loan] = await Promise.all([
      Income.aggregate([
        { $match: { date: { $gte: start, $lt: end } } },
        { $group: { _id: null, totalIncome: { $sum: "$amount" } } },
      ]),
      Expense.aggregate([
        { $match: { date: { $gte: start, $lt: end } } },
        { $group: { _id: null, totalExpenses: { $sum: "$amount" } } },
      ]),
      Loan.aggregate([
        { $match: { date: { $gte: start, $lt: end } } },
        { $group: { _id: null, totalLoans: { $sum: "$amount" } } },
      ]),
    ]);

    const totalIncome = income[0]?.totalIncome || 0;
    const totalExpenses = expense[0]?.totalExpenses || 0;
    const totalLoans = loan[0]?.totalLoans || 0;

    const profit = totalIncome - (totalExpenses + totalLoans);

    res.json({ totalIncome, totalExpenses, totalLoans, profit });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
