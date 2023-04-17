import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import authSlice from 'src/slices/authSlice';
import { apiAuth } from 'src/services/authApi';

const store = configureStore({
    reducer: {
        auths: authSlice.reducer,
        [apiAuth.reducerPath]: apiAuth.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiAuth.middleware),
});

setupListeners(store.dispatch);

export default store;
