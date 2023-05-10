import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    socket: null,
};

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        createSocket: (state, action) => {
            state.socket = action.payload;
        },
        deleteSocket: (state, action) => {
            state.socket = null;
        },
    },
});

export const { createSocket, deleteSocket } = socketSlice.actions;

const socketReducer = socketSlice.reducer;
export default socketReducer;
