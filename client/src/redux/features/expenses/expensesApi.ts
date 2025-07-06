// src/features/expenses/expensesApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseURL } from "../../../utlis/baseURL"; // Assuming you have a baseURL utility

export const expensesApi = createApi({
  reducerPath: 'expensesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/expenses`, // URL for expenses
    prepareHeaders: (headers) => {
      headers.set('content-type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Expense'],
  endpoints: (builder) => ({
    // Get all Expenses
    getExpenses: builder.query({
      query: () => '/',
      providesTags: ['Expense'],
    }),

    // Add an Expense
    addExpense: builder.mutation({
      query: (newExpense) => ({
        url: '/',
        method: 'POST',
        body: newExpense,
      }),
      invalidatesTags: ['Expense'], // Invalidate the cache after adding a new expense
    }),

    // Update an Expense
    updateExpense: builder.mutation({
      query: ({ id, ...updatedExpense }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: updatedExpense,
      }),
      invalidatesTags: ['Expense'],
    }),

    // Delete an Expense
    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Expense'],
    }),

    // Get Monthly Summary
    getMonthlySummary: builder.query({
      query: ({ year, month }) => `/monthly?year=${year}&month=${month}`,
    }),

    // Get Annual Summary
    getAnnualSummary: builder.query({
      query: (year) => `/annual?year=${year}`,
    }),

    // Monthly Data for the trends (used in charts)
    getMonthlyData: builder.query({
      query: (year) => `/monthly-data?year=${year}`,
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
  useGetMonthlySummaryQuery,
  useGetAnnualSummaryQuery,
  useGetMonthlyDataQuery,
} = expensesApi;

export default expensesApi;
