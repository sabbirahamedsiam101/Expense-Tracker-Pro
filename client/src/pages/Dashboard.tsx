import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SummaryCard from "@/components/SummaryCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, TrendingDown, DollarSign, CreditCard } from "lucide-react";
import {
  useGetAnnualSummaryQuery,
  useGetMonthlySummaryAllQuery,
  useGetMonthlySummaryOneQuery,
} from "@/redux/features/summary/summaryApi";

const Dashboard: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const { data: monthlyDataOne, isLoading } = useGetMonthlySummaryOneQuery({
    year: selectedYear,
    month: selectedMonth,
  });

  const { data: annualData } = useGetAnnualSummaryQuery(selectedYear);
  const { data: monthlyData } = useGetMonthlySummaryAllQuery(selectedYear);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - 2 + i
  );

  const pieData = [
    { name: "Income", value: 50000, color: "#22c55e" },
    { name: "Expenses", value: 30000, color: "#ef4444" },
    { name: "Loans", value: 10000, color: "#f59e0b" },
  ];

  const monthlyChartData = [
    { month: "Jan", income: 4000, expenses: 2000, loans: 500, profit: 1500 },
    { month: "Feb", income: 4500, expenses: 2500, loans: 800, profit: 1200 },
    { month: "Mar", income: 4800, expenses: 2200, loans: 600, profit: 2000 },
    { month: "Apr", income: 5200, expenses: 3000, loans: 1000, profit: 1200 },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log("get monthly summary one", monthlyDataOne , "get annual summary", annualData, "get monthly summary", monthlyData);
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Financial Dashboard
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Select
            value={selectedMonth.toString()}
            onValueChange={(value) => setSelectedMonth(parseInt(value))}
          >
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

          <Select
            value={selectedYear.toString()}
            onValueChange={(value) => setSelectedYear(parseInt(value))}
          >
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

      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          Monthly Summary - {months[selectedMonth]} {selectedYear}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <SummaryCard
            title="Monthly Income"
            amount={5000}
            color="green"
            icon={<TrendingUp size={20} />}
          />
          <SummaryCard
            title="Monthly Expenses"
            amount={3000}
            color="red"
            icon={<TrendingDown size={20} />}
          />
          <SummaryCard
            title="Monthly Loans"
            amount={1000}
            color="blue"
            icon={<CreditCard size={20} />}
          />
          <SummaryCard
            title="Monthly Profit"
            amount={1000}
            color={"green"}
            icon={<DollarSign size={20} />}
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          Annual Summary - {selectedYear}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <SummaryCard
            title="Annual Income"
            amount={50000}
            color="green"
            icon={<TrendingUp size={20} />}
          />
          <SummaryCard
            title="Annual Expenses"
            amount={30000}
            color="red"
            icon={<TrendingDown size={20} />}
          />
          <SummaryCard
            title="Annual Loans"
            amount={10000}
            color="blue"
            icon={<CreditCard size={20} />}
          />
          <SummaryCard
            title="Annual Profit"
            amount={10000}
            color={"green"}
            icon={<DollarSign size={20} />}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">
              Monthly Trends - {selectedYear}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <ResponsiveContainer
              width="100%"
              height={250}
              className="sm:h-[300px]"
            >
              <BarChart
                data={monthlyChartData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" fontSize={10} className="sm:text-xs" />
                <YAxis fontSize={10} className="sm:text-xs" />
                <Tooltip
                  formatter={(value) => `$${value.toLocaleString()}`}
                  contentStyle={{ fontSize: "12px" }}
                />
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
            <CardTitle className="text-base sm:text-lg">
              Annual Distribution - {selectedYear}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <ResponsiveContainer
              width="100%"
              height={250}
              className="sm:h-[300px]"
            >
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  fontSize={10}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `$${value.toLocaleString()}`}
                  contentStyle={{ fontSize: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
