import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import incomeRouter from "./routes/income.routes.js";
import expenseRouter from "./routes/expense.routes.js";
import loanRouter from "./routes/loan.routes.js";
import summaryRouter from "./routes/summary.routes.js";

dotenv.config();
connectDB();
// expence-tracker-user
// eRph43Ajgk0iS44k
const app = express();
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);
app.use(express.json());
app.get("/", (req, res) => res.send("Server is running"));
app.use("/api/incomes", incomeRouter);
app.use("/api/expenses", expenseRouter);
app.use("/api/loans", loanRouter);
app.use("/api/summary", summaryRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on  http://localhost:${PORT}`)
);
