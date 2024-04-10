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
  }),
});

export const { useMoveToArchivesMutation, useGetArchivesQuery } =
  archiveApiSlice;
