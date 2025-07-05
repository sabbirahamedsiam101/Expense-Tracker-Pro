import express, { Router } from "express";
import {
  getIncomes,
  createIncome,
  updateIncome,
  deleteIncome,
  getMonthlySummary,
  getAnnualSummary,
} from "../controllers/incomeController.js";

const incomeRouter = Router();

incomeRouter.get("/", getIncomes);
incomeRouter.post("/", createIncome);
incomeRouter.put("/:id", updateIncome);
incomeRouter.delete("/:id", deleteIncome);

// Routes for monthly and annual summary
incomeRouter.get("/dashboard/monthly", getMonthlySummary);
incomeRouter.get("/dashboard/annual", getAnnualSummary);

export default incomeRouter;
