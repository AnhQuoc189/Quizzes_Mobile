import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiPlayerResult = createApi({
    reducerPath: 'apiPlayerResult',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'https://server-auth-quocanh.onrender.com/',
        baseUrl: 'http://192.168.168.18:4000/',
    }),
    endpoints: (builder) => ({}),
});

export const {} = apiPlayerResult;
