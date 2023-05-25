import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API } from 'src/constants/api';

export const apiPlayerResult = createApi({
    reducerPath: 'apiPlayerResult',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'https://server-auth-quocanh.onrender.com/',
        baseUrl: API,
    }),
    endpoints: (builder) => ({
        createPlayerResult: builder.mutation({
            query: (newPlayerResult) => ({
                url: `api/playerResults`,
                method: 'POST',
                body: newPlayerResult,
            }),
        }),
    }),
});

export const { useCreatePlayerResultMutation } = apiPlayerResult;
