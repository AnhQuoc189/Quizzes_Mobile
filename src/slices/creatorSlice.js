import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    quizData: {
        title: '',
        category: '',
        description: '',
        numberOfQuestion: 1,
        isPublic: true,
        questionList: [
            {
                index: 0,
                question: '',
                type: 'pool',
                timeLimit: 5,
                answerList: [
                    {
                        answer: '',
                        isCorrect: false,
                    },
                    {
                        answer: '',
                        isCorrect: false,
                    },
                    {
                        answer: '',
                        isCorrect: false,
                    },
                    {
                        answer: '',
                        isCorrect: false,
                    },
                ],
            },
        ],
    },
    activeCategory: '',
    activeQuestion: {
        index: 0,
        question: '',
        type: 'pool',
        timeLimit: 5,
        answerList: [
            {
                answer: '',
                isCorrect: false,
            },
            {
                answer: '',
                isCorrect: false,
            },
            {
                answer: '',
                isCorrect: false,
            },
            {
                answer: '',
                isCorrect: false,
            },
        ],
    },
    activeTime: 5,
    activeType: 'pool',
};

const creatorSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        changeQuizInfo: (state, action) => {
            const { type, value } = action.payload;
            switch (type) {
                case 'title':
                    state.quizData.title = value;
                    break;
                case 'category':
                    state.quizData.category = value;
                    break;
                case 'description':
                    state.quizData.description = value;
                    break;
                default:
                    break;
            }
        },
        changeActiveCategory: (state, action) => {
            const category = action.payload;
            state.activeCategory = category;
        },
    },
});

export const { changeQuizInfo, changeActiveCategory } = creatorSlice.actions;

const creatorReducer = creatorSlice.reducer;

export default creatorReducer;
