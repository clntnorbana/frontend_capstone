import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://backendcapstone-production.up.railway.app/",
  // baseUrl: "http://localhost:3000/",
  credentials: "include",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [
    "Resident",
    "Certificate",
    "Employee",
    "Record",
    "Archive",
    "Setting",
  ],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: (_builder) => ({}),
});
