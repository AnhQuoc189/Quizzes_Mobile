import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    quizes: [],
};

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        fetchPublicQuizes: (state, action) => {
            state.quizes = action.payload;
        },
        fetchAllQuizes: (state, action) => {
            state.quizes = action.payload;
        },
        fetchTeacherQuizes: (state, action) => {
            state.quizes = action.payload;
        },
        fetchQuizesBySearch: (state, action) => {
            state.quizes = action.payload;
        },
        createQuiz: (state, action) => {
            state.quizes.push(action.payload);
        },
        updateQuiz: (state, action) => {
            state.quizes = state.quizes.map((quiz) => {
                return quiz._id === action.payload._id ? action.payload : quiz;
            });
        },
        likeQuiz: (state, action) => {
            state.quizes = state.quizes.map((quiz) => {
                return quiz._id === action.payload._id ? action.payload : quiz;
            });
        },
        commentQuiz: (state, action) => {
            state.quizes = state.quizes.map((quiz) => {
                return quiz._id === action.payload._id ? action.payload : quiz;
            });
        },
        deleteQuiz: (state, action) => {
            state.quizes = state.quizes.filter((quiz) => {
                return quiz._id !== action.payload._id;
            });
        },
        fetchQuiz: (state, action) => {
            state.quiz = action.payload.quiz;
        },
    },
});

export const {
    fetchAllQuizes,
    fetchPublicQuizes,
    fetchTeacherQuizes,
    fetchQuizesBySearch,
    createQuiz,
    updateQuiz,
    likeQuiz,
    commentQuiz,
    deleteQuiz,
    fetchQuiz,
} = quizSlice.actions;

const quizReducer = quizSlice.reducer;
export default quizReducer;
