import Loan from "../models/loan.schema.js"; // Loan model

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
    const updatedLoan = await Loan.findByIdAndUpdate(req.params.id, req.body, { new: true });
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

// Get Monthly Loan Summary
// export const getMonthlyLoanSummary = async (req, res) => {
//   const { year, month } = req.query;
//   try {
//     const startOfMonth = new Date(year, month, 1);
//     const endOfMonth = new Date(year, parseInt(month) + 1, 0); // Last day of the selected month

//     const loans = await Loan.aggregate([
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
//           totalLoans: { $sum: "$amount" },
//         },
//       },
//     ]);

//     res.json({
//       totalLoans: loans[0]?.totalLoans || 0,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get Annual Loan Summary
// export const getAnnualLoanSummary = async (req, res) => {
//   const { year } = req.query;
//   try {
//     const loans = await Loan.aggregate([
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
//           _id: null,
//           totalLoans: { $sum: "$amount" },
//         },
//       },
//     ]);

//     res.json({
//       totalLoans: loans[0]?.totalLoans || 0,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
