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
  tagTypes: ["Expense", "Summary"],
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
      invalidatesTags: ["Expense", "Summary"], // Invalidate the cache after adding a new expense
    }),

    // Update an Expense
    updateExpense: builder.mutation({
      query: ({ id, ...updatedExpense }) => ({
        url: `/${id}`,
        method: "PUT",
        body: updatedExpense,
      }),
      invalidatesTags: ["Expense", "Summary"],
    }),

    // Delete an Expense
    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Expense", "Summary"],
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expensesApi;

export default expensesApi;
