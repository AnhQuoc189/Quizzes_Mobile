import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API } from 'src/constants/api';
export const apiGame = createApi({
    reducerPath: 'apiGame',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'https://server-auth-quocanh.onrender.com/',
        baseUrl: API,
    }),
    endpoints: (builder) => ({
        createGame: builder.mutation({
            query: (newGame) => ({
                url: `api/games`,
                method: 'POST',
                body: newGame,
            }),
        }),
        deleteGane: builder.mutation({
            query: (gameId) => ({
                url: `api/games/${gameId}`,
                method: 'DELETE',
            }),
        }),

        addPlayer: builder.mutation({
            query: ({ gameId, playerId }) => ({
                url: `api/games/${gameId}/players`,
                method: 'PATCH',
                body: { playerId },
            }),
        }),
    }),
});

export const {
    useCreateGameMutation,
    useDeleteGaneMutation,
    useAddPlayerMutation,
} = apiGame;
