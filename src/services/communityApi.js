import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API } from 'src/constants/api';

export const apiCommunity = createApi({
    reducerPath: 'apiCommunity',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'https://server-auth-quocanh.onrender.com/',
        baseUrl: API,
    }),
    endpoints: (builder) => ({
        getCommunities: builder.query({
            query: (accessToken) => ({
                url: 'api/community',
                method: 'GET',
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        }),
    }),
});

export const { useGetCommunitiesQuery } = apiCommunity;
