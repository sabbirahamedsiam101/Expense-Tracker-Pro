import { model, Schema } from "mongoose";

const ExpenseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    default: undefined,
  },
});

const Expense = model("Expense", ExpenseSchema);
export default Expense;
