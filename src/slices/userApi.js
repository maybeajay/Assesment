import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const api_url = "http://localhost:8080/";
export const userApi = createApi({
  reducerPath: "Users",
  baseQuery: fetchBaseQuery({ baseUrl: api_url }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `Users`,
      providesTags: ["Users"],
    }),
    user: builder.query({
      query: (id) => `Users/${id}`,
      providesTags: ["Users"],
    }),
    addUsers: builder.mutation({
      query: ({ ...Users }) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: `/Users`,
        method: "POST",
        body: {
          fname: Users.fname,
          lname: Users.lname,
          email: Users.email,
          mobileNo: Users.mobileNo,
          address1: Users.address1,
          address2: Users.address2,
          country: Users.country,
          state: Users.state,
          zip: Users.zip,
        },
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `Users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: ({ ...rest }) => ({
        url: `Users/${rest.id}`,
        method: "PATCH",
        body: {
          fname: rest.fname,
          lname: rest.lname,
          email: rest.email,
          mobileNo: rest.mobileNo,
          address1: rest.address1,
          address2: rest.address2,
        },
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});
export const {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useAddUsersMutation,
  useUserQuery,
} = userApi;
