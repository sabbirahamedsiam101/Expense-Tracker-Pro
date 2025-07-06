import express, { Router } from "express";
import {
  getIncomes,
  createIncome,
  updateIncome,
  deleteIncome,
  getMonthlySummary,
  getAnnualSummary,
  getMonthlyData,
} from "../controllers/incomeController.js";

const incomeRouter = Router();

incomeRouter.get("/", getIncomes);
incomeRouter.post("/", createIncome);
incomeRouter.put("/:id", updateIncome);
incomeRouter.delete("/:id", deleteIncome);

// Routes for monthly and annual summary
incomeRouter.get("/monthly", getMonthlySummary);
incomeRouter.get("/annual", getAnnualSummary);
// Monthly Data Route (for monthly trends chart)
incomeRouter.get("/monthly-data", getMonthlyData);

export default incomeRouter;
