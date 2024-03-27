import { TRecord } from "@/types";
import { apiSlice } from "./api.slice";

const URL = "/api/record";

export type TypeRecord = TRecord[];

export const recordApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all records
    getAllRecords: builder.query<TypeRecord, void>({
      query: () => `${URL}/get_records`,
      providesTags: ["Record"],
    }),

    // delete single record
    deleteRecord: builder.mutation({
      query: (transaction_id: string) => ({
        url: `${URL}/delete_record/${transaction_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Record"],
    }),

    // delete all records
    deleteAllRecords: builder.mutation({
      query: (data) => ({
        url: `${URL}/delete_records`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Record"],
    }),
  }),
});

export const {
  useGetAllRecordsQuery,
  useDeleteRecordMutation,
  useDeleteAllRecordsMutation,
} = recordApiSlice;
