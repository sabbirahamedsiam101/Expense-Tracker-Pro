import { Router } from 'express';
import { getLoans, createLoan, updateLoan, deleteLoan } from '../controllers/loanController.js';

const loanRouter = Router();

// Routes for Loan
loanRouter.get('/', getLoans);
loanRouter.post('/', createLoan);
loanRouter.put('/:id', updateLoan);
loanRouter.delete('/:id', deleteLoan);

export default loanRouter;
