
import React from 'react';
import { useGetIncomesQuery, useDeleteIncomeMutation } from '../redux/features/allApi/api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

const IncomesTable = ({ onEdit }) => {
  const { data: incomes = [], isLoading, isError, error } = useGetIncomesQuery();
  const [deleteIncome] = useDeleteIncomeMutation();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this income?')) {
      try {
        await deleteIncome(id).unwrap();
      } catch (error) {
        console.error('Failed to delete income:', error);
      }
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-500">Loading incomes...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-red-500">Error loading incomes: {error?.message}</div>
      </div>
    );
  }

  if (incomes.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No income records found.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incomes.map((income) => (
            <TableRow key={income.id}>
              <TableCell className="font-medium">{income.title}</TableCell>
              <TableCell className="text-green-600 font-semibold">
                {formatAmount(income.amount)}
              </TableCell>
              <TableCell>{formatDate(income.date)}</TableCell>
              <TableCell>{income.category || '-'}</TableCell>
              <TableCell>{formatDate(income.createdAt)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(income)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(income.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default IncomesTable;
