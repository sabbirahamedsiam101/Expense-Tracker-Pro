import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoanForm from "@/components/LoanForm"; // Loan form component
import { Loan } from "@/types";
import { Edit, Trash2, Plus } from "lucide-react";
import {
  useGetLoansQuery,
  useAddLoanMutation,
  useUpdateLoanMutation,
  useDeleteLoanMutation,
} from "@/redux/features/loans/loansApi"; // Import the necessary hooks from the loans API

const Loans: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingLoan, setEditingLoan] = useState<Loan | undefined>();

  // Fetch existing loans from API using Redux Toolkit Query hook
  const { data, refetch } = useGetLoansQuery({});

  // Mutations for adding, updating, and deleting loans
  const [addLoan] = useAddLoanMutation();
  const [updateLoan] = useUpdateLoanMutation();
  const [deleteLoan] = useDeleteLoanMutation();

  useEffect(() => {
    if (data) {
      setLoans(data); // Set fetched loans data to state
    }
  }, [data]);

  const handleAdd = () => {
    setEditingLoan(undefined);
    setShowForm(true);
  };

  const handleEdit = (loan: Loan) => {
    setEditingLoan(loan);
    setShowForm(true);
  };

  const handleFormSave = async (loanData: Loan) => {
    try {
      if (editingLoan) {
        // If there's an existing loan being edited, update it
        await updateLoan({ id: editingLoan._id, ...loanData }).unwrap();
      } else {
        console.log("Saving new loan:", loanData);
        await addLoan(loanData).unwrap();
      }
      setShowForm(false); // Close the form after saving
      refetch(); // Refetch the data after save
    } catch (error) {
      console.error("Error saving loan:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this loan?")) {
      try {
        await deleteLoan(id).unwrap(); // Delete the loan by ID
        setLoans(loans.filter((loan) => loan._id !== id)); // Optionally, update local state
      } catch (error) {
        console.error("Error deleting loan:", error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  if (showForm) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {editingLoan ? "Edit Loan" : "Add New Loan"}
          </h1>
        </div>
        <LoanForm
          loan={editingLoan}
          onSave={handleFormSave}
          onCancel={() => setShowForm(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Loan Management
        </h1>
        <Button
          onClick={handleAdd}
          className="flex items-center justify-center space-x-2 w-full sm:w-auto"
        >
          <Plus size={20} />
          <span>Add Loan</span>
        </Button>
      </div>

      {loans.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8 sm:py-12 px-4">
            <p className="text-gray-500 text-base sm:text-lg">
              No loan records found.
            </p>
            <Button onClick={handleAdd} className="mt-4 w-full sm:w-auto">
              Add Your First Loan
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 sm:gap-4">
          {loans.map((loan) => (
            <Card key={loan._id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                        {loan.employeeName}
                      </h3>
                      <span className="text-xl sm:text-2xl font-bold text-orange-600 self-start sm:self-auto">
                        {formatAmount(loan.amount)}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                      <p>Reason: {loan.reason}</p>
                      <p>Date: {formatDate(loan.date)}</p>
                      <p>Added: {formatDate(loan.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 flex-shrink-0 self-end sm:self-start">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(loan)}
                      className="p-2"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(loan._id)}
                      className="p-2 text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {loans.length > 0 && (
        <div className="text-center pt-4">
          <p className="text-gray-600 text-sm sm:text-base px-4">
            Total Loan Entries: {loans.length} | Total Amount:{" "}
            {formatAmount(loans.reduce((sum, loan) => sum + loan.amount, 0))}
          </p>
        </div>
      )}
    </div>
  );
};

export default Loans;
