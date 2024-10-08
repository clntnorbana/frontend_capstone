import { TEmployee, TSetting } from "@/types";
import { apiSlice } from "./api.slice";

const URL = "api/employee";

export type TypeEmployee = TEmployee[];
export type TypeSetting = TSetting[];

export const employeeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // login employee
    login: builder.mutation({
      query: (data) => ({
        url: `${URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    // logout employee
    logout: builder.mutation({
      // eslint-disable-next-line no-empty-pattern
      query: ({}) => ({
        url: `${URL}/logout`,
        method: "POST",
      }),
    }),
    // get employee by id
    getEmployee: builder.query<TypeEmployee, unknown>({
      query: (employee_id: string) => `${URL}/get_employee/${employee_id}`,
      providesTags: ["Employee"],
    }),
    // get all employees
    getAllEmployees: builder.query<TypeEmployee, void>({
      query: () => `${URL}/get_employees`,
      providesTags: ["Employee"],
    }),
    // get setting
    getSetting: builder.query<TypeSetting, void>({
      query: () => `${URL}/get_setting`,
      providesTags: ["Setting"],
    }),
    // create account
    createAccount: builder.mutation({
      query: (data) => ({
        url: `${URL}/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Employee"],
    }),
    // update employee
    updateEmployee: builder.mutation({
      query: ({ data, employee_id }) => ({
        url: `${URL}/update_employee/${employee_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Employee"],
    }),
    // update password
    updatePassword: builder.mutation({
      query: ({ data, employee_id }) => ({
        url: `${URL}/update_password/${employee_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Employee"],
    }),
    // update admin role
    updateAdminRole: builder.mutation({
      query: (employee_id: string) => ({
        url: `${URL}/update_role/${employee_id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Employee"],
    }),
    // update setting
    updateSetting: builder.mutation({
      query: (data) => ({
        url: `${URL}/update_setting`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Setting"],
    }),
    // delete employee
    deleteEmployee: builder.mutation({
      query: (employee_id: string) => ({
        url: `${URL}/delete_employee/${employee_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employee"],
    }),
    // delete account
    deleteAccount: builder.mutation({
      query: ({ data, employee_id }) => ({
        url: `${URL}/delete_account/${employee_id}`,
        method: "DELETe",
        body: data,
      }),

      invalidatesTags: ["Employee"],
    }),
    changeForgottenPassword: builder.mutation({
      query: (data) => ({
        url: `${URL}/change_forgotten_password`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useCreateAccountMutation,
  useUpdateEmployeeMutation,
  useUpdatePasswordMutation,
  useUpdateAdminRoleMutation,
  useUpdateSettingMutation,
  useDeleteEmployeeMutation,
  useDeleteAccountMutation,
  useGetEmployeeQuery,
  useGetAllEmployeesQuery,
  useGetSettingQuery,
  useChangeForgottenPasswordMutation,
} = employeeApiSlice;
