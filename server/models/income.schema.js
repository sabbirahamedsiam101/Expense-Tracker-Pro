import { model, Schema } from "mongoose";


const IncomeSchema = new Schema({
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

const Income = model("Income", IncomeSchema);
export default Income;
