// src/redux/features/incomes/incomesApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseURL } from "../../../utlis/baseURL";

export const incomesApi = createApi({
  reducerPath: 'incomesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/incomes`,
    prepareHeaders: (headers) => {
      headers.set('content-type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Income'],
  endpoints: (builder) => ({
    getIncomes: builder.query({
      query: () => '/',
      providesTags: ['Income'],
    }),
    addIncome: builder.mutation({
      query: (newIncome) => ({
        url: '/',
        method: 'POST',
        body: newIncome,
      }),
      invalidatesTags: ['Income'],
    }),
    updateIncome: builder.mutation({
      query: ({ id, ...updatedIncome }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: updatedIncome,
      }),
      invalidatesTags: ['Income'],
    }),
    deleteIncome: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Income'],
    }),

    // Annual summary endpoint
    getAnnualSummary: builder.query({
      query: (year) => `/dashboard/annual?year=${year}`, // Endpoint for annual summary
    }),

    // Monthly summary endpoint
    getMonthlySummary: builder.query({
      query: ({ year, month }) => `/dashboard/monthly?year=${year}&month=${month}`, // Endpoint for monthly summary
    }),
  }),
});

export const {
  useGetIncomesQuery,
  useAddIncomeMutation,
  useUpdateIncomeMutation,
  useDeleteIncomeMutation,
  useGetAnnualSummaryQuery,  // Ensure this hook is exported
  useGetMonthlySummaryQuery, // Ensure this hook is exported
} = incomesApi;

export default incomesApi;
