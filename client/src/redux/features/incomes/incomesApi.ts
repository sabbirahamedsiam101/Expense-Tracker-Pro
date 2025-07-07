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
    getAnnualIncomeSummary: builder.query({
      query: (year) => `/annual?year=${year}`, // Endpoint for annual summary
    }),

    // Monthly summary endpoint
    getMonthlyIncomeSummary: builder.query({
      query: ({ year, month }) => `/monthly?year=${year}&month=${month}`, // Endpoint for monthly summary
    }),

    // Monthly data for BarChart (income, expenses, loans, profit)
    getMonthlyIncomeData: builder.query({
      query: (year) => `/monthly-data?year=${year}`, // New endpoint for monthly data
    }),
  }),
});

export const {
  useGetIncomesQuery,
  useAddIncomeMutation,
  useUpdateIncomeMutation,
  useDeleteIncomeMutation,
  useGetAnnualIncomeSummaryQuery,
  useGetMonthlyIncomeSummaryQuery,
  useGetMonthlyIncomeDataQuery,  // Add the hook for monthly data
} = incomesApi;

export default incomesApi;
