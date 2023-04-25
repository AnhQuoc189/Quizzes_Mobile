import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authSlice = createSlice({
    name: 'auth',
    initialState: { authData: null },
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
        logOut: () => {
            const Clear = async () => {
                await AsyncStorage.clear();
            };
            state.authData = action.payload;
            Clear();
        },
    },
});

export const { loGin, logOut } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
