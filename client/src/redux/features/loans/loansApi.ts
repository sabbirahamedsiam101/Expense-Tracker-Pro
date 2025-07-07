// src/features/loans/loansApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../../utlis/baseURL"; // Assuming you have a baseURL utility

export const loansApi = createApi({
  reducerPath: "loansApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/loans`, // URL for loans
    prepareHeaders: (headers) => {
      headers.set("content-type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Loan"],
  endpoints: (builder) => ({
    // Get all Loans
    getLoans: builder.query({
      query: () => "/",
      providesTags: ["Loan"],
    }),

    // Add a Loan
    addLoan: builder.mutation({
      query: (newLoan) => ({
        url: "/",
        method: "POST",
        body: newLoan,
      }),
      invalidatesTags: ["Loan"],
    }),

    // Update a Loan
    updateLoan: builder.mutation({
      query: ({ id, ...updatedLoan }) => ({
        url: `/${id}`,
        method: "PUT",
        body: updatedLoan,
      }),
      invalidatesTags: ["Loan"],
    }),

    // Delete a Loan
    deleteLoan: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Loan"],
    }),

    // Monthly Loan Summary
    getMonthlyLoanSummary: builder.query({
      query: ({ year, month }) => `/monthly?year=${year}&month=${month}`, // Update the endpoint for monthly loan summary
    }),

    // Annual Loan Summary
    getAnnualLoanSummary: builder.query({
      query: (year) => `/annual?year=${year}`, // Update the endpoint for annual loan summary
    }),

    // Monthly Loan Data (Trends for Loans - Income, Expenses, Loans, Profit)
    getMonthlyLoanData: builder.query({
      query: (year) => `/monthly-data?year=${year}`, // Add this endpoint for loan trends data
    }),
  }),
});

export const {
  useGetLoansQuery,
  useAddLoanMutation,
  useUpdateLoanMutation,
  useDeleteLoanMutation,
  useGetMonthlyLoanSummaryQuery,
  useGetAnnualLoanSummaryQuery,
  useGetMonthlyLoanDataQuery,  // This hook is now available
} = loansApi;

export default loansApi;
