// src/features/incomes/incomesApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../../utlis/baseURL";

export const incomesApi = createApi({
  reducerPath: "incomesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/incomes`,
    prepareHeaders: (headers) => {
      headers.set("content-type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Income"],
  endpoints: (builder) => ({
    getIncomes: builder.query({
      query: () => "/incomes",
      providesTags: ["Income"],
    }),
    addIncome: builder.mutation({
      query: (newIncome) => ({
        url: "/incomes",
        method: "POST",
        body: newIncome,
      }),
      invalidatesTags: ["Income"],
    }),
    updateIncome: builder.mutation({
      query: ({ id, ...updatedIncome }) => ({
        url: `/incomes/${id}`,
        method: "PUT",
        body: updatedIncome,
      }),
      invalidatesTags: ["Income"],
    }),
    deleteIncome: builder.mutation({
      query: (id) => ({
        url: `/incomes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Income"],
    }),
  }),
});

export const {
  useGetIncomesQuery,
  useAddIncomeMutation,
  useUpdateIncomeMutation,
  useDeleteIncomeMutation,
} = incomesApi;

export default incomesApi;
