import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default createSlice({
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
