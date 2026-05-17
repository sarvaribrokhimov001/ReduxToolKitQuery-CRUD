import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

 export const usersAPI = createApi({
    reducerPath: "usersAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com/',
    }),

    endpoints: (builders) => ({
        // getUsers
        getUsers: builders.query({
            query: () => "users",
        }),
    }),
});

export const {useGetUsersQuery} = usersAPI;