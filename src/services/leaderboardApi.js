import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API } from 'src/constants/api';
export const apiLeaderboard = createApi({
    reducerPath: 'apiLeaderboard',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'https://server-auth-quocanh.onrender.com/',
        baseUrl: API,
    }),
    endpoints: (builder) => ({
        createLeaderboard: builder.mutation({
            query: (newLeaderboard) => ({
                url: `api/leaderboard`,
                method: 'POST',
                body: newLeaderboard,
            }),
        }),
    }),
});

export const { useCreateLeaderboardMutation } = apiLeaderboard;
