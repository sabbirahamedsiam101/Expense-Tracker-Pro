// src/features/expenses/expensesApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../../utlis/baseURL";

export const expensesApi = createApi({
  reducerPath: "expensesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/expenses`, // URL for expenses
    prepareHeaders: (headers) => {
      headers.set("content-type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Expense"],
  endpoints: (builder) => ({
    // Get all Expenses
    getExpenses: builder.query({
      query: () => "/",
      providesTags: ["Expense"],
    }),

    // Add an Expense
    addExpense: builder.mutation({
      query: (newExpense) => ({
        url: "/",
        method: "POST",
        body: newExpense,
      }),
      invalidatesTags: ["Expense"], // Invalidate the cache after adding a new expense
    }),

    // Update an Expense
    updateExpense: builder.mutation({
      query: ({ id, ...updatedExpense }) => ({
        url: `/${id}`,
        method: "PUT",
        body: updatedExpense,
      }),
      invalidatesTags: ["Expense"],
    }),

    // Delete an Expense
    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Expense"],
    }),

    // Get Monthly Expense Summary
    getMonthlyExpenseSummary: builder.query({
      query: ({ year, month }) => `/monthly?year=${year}&month=${month}`, // Update the endpoint as needed
    }),

    // Get Annual Expense Summary
    getAnnualExpenseSummary: builder.query({
      query: (year) => `/annual?year=${year}`, // Update the endpoint as needed
    }),

    // Monthly Data for the trends (used in charts)
    getMonthlyExpenseData: builder.query({
      query: (year) => `/monthly-data?year=${year}`, // Update the endpoint as needed
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
  useGetMonthlyExpenseSummaryQuery,
  useGetAnnualExpenseSummaryQuery,
  useGetMonthlyExpenseDataQuery,
} = expensesApi;

export default expensesApi;
