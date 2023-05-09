import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    games: [],
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        createGame: (state, action) => {
            state.games.push(action.payload);
        },
        fetchGame: (state, action) => {
            state.game = action.payload.game;
        },
        addPlayer: (state, action) => {
            state.games = state.games.map((game) =>
                game._id === action.payload._id ? action.payload : game,
            );
        },
    },
});

export const { createGame, fetchGame, addPlayer } = gameSlice.actions;

const gameReducer = gameSlice.reducer;
export default gameReducer;
