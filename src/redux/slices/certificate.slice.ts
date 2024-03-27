import { TRequestCertificate } from "@/types";
import { apiSlice } from "./api.slice";

const URL = "/api/certificate";

export type TypeRequestCertificate = TRequestCertificate[];

export const certificateApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all certificate requests
    getRequestCertificates: builder.query<TypeRequestCertificate, void>({
      query: () => `${URL}/get_requests`,
      providesTags: ["Certificate"],
    }),
    // get single certificate request
    getRequestById: builder.query<TypeRequestCertificate, unknown>({
      query: (transaction_id: string) => `${URL}/get_request/${transaction_id}`,
      providesTags: ["Certificate"],
    }),
    // create request
    createRequest: builder.mutation({
      query: (data) => ({
        url: `${URL}/request_certificate`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Certificate"],
    }),
    deleteRequest: builder.mutation({
      query: ({ data, transaction_id }) => ({
        url: `${URL}/delete_request/${transaction_id}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Certificate"],
    }),
    updatePurpose: builder.mutation({
      query: ({ data, transaction_id }) => ({
        url: `${URL}/update_purpose/${transaction_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Certificate"],
    }),
    // approve request
    approveRequest: builder.mutation({
      query: ({ data, transaction_id }) => ({
        url: `${URL}/approve_request/${transaction_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Certificate", "Record"],
    }),
    // reject request
    rejectRequest: builder.mutation({
      query: ({ data, transaction_id }) => ({
        url: `${URL}/reject_request/${transaction_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Certificate"],
    }),
  }),
});

export const {
  useGetRequestByIdQuery,
  useCreateRequestMutation,
  useGetRequestCertificatesQuery,
  useDeleteRequestMutation,
  useUpdatePurposeMutation,
  useApproveRequestMutation,
  useRejectRequestMutation,
} = certificateApiSlice;
