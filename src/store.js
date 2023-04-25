// Library
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

// Slices
import authReducer from './slices/authSlice';
import { apiAuth } from './services/authApi';
import creatorReducer from './slices/creatorSlice';

const store = configureStore({
    reducer: {
        auths: authReducer,
        [apiAuth.reducerPath]: apiAuth.reducer,
        creator: creatorReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiAuth.middleware),
});

setupListeners(store.dispatch);

export default store;
