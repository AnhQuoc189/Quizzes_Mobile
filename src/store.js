// Library
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

//api
import { apiAuth } from './services/authApi';
import { apiQuiz } from './services/quizApi';
import { apiUser } from './services/userApi';

// Slices
import authReducer from './slices/authSlice';
// import creatorReducer from './slices/creatorSlice';
import quizReducer from './slices/quizSlice';
import userReducer from './slices/usersSlice';
import socketReducer from './slices/socketSlice';
import gameReducer from './slices/gamesSlice';
import leaderboardReducer from './slices/leaderboardSlice';
import playeResultReducer from './slices/playerResultSlice';
import { users } from './constants/user.constant';

const store = configureStore({
    reducer: {
        [apiAuth.reducerPath]: apiAuth.reducer,
        [apiQuiz.reducerPath]: apiQuiz.reducer,
        [apiUser.reducerPath]: apiUser.reducer,

        auths: authReducer,
        quizs: quizReducer,
        users: userReducer,
        socket: socketReducer,
        games: gameReducer,
        leaderboards: leaderboardReducer,
        playeResults: playeResultReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            apiAuth.middleware,
            apiQuiz.middleware,
            apiUser.middleware,
        ]),
});

setupListeners(store.dispatch);

export default store;
