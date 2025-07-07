import Expense from "../models/expense.schema.js"; // Expense model

// Get all Expenses
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new Expense
export const createExpense = async (req, res) => {
  const { title, amount, date, description } = req.body;
  try {
    const newExpense = new Expense({ title, amount, date, description });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an Expense by ID
export const updateExpense = async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json(updatedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an Expense by ID
export const deleteExpense = async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// // Get Monthly Data (Income, Expenses, Loans, Profit for the selected year)
// export const getMonthlyData = async (req, res) => {
//   const { year } = req.query;
//   try {
//     const monthlyData = await Expense.aggregate([
//       {
//         $match: {
//           date: {
//             $gte: new Date(year, 0, 1), // Start of the year
//             $lt: new Date(year + 1, 0, 1), // End of the year
//           },
//         },
//       },
//       {
//         $group: {
//           _id: { $month: "$date" }, // Group by month
//           expenses: { $sum: "$amount" },
//           income: {
//             $sum: { $cond: [{ $eq: ["$category", "income"] }, "$amount", 0] },
//           },
//           loans: {
//             $sum: { $cond: [{ $eq: ["$category", "loan"] }, "$amount", 0] },
//           },
//           profit: {
//             $sum: { $cond: [{ $eq: ["$category", "income"] }, "$amount", 0] },
//           },
//         },
//       },
//       { $sort: { _id: 1 } }, // Sort by month
//     ]);

//     res.json(monthlyData);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get Monthly Summary (Income, Expenses, Loans, Profit for the selected month)
// export const getMonthlySummary = async (req, res) => {
//   const { year, month } = req.query;
//   try {
//     const startOfMonth = new Date(year, month, 1);
//     const endOfMonth = new Date(year, parseInt(month) + 1, 0); // Last day of the selected month

//     const expenses = await Expense.aggregate([
//       {
//         $match: {
//           date: {
//             $gte: startOfMonth,
//             $lt: endOfMonth,
//           },
//         },
//       },
//       {
//         $group: {
//           _id: null,
//           totalExpenses: { $sum: "$amount" },
//           totalIncome: {
//             $sum: { $cond: [{ $eq: ["$category", "income"] }, "$amount", 0] },
//           },
//           totalLoans: {
//             $sum: { $cond: [{ $eq: ["$category", "loan"] }, "$amount", 0] },
//           },
//         },
//       },
//     ]);

//     const profit =
//       expenses[0]?.totalIncome -
//       (expenses[0]?.totalExpenses + expenses[0]?.totalLoans);

//     res.json({
//       totalIncome: expenses[0]?.totalIncome || 0,
//       totalExpenses: expenses[0]?.totalExpenses || 0,
//       totalLoans: expenses[0]?.totalLoans || 0,
//       profit: profit || 0,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get Annual Summary (Income, Expenses, Loans, Profit for the selected year)
// export const getAnnualSummary = async (req, res) => {
//   const { year } = req.query;
//   try {
//     const expenses = await Expense.aggregate([
//       {
//         $match: {
//           date: {
//             $gte: new Date(year, 0, 1), // Start of the year
//             $lt: new Date(year + 1, 0, 1), // End of the year
//           },
//         },
//       },
//       {
//         $project: {
//           category: 1, // Project category to check it
//           amount: 1,   // Keep amount for calculation
//           date: 1,
//         }
//       },
//       {
//         $match: {
//           category: { $exists: true, $ne: null }, // Ensure category exists and is not null
//         },
//       },
//       {
//         $group: {
//           _id: null,
//           totalIncome: { $sum: "$amount" },
//           totalExpenses: {
//             $sum: {
//               $cond: [
//                 { $eq: [{ $toLower: { $trim: { input: "$category" } } }, "expense"] },
//                 "$amount",
//                 0,
//               ],
//             },
//           },
//           totalLoans: {
//             $sum: { $cond: [{ $eq: [{ $toLower: { $trim: { input: "$category" } } }, "loan"] }, "$amount", 0] },
//           },
//         },
//       },
//     ]);

//     console.log("Aggregated Expenses:", expenses); // Log the aggregation result
//     const profit =
//       expenses[0]?.totalIncome - (expenses[0]?.totalExpenses + expenses[0]?.totalLoans);

//     res.json({
//       totalIncome: expenses[0]?.totalIncome || 0,
//       totalExpenses: expenses[0]?.totalExpenses || 0,
//       totalLoans: expenses[0]?.totalLoans || 0,
//       profit: profit || 0,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

