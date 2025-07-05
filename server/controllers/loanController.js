import Loan from "../models/loan.schema.js";

// Get all Loans
export const getLoans = async (req, res) => {
  try {
    const loans = await Loan.find();
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new Loan
export const createLoan = async (req, res) => {
  const { employeeName, amount, reason, date } = req.body;
  try {
    const newLoan = new Loan({ employeeName, amount, reason, date });
    await newLoan.save();
    res.status(201).json(newLoan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a Loan by ID
export const updateLoan = async (req, res) => {
  try {
    const updatedLoan = await Loan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedLoan) {
      return res.status(404).json({ message: "Loan not found" });
    }
    res.json(updatedLoan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a Loan by ID
export const deleteLoan = async (req, res) => {
  try {
    const deletedLoan = await Loan.findByIdAndDelete(req.params.id);
    if (!deletedLoan) {
      return res.status(404).json({ message: "Loan not found" });
    }
    res.json({ message: "Loan deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
