import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

 export const usersAPI = createApi({
    reducerPath: "usersAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com/',
    }),

    tagTypes : ["Users"],

    endpoints: (builders) => ({
        // getUsers
        getUsers: builders.query({
            query: () => "users",
            providesTags : ["Users"],
        }),

        // deleteUsers
        deleteUsers : builders.mutation({
            query : (id) => ({
                url : `users/${id}`,
                method : "DELETE",
            }),
            invalidatesTags : ["Users"],
        })
    }),
});

export const {useGetUsersQuery , useDeleteUsersMutation} = usersAPI;