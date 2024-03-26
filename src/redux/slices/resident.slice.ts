import { TResident } from "@/types";
import { apiSlice } from "./api.slice";

const URL = "/api/resident";

export type TypeResident = TResident[];

export const residentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get residents
    getAllResidents: builder.query<TypeResident, void>({
      query: () => `${URL}/get_residents`,
      providesTags: ["Resident"],
    }),
    // get single resident
    getResidentById: builder.query<TypeResident, unknown>({
      query: (profile_id: string) => `${URL}/get_resident/${profile_id}`,
      providesTags: ["Resident"],
    }),
    // create resident
    createResident: builder.mutation({
      query: (data) => ({
        url: `${URL}/register`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Resident"],
    }),
    // get forgotten profile
    sendForgottenProfile: builder.mutation({
      query: (data) => ({
        url: `${URL}/get_forgotten_profileId`,
        method: "POST",
        body: data,
      }),
    }),
    updateResident: builder.mutation({
      query: ({ data, profile_id }) => ({
        url: `${URL}/update/${profile_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Resident"],
    }),
    deleteResident: builder.mutation({
      query: ({ data, profile_id }) => ({
        url: `${URL}/delete/${profile_id}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Resident"],
    }),
  }),
});

export const {
  useGetAllResidentsQuery,
  useGetResidentByIdQuery,
  useCreateResidentMutation,
  useSendForgottenProfileMutation,
  useUpdateResidentMutation,
  useDeleteResidentMutation,
} = residentApiSlice;
