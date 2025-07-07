import { model, Schema } from "mongoose";

const LoanSchema = new Schema(
  {
    employeeName: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Loan = model("Loan", LoanSchema);
export default Loan;
