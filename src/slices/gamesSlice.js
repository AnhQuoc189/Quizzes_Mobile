import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    games: [],
    game: null,
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        createGame: (state, action) => {
            state.games.push(action.payload);
            state.game = action.payload;
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

export const { createGame, fetchGame, addPlayer, setGame } = gameSlice.actions;

const gameReducer = gameSlice.reducer;
export default gameReducer;
