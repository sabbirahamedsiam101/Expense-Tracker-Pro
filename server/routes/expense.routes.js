import express, { Router } from "express";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getMonthlySummary,
  getAnnualSummary,
  getMonthlyData,
} from "../controllers/expenseController.js"; // Expense controllers

const expenseRouter = Router();

// Routes for Expenses CRUD
expenseRouter.get("/", getExpenses); // Get all Expenses
expenseRouter.post("/", createExpense); // Add a new Expense
expenseRouter.put("/:id", updateExpense); // Update an Expense by ID
expenseRouter.delete("/:id", deleteExpense); // Delete an Expense by ID

// Routes for monthly and annual summary
expenseRouter.get("/monthly", getMonthlySummary); // Monthly summary
expenseRouter.get("/annual", getAnnualSummary); // Annual summary

// Monthly Data Route (for monthly trends chart)
expenseRouter.get("/monthly-data", getMonthlyData); // Monthly data for trends (income, expenses, loans, etc.)

export default expenseRouter;
