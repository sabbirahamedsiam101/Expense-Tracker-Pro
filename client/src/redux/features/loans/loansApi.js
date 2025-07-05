// src/features/loans/loansApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../../utlis/baseURL";

export const loansApi = createApi({
  reducerPath: "loansApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/loans`,
    prepareHeaders: (headers) => {
      headers.set("content-type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Loan"],
  endpoints: (builder) => ({
    getLoans: builder.query({
      query: () => "/loans",
      providesTags: ["Loan"],
    }),
    addLoan: builder.mutation({
      query: (newLoan) => ({
        url: "/loans",
        method: "POST",
        body: newLoan,
      }),
      invalidatesTags: ["Loan"],
    }),
    updateLoan: builder.mutation({
      query: ({ id, ...updatedLoan }) => ({
        url: `/loans/${id}`,
        method: "PUT",
        body: updatedLoan,
      }),
      invalidatesTags: ["Loan"],
    }),
    deleteLoan: builder.mutation({
      query: (id) => ({
        url: `/loans/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Loan"],
    }),
  }),
});

export const {
  useGetLoansQuery,
  useAddLoanMutation,
  useUpdateLoanMutation,
  useDeleteLoanMutation,
} = loansApi;
