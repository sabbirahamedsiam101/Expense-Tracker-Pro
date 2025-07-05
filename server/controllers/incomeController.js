import Income from "../models/income.schema.js";

// Get all Incomes
export const getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find();
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new Income
export const createIncome = async (req, res) => {
  const { title, amount, date, category } = req.body;
  try {
    const newIncome = new Income({ title, amount, date, category });
    await newIncome.save();
    res.status(201).json(newIncome);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an Income by ID
export const updateIncome = async (req, res) => {
  try {
    const updatedIncome = await Income.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }
    res.json(updatedIncome);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an Income by ID
export const deleteIncome = async (req, res) => {
  try {
    const deletedIncome = await Income.findByIdAndDelete(req.params.id);
    if (!deletedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }
    res.json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Monthly Summary
export const getMonthlySummary = async (req, res) => {
  const { year, month } = req.query;
  try {
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, parseInt(month) + 1, 0); // Last day of the selected month

    const incomes = await Income.aggregate([
      {
        $match: {
          date: {
            $gte: startOfMonth,
            $lt: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: "$amount" },
          totalExpenses: {
            $sum: { $cond: [{ $eq: ["$category", "expense"] }, "$amount", 0] },
          },
          totalLoans: {
            $sum: { $cond: [{ $eq: ["$category", "loan"] }, "$amount", 0] },
          },
        },
      },
    ]);

    const profit =
      incomes[0]?.totalIncome -
      (incomes[0]?.totalExpenses + incomes[0]?.totalLoans);

    res.json({
      totalIncome: incomes[0]?.totalIncome || 0,
      totalExpenses: incomes[0]?.totalExpenses || 0,
      totalLoans: incomes[0]?.totalLoans || 0,
      profit: profit || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Annual Summary
export const getAnnualSummary = async (req, res) => {
  const { year } = req.query;
  try {
    const incomes = await Income.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(year, 0, 1), // Start of the year
            $lt: new Date(year + 1, 0, 1), // End of the year
          },
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: "$amount" },
          totalExpenses: {
            $sum: { $cond: [{ $eq: ["$category", "expense"] }, "$amount", 0] },
          },
          totalLoans: {
            $sum: { $cond: [{ $eq: ["$category", "loan"] }, "$amount", 0] },
          },
        },
      },
    ]);

    const profit =
      incomes[0]?.totalIncome -
      (incomes[0]?.totalExpenses + incomes[0]?.totalLoans);

    res.json({
      totalIncome: incomes[0]?.totalIncome || 0,
      totalExpenses: incomes[0]?.totalExpenses || 0,
      totalLoans: incomes[0]?.totalLoans || 0,
      profit: profit || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
