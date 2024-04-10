import { TArchive } from "@/types";
import { apiSlice } from "./api.slice";

const URL = "/api/archive";

export type TypeArchive = TArchive[];

export const archiveApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // create archive
    moveToArchives: builder.mutation({
      query: (data) => ({
        url: `${URL}/move_to_archive`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Certificate", "Archive"],
    }),

    // get archives
    getArchives: builder.query<TypeArchive, void>({
      query: () => `${URL}/get_archives`,
      providesTags: ["Archive"],
    }),

    // delete single archive
    deleteSingleArchive: builder.mutation({
      query: (transaction_id) => ({
        url: `${URL}/delete_single/${transaction_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Archive"],
    }),

    // delete all archives
    deleteAllArchives: builder.mutation({
      query: (data) => ({
        url: `${URL}/delete_all`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Archive"],
    }),
  }),
});

export const {
  useMoveToArchivesMutation,
  useGetArchivesQuery,
  useDeleteSingleArchiveMutation,
  useDeleteAllArchivesMutation,
} = archiveApiSlice;
