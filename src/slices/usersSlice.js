import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchAllUsers: (state, action) => {
            state.users = action.payload;
        },
        updateUser: (state, action) => {
            state.users = state.users.map((user) => {
                return user._id === action.payload._id ? action.payload : user;
            });
        },
        createUser: (state, action) => {
            state.users.push(action.payload);
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter((user) => {
                return user._id !== action.payload;
            });
        },
    },
});

export const { fetchAllUsers, updateUser, createUser, deleteUser } =
    userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
