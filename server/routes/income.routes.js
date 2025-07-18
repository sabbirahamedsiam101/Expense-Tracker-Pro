import express, { Router } from "express";
import {
  getIncomes,
  createIncome,
  updateIncome,
  deleteIncome,
} from "../controllers/incomeController.js";

const incomeRouter = Router();

incomeRouter.get("/", getIncomes);
incomeRouter.post("/", createIncome);
incomeRouter.put("/:id", updateIncome);
incomeRouter.delete("/:id", deleteIncome);

export default incomeRouter;
