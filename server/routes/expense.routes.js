import express, { Router } from "express";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController.js"; // Expense controllers

const expenseRouter = Router();

// Routes for Expenses CRUD
expenseRouter.get("/", getExpenses); // Get all Expenses
expenseRouter.post("/", createExpense); // Add a new Expense
expenseRouter.put("/:id", updateExpense); // Update an Expense by ID
expenseRouter.delete("/:id", deleteExpense); // Delete an Expense by ID

export default expenseRouter;
