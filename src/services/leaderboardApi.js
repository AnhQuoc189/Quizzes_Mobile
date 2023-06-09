import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API } from 'src/constants/api';
export const apiLeaderboard = createApi({
    reducerPath: 'apiLeaderboard',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'https://server-auth-quocanh.onrender.com/',
        baseUrl: API,
    }),
    endpoints: (builder) => ({
        getLeaderBoard: builder.query({
            query: (leaderboardId) => ({
                url: `api/leaderboard/${leaderboardId}`,
                method: 'GET',
            }),
        }),
        createLeaderboard: builder.mutation({
            query: (newLeaderboard) => ({
                url: `api/leaderboard`,
                method: 'POST',
                body: newLeaderboard,
            }),
        }),
        updateQuestionleaderboard: builder.mutation({
            query: ({ leaderboardId, update }) => ({
                url: `api/leaderboard/${leaderboardId}/questionleaderboard`,
                method: 'PATCH',
                body: update,
            }),
        }),
        updateCurrentleaderboard: builder.mutation({
            query: ({ leaderboardId, update }) => ({
                url: `api/leaderboard/${leaderboardId}/currentleaderboard`,
                method: 'PATCH',
                body: update,
            }),
        }),
    }),
});

export const {
    useGetLeaderBoardQuery,
    useCreateLeaderboardMutation,
    useUpdateQuestionleaderboardMutation,
    useUpdateCurrentleaderboardMutation,
} = apiLeaderboard;
