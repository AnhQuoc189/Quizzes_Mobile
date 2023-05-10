import { createSlice } from '@reduxjs/toolkit';

const initialState = { playerResults: [], playerResult: null };

const playeResultSlice = createSlice({
    name: 'leaderboard',
    initialState,
    reducers: {
        createPlayerResults: (state, action) => {
            state.playerResults.push(action.payload);
            state.playerResult = action.payload;
        },
        fetchPlayerResults: (state, action) => {
            state.playerResult = action.payload.playerResult;
        },
        addAnswer: (state, action) => {
            state.playerResults = state.playerResults.map((playerResult) =>
                playerResult._id === action.payload._id
                    ? action.payload
                    : playerResult,
            );
        },
    },
});

export const { createPlayerResults, fetchPlayerResults, addAnswer } =
    playeResultSlice.actions;

const playeResultReducer = playeResultSlice.reducer;
export default playeResultReducer;
