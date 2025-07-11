import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ExpenseForm from "@/components/ExpenseForm"; // Ensure you have this component for the form
import { Expense } from "@/types";
import { Edit, Trash2, Plus } from "lucide-react";
import {
  useGetExpensesQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} from "@/redux/features/expenses/expensesApi"; // Import the necessary hooks from the expenses API

const Expenses: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | undefined>();

  // Fetch existing expenses from API
  const { data, refetch, isLoading, isError } = useGetExpensesQuery({});

  // Mutations for adding, updating, and deleting expenses
  const [addExpense] = useAddExpenseMutation();
  const [updateExpense] = useUpdateExpenseMutation();
  const [deleteExpense] = useDeleteExpenseMutation();

  useEffect(() => {
    if (data) {
      console.log("Expenses fetched:", data);
      setExpenses(data); // Set fetched expenses data to state
    }
  }, [data]);

  const handleAdd = () => {
    setEditingExpense(undefined);
    setShowForm(true);
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleFormSave = async (expenseData: Expense) => {
    try {
      if (editingExpense) {
        console.log("Updating expense:", expenseData);

        await updateExpense({ id: editingExpense._id, ...expenseData }).unwrap();
      } else {
        await addExpense(expenseData).unwrap();
      }
      setShowForm(false);
      refetch();
    } catch (error) {
      console.error("Error saving expense:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await deleteExpense(id).unwrap(); // Delete the expense by ID
        // Optionally, update the state locally to avoid refetching
        setExpenses(expenses.filter((expense) => expense._id !== id));
      } catch (error) {
        console.error("Error deleting expense:", error);
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
            {editingExpense ? "Edit Expense" : "Add New Expense"}
          </h1>
        </div>
        <ExpenseForm
          expense={editingExpense}
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
          Expense Management
        </h1>
        <Button
          onClick={handleAdd}
          className="flex items-center justify-center space-x-2 w-full sm:w-auto"
        >
          <Plus size={20} />
          <span>Add Expense</span>
        </Button>
      </div>

      {expenses.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8 sm:py-12 px-4">
            <p className="text-gray-500 text-base sm:text-lg">
              No expense records found.
            </p>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">
              Start by adding your first expense entry.
            </p>
            <Button onClick={handleAdd} className="mt-4 w-full sm:w-auto">
              Add Your First Expense
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 sm:gap-4">
          {expenses.map((expense) => (
            <Card
              key={expense._id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                        {expense.title}
                      </h3>
                      <span className="text-xl sm:text-2xl font-bold text-red-600 self-start sm:self-auto">
                        {formatAmount(expense.amount)}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                      <p>Date: {formatDate(expense.date)}</p>
                      {expense.description && <p>description: {expense.description}</p>}
                      <p>Added: {formatDate(expense.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 flex-shrink-0 self-end sm:self-start">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(expense)}
                      className="p-2"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(expense._id)}
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

      {expenses.length > 0 && (
        <div className="text-center pt-4">
          <p className="text-gray-600 text-sm sm:text-base px-4">
            Total Expense Entries: {expenses.length} | Total Amount:{" "}
            {formatAmount(
              expenses.reduce((sum, expense) => sum + expense.amount, 0)
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default Expenses;
