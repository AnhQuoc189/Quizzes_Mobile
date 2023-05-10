import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    authData: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loGin: (state, action) => {
            const SaveStore = async () => {
                await AsyncStorage.setItem(
                    'profile',
                    JSON.stringify(action?.payload),
                );
            };
            state.authData = action.payload;
            SaveStore();
        },
        logOut: (state) => {
            const Clear = async () => {
                await AsyncStorage.clear();
            };
            state.authData = null;
            Clear();
        },
    },
});

export const { loGin, logOut } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
