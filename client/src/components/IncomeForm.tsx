import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { incomeService } from "@/services/dataService";
import { Income } from "@/types";

interface IncomeFormProps {
  income?: Income;
  onSave: () => void;
  onCancel: () => void;
}

const IncomeForm: React.FC<IncomeFormProps> = ({
  income,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    title: income?.title || "",
    amount: income?.amount || 0,
    date: income?.date || "",
    category: income?.category || "",
  });

  useEffect(() => {
    if (income) {
      setFormData({
        title: income.title,
        amount: income.amount.toString(),
        date: income.date,
        category: income.category || "",
      });
    }
  }, [income]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const incomeData = {
      title: formData.title,
      amount: parseFloat(formData.amount),
      date: formData.date,
      category: formData.category || undefined,
    };

    if (income) {
      incomeService.update(income.id, incomeData);
    } else {
      incomeService.create(incomeData);
    }

    onSave();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{income ? "Edit Income" : "Add New Income"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Salary, Freelance"
              required
            />
          </div>

          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category (Optional)</Label>
            <Input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g., Work, Business"
            />
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="submit" className="flex-1">
              {income ? "Update" : "Add"} Income
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default IncomeForm;
