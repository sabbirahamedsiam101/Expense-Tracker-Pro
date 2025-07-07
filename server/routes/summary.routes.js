// summary.routes.js

import express, { Router } from "express";
import {
  getMonthlyData,
  getMonthlySummary,
  getAnnualSummary,
} from "../controllers/summaryController.js";

const summaryRouter = Router();

summaryRouter.get("/monthly", getMonthlyData); // All 12 months
summaryRouter.get("/monthly-one", getMonthlySummary); // One specific month
summaryRouter.get("/annual", getAnnualSummary); // Yearly summary

export default summaryRouter;
