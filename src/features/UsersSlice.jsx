import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersAPI = createApi({
  reducerPath: "usersAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),

  tagTypes: ["Users"],

  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "users",
      providesTags: ["Users"],
    }),

    addUser: builder.mutation({
      query: (newUser) => ({
        url: "users",
        method: "POST",
        body: newUser,
      }),

      async onQueryStarted(newUser, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          usersAPI.util.updateQueryData(
            "getUsers",
            undefined,
            (draft) => {
              draft.unshift({
                ...newUser,
                id: Date.now(),
              });
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          usersAPI.util.updateQueryData(
            "getUsers",
            undefined,
            (draft) => {
              return draft.filter((user) => user.id !== id);
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    updateUser: builder.mutation({
      query: ({ id, updatedUser }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: updatedUser,
      }),

      async onQueryStarted({ id, updatedUser }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          usersAPI.util.updateQueryData(
            "getUsers",
            undefined,
            (draft) => {
              const user = draft.find(
                (u) => u.id === id
              );

              if (user) {
                Object.assign(user, updatedUser);
              }
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});
export const {useGetUsersQuery, useAddUserMutation, useDeleteUserMutation, useUpdateUserMutation} = usersAPI;