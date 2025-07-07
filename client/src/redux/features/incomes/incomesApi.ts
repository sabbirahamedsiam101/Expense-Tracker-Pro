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
  tagTypes: ["Income", "Summary"],
  endpoints: (builder) => ({
    getIncomes: builder.query({
      query: () => "/",
      providesTags: ["Income"],
    }),
    addIncome: builder.mutation({
      query: (newIncome) => ({
        url: "/",
        method: "POST",
        body: newIncome,
      }),
      invalidatesTags: ["Income", "Summary"],
    }),
    updateIncome: builder.mutation({
      query: ({ id, ...updatedIncome }) => ({
        url: `/${id}`,
        method: "PUT",
        body: updatedIncome,
      }),
      invalidatesTags: ["Income", "Summary"],
    }),
    deleteIncome: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Income", "Summary"],
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
