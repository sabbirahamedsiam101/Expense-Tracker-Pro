// src/features/expenses/expensesApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../../utlis/baseURL";

export const expensesApi = createApi({
  reducerPath: "expensesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/expenses`,
    prepareHeaders: (headers) => {
      headers.set("content-type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Expense"],
  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: () => "/expenses",
      providesTags: ["Expense"],
    }),
    addExpense: builder.mutation({
      query: (newExpense) => ({
        url: "/expenses",
        method: "POST",
        body: newExpense,
      }),
      invalidatesTags: ["Expense"],
    }),
    updateExpense: builder.mutation({
      query: ({ id, ...updatedExpense }) => ({
        url: `/expenses/${id}`,
        method: "PUT",
        body: updatedExpense,
      }),
      invalidatesTags: ["Expense"],
    }),
    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `/expenses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Expense"],
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expensesApi;
