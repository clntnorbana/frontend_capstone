import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://backendcapstone-production.up.railway.app/",
  credentials: "include",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Resident", "Certificate", "Employee", "Record"],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: (_builder) => ({}),
});
