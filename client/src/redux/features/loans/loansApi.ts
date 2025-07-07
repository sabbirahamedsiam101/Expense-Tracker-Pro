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
  tagTypes: ["Loan", "Summary"],
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
      invalidatesTags: ["Loan", "Summary"],
    }),

    // Update a Loan
    updateLoan: builder.mutation({
      query: ({ id, ...updatedLoan }) => ({
        url: `/${id}`,
        method: "PUT",
        body: updatedLoan,
      }),
      invalidatesTags: ["Loan", "Summary"],
    }),

    // Delete a Loan
    deleteLoan: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Loan", "Summary"],
    }),
  }),
});

export const {
  useGetLoansQuery,
  useAddLoanMutation,
  useUpdateLoanMutation,
  useDeleteLoanMutation,
} = loansApi;

export default loansApi;
