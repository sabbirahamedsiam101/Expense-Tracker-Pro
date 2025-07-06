import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SummaryCard from '@/components/SummaryCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, CreditCard } from 'lucide-react';
import { useGetMonthlySummaryQuery, useGetAnnualSummaryQuery, useGetMonthlyDataQuery } from '@/redux/features/incomes/incomesApi'; // Ensure correct hooks are imported

const Dashboard: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  // Fetch monthly summary data
  const { data: monthlySummary, isLoading: isMonthlyLoading } = useGetMonthlySummaryQuery({ year: selectedYear, month: selectedMonth });

  // Fetch annual summary data
  const { data: annualSummary, isLoading: isAnnualLoading } = useGetAnnualSummaryQuery(selectedYear);

  // Fetch monthly data for BarChart (Income, Expenses, Loans, Profit for each month)
  const { data: monthlyData, isLoading: isMonthlyDataLoading } = useGetMonthlyDataQuery(selectedYear);

  if (isMonthlyLoading || isAnnualLoading || isMonthlyDataLoading) {
    return <div>Loading...</div>;  // Show loading while data is being fetched
  }

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i);

  const pieData = [
    { name: 'Income', value: annualSummary?.totalIncome || 0, color: '#22c55e' },
    { name: 'Expenses', value: annualSummary?.totalExpenses || 0, color: '#ef4444' },
    { name: 'Loans', value: annualSummary?.totalLoans || 0, color: '#f59e0b' }
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Financial Dashboard</h1>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Select value={selectedMonth.toString()} onValueChange={(value) => setSelectedMonth(parseInt(value))}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {months.map((month, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Monthly Summary */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          Monthly Summary - {months[selectedMonth]} {selectedYear}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <SummaryCard
            title="Monthly Income"
            amount={monthlySummary?.totalIncome}
            color="green"
            icon={<TrendingUp size={20} />}
          />
          <SummaryCard
            title="Monthly Expenses"
            amount={monthlySummary?.totalExpenses}
            color="red"
            icon={<TrendingDown size={20} />}
          />
          <SummaryCard
            title="Monthly Loans"
            amount={monthlySummary?.totalLoans}
            color="blue"
            icon={<CreditCard size={20} />}
          />
          <SummaryCard
            title="Monthly Profit"
            amount={monthlySummary?.profit}
            color={monthlySummary?.profit >= 0 ? 'green' : 'red'}
            icon={<DollarSign size={20} />}
          />
        </div>
      </div>

      {/* Annual Summary */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Annual Summary - {selectedYear}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <SummaryCard
            title="Annual Income"
            amount={annualSummary?.totalIncome}
            color="green"
            icon={<TrendingUp size={20} />}
          />
          <SummaryCard
            title="Annual Expenses"
            amount={annualSummary?.totalExpenses}
            color="red"
            icon={<TrendingDown size={20} />}
          />
          <SummaryCard
            title="Annual Loans"
            amount={annualSummary?.totalLoans}
            color="blue"
            icon={<CreditCard size={20} />}
          />
          <SummaryCard
            title="Annual Profit"
            amount={annualSummary?.profit}
            color={annualSummary?.profit >= 0 ? 'green' : 'red'}
            icon={<DollarSign size={20} />}
          />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Monthly Trends - {selectedYear}</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
              <BarChart data={monthlyData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" fontSize={10} className="sm:text-xs" />
                <YAxis fontSize={10} className="sm:text-xs" />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} contentStyle={{ fontSize: '12px' }} />
                <Bar dataKey="income" fill="#22c55e" name="Income" />
                <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                <Bar dataKey="loans" fill="#f59e0b" name="Loans" />
                <Bar dataKey="profit" fill="#8b5cf6" name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Annual Distribution - {selectedYear}</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" labelLine={false} outerRadius={60} fill="#8884d8" dataKey="value" fontSize={10}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} contentStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
