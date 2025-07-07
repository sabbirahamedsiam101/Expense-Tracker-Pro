import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loanService } from "@/services/dataService";
import { Loan } from "@/types";

interface LoanFormProps {
  loan?: Loan;
  onSave: (loanData: Loan) => void;
  onCancel: () => void;
}

const LoanForm: React.FC<LoanFormProps> = ({ loan, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    employeeName: "",
    amount: "",
    reason: "",
    date: "",
    
  });

  useEffect(() => {
    if (loan) {
      setFormData({
        employeeName: loan.employeeName,
        amount: loan.amount.toString(),
        reason: loan.reason,
        date: loan.date,
 
      });
    }
  }, [loan]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const loanData = {
      employeeName: formData.employeeName,
      amount: parseFloat(formData.amount),
      reason: formData.reason,
      date: formData.date,
    };

    onSave(loanData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{loan ? "Edit Loan" : "Add New Loan"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="employeeName">Employee Name</Label>
            <Input
              id="employeeName"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              placeholder="Enter employee name"
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
            <Label htmlFor="reason">Reason</Label>
            <Input
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="e.g., Emergency, Advance"
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

          <div className="flex space-x-2 pt-4">
            <Button type="submit" className="flex-1">
              {loan ? "Update" : "Add"} Loan
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

export default LoanForm;
