import { Router } from 'express';
import { getExpenses, createExpense, updateExpense, deleteExpense } from '../controllers/expenseController.js';

const expenseRouter = Router();

// Routes for Expense
expenseRouter.get('/', getExpenses);
expenseRouter.post('/', createExpense);
expenseRouter.put('/:id', updateExpense);
expenseRouter.delete('/:id', deleteExpense);

export default expenseRouter;
