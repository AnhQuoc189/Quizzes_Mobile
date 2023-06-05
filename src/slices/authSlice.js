import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    authData: null,
    user: null,
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
                await AsyncStorage.setItem(
                    'info',
                    JSON.stringify(action?.payload?.data?.user),
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
            state.user = null;
            Clear();
        },
        upDated: (state, action) => {
            const SaveStore = async () => {
                await AsyncStorage.setItem(
                    'info',
                    JSON.stringify(action?.payload),
                );
            };
            state.user = action.payload;
            SaveStore();
        },
    },
});

export const { loGin, logOut, upDated } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
