import { Router } from "express";
import {
  getLoans,
  createLoan,
  updateLoan,
  deleteLoan,
} from "../controllers/loanController.js"; // Loan controllers

const loanRouter = Router();

// Routes for Loans CRUD
loanRouter.get("/", getLoans); // Get all Loans
loanRouter.post("/", createLoan); // Add a new Loan
loanRouter.put("/:id", updateLoan); // Update a Loan by ID
loanRouter.delete("/:id", deleteLoan); // Delete a Loan by ID

export default loanRouter;
