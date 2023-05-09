import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiUser = createApi({
    reducerPath: 'apiUser',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'https://server-auth-quocanh.onrender.com/',
        baseUrl: 'http://192.168.22.18:4000/',
    }),
    endpoints: (builder) => ({}),
});

export const {} = apiUser;
