import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../../utlis/baseURL"; // your utility

export const summaryApi = createApi({
  reducerPath: "summaryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/summary`,
    prepareHeaders: (headers) => {
      headers.set("content-type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Summary"],
  endpoints: (builder) => ({
    // GET /summary/monthly?year=2025
    getMonthlySummaryAll: builder.query({
      query: (year: string | number) => `/monthly?year=${year}`,
      providesTags: ["Summary"],
    }),

    // GET /summary/monthly-one?year=2025&month=7
    getMonthlySummaryOne: builder.query({
      query: ({
        year,
        month,
      }: {
        year: string | number;
        month: string | number;
      }) => `/monthly-one?year=${year}&month=${month}`,
      providesTags: ["Summary"],
    }),

    // GET /summary/annual?year=2025
    getAnnualSummary: builder.query({
      query: (year: string | number) => `/annual?year=${year}`,
      providesTags: ["Summary"],
    }),
  }),
});

export const {
  useGetMonthlySummaryAllQuery,
  useGetMonthlySummaryOneQuery,
  useGetAnnualSummaryQuery,
} = summaryApi;

export default summaryApi;
