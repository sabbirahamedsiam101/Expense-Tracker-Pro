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
