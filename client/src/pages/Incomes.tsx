
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import IncomeForm from '@/components/IncomeForm';
import { incomeService } from '@/services/dataService';
import { Income } from '@/types';
import { Edit, Trash2, Plus } from 'lucide-react';

const Incomes: React.FC = () => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIncome, setEditingIncome] = useState<Income | undefined>();

  useEffect(() => {
    loadIncomes();
  }, []);

  const loadIncomes = () => {
    const data = incomeService.getAll();
    setIncomes(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  };

  const handleAdd = () => {
    setEditingIncome(undefined);
    setShowForm(true);
  };

  const handleEdit = (income: Income) => {
    setEditingIncome(income);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this income?')) {
      incomeService.delete(id);
      loadIncomes();
    }
  };

  const handleFormSave = () => {
    setShowForm(false);
    setEditingIncome(undefined);
    loadIncomes();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingIncome(undefined);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (showForm) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {editingIncome ? 'Edit Income' : 'Add New Income'}
          </h1>
        </div>
        <IncomeForm
          income={editingIncome}
          onSave={handleFormSave}
          onCancel={handleFormCancel}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Income Management</h1>
        <Button onClick={handleAdd} className="flex items-center justify-center space-x-2 w-full sm:w-auto">
          <Plus size={20} />
          <span>Add Income</span>
        </Button>
      </div>

      {incomes.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8 sm:py-12 px-4">
            <p className="text-gray-500 text-base sm:text-lg">No income records found.</p>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">Start by adding your first income entry.</p>
            <Button onClick={handleAdd} className="mt-4 w-full sm:w-auto">
              Add Your First Income
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 sm:gap-4">
          {incomes.map((income) => (
            <Card key={income.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{income.title}</h3>
                      <span className="text-xl sm:text-2xl font-bold text-green-600 self-start sm:self-auto">
                        {formatAmount(income.amount)}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                      <p>Date: {formatDate(income.date)}</p>
                      {income.category && <p>Category: {income.category}</p>}
                      <p>Added: {formatDate(income.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 flex-shrink-0 self-end sm:self-start">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(income)}
                      className="p-2"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(income.id)}
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

      {incomes.length > 0 && (
        <div className="text-center pt-4">
          <p className="text-gray-600 text-sm sm:text-base px-4">
            Total Income Entries: {incomes.length} | Total Amount: {formatAmount(incomes.reduce((sum, income) => sum + income.amount, 0))}
          </p>
        </div>
      )}
    </div>
  );
};

export default Incomes;
