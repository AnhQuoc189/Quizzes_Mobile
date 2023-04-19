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
                        name: 'a',
                        answer: '',
                        isCorrect: false,
                    },
                    {
                        name: 'b',
                        answer: '',
                        isCorrect: false,
                    },
                    {
                        name: 'c',
                        answer: '',
                        isCorrect: false,
                    },
                    {
                        name: 'd',
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
                name: 'a',
                answer: '',
                isCorrect: false,
            },
            {
                name: 'b',
                answer: '',
                isCorrect: false,
            },
            {
                name: 'c',
                answer: '',
                isCorrect: false,
            },
            {
                name: 'd',
                answer: '',
                isCorrect: false,
            },
        ],
    },
    isSaved: false,
};

const creatorSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        // Quiz
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
        // Question
        changeQuestionInfo: (state, action) => {
            const question = action.payload;
            state.quizData.questionList[question.index] = question;
            state.isSaved = true;
            alert('Save changes successfully!');
        },
        changeActiveQuestionInfo: (state, action) => {
            const { type, value } = action.payload;
            switch (type) {
                case 'question':
                    state.activeQuestion.question = value;
                    break;
                case 'timeLimit':
                    state.activeQuestion.timeLimit = value;
                    break;
                case 'type':
                    state.activeQuestion.type = value;
                    switch (value) {
                        case 'pool':
                            state.activeQuestion.answerList = [
                                {
                                    name: 'a',
                                    answer: '',
                                    isCorrect: false,
                                },
                                {
                                    name: 'b',
                                    answer: '',
                                    isCorrect: false,
                                },
                                {
                                    name: 'c',
                                    answer: '',
                                    isCorrect: false,
                                },
                                {
                                    name: 'd',
                                    answer: '',
                                    isCorrect: false,
                                },
                            ];
                            break;
                        case 'trueOrFalse': {
                            state.activeQuestion.answerList = [
                                {
                                    name: 'true',
                                    answer: 'True',
                                    isCorrect: false,
                                },
                                {
                                    name: 'false',
                                    answer: 'False',
                                    isCorrect: false,
                                },
                            ];
                            break;
                        }
                        default:
                            break;
                    }
                    break;
                default:
                    break;
            }
            state.isSaved = false;
        },
        changeActiveQuestionIndex: (state, action) => {
            const activeIndex = action.payload;
            state.activeQuestion = state.quizData.questionList[activeIndex];
        },
        addQuestion: (state) => {
            state.quizData.questionList.push({
                index: state.quizData.numberOfQuestion,
                question: '',
                type: 'pool',
                timeLimit: 5,
                answerList: [
                    {
                        name: 'a',
                        answer: '',
                        isCorrect: false,
                    },
                    {
                        name: 'b',
                        answer: '',
                        isCorrect: false,
                    },
                    {
                        name: 'c',
                        answer: '',
                        isCorrect: false,
                    },
                    {
                        name: 'd',
                        answer: '',
                        isCorrect: false,
                    },
                ],
            });

            state.activeQuestion =
                state.quizData.questionList[state.quizData.numberOfQuestion];

            state.quizData.numberOfQuestion += 1;

            state.isSaved = false;
        },
        deleteQuestion: (state, action) => {
            if (state.quizData.numberOfQuestion === 1) {
                alert('The quiz can not be empty!');
                return;
            }

            const deleteIndex = action.payload;
            state.quizData.questionList.splice(deleteIndex, 1);
            state.quizData.questionList.map((question, index) => {
                question.index = index;
            });

            if (
                state.activeQuestion.index ===
                state.quizData.numberOfQuestion - 1
            ) {
                state.activeQuestion =
                    state.quizData.questionList[
                        state.quizData.numberOfQuestion - 2
                    ];
            } else {
                state.activeQuestion =
                    state.quizData.questionList[state.activeQuestion.index];
            }
            state.quizData.numberOfQuestion -= 1;

            alert('Delete question successfully!');
        },
        duplicateQuestion: (state, action) => {
            const duplicatedQuestion = action.payload;
            state.quizData.questionList.push({
                ...duplicatedQuestion,
                index: state.quizData.numberOfQuestion,
            });

            state.activeQuestion =
                state.quizData.questionList[state.quizData.numberOfQuestion];

            state.quizData.numberOfQuestion += 1;
        },
        changeAnswer: (state, action) => {
            const { name, type, isCorrect, answer } = action.payload;
            switch (type) {
                case 'pool':
                    switch (name) {
                        case 'a':
                            state.activeQuestion.answerList[0].answer = answer;
                            state.activeQuestion.answerList[0].isCorrect =
                                isCorrect;
                            break;
                        case 'b':
                            state.activeQuestion.answerList[1].answer = answer;
                            state.activeQuestion.answerList[1].isCorrect =
                                isCorrect;
                            break;
                        case 'c':
                            state.activeQuestion.answerList[2].answer = answer;
                            state.activeQuestion.answerList[2].isCorrect =
                                isCorrect;
                            break;
                        case 'd':
                            state.activeQuestion.answerList[3].answer = answer;
                            state.activeQuestion.answerList[3].isCorrect =
                                isCorrect;
                            break;
                        default:
                            break;
                    }
                    break;
                case 'trueOfFalse':
                    switch (name) {
                        case 'true':
                            state.activeQuestion.answerList[0].isCorrect =
                                isCorrect;
                            state.activeQuestion.answerList[1].isCorrect =
                                !isCorrect;
                            break;
                        case 'false':
                            state.activeQuestion.answerList[0].isCorrect =
                                !isCorrect;
                            state.activeQuestion.answerList[1].isCorrect =
                                isCorrect;
                            break;
                    }

                default:
                    break;
            }
            state.isSaved = false;
        },
    },
});

export const {
    changeQuizInfo,
    changeActiveCategory,
    changeQuestionInfo,
    changeActiveQuestionInfo,
    changeActiveQuestionIndex,
    addQuestion,
    deleteQuestion,
    duplicateQuestion,
    changeAnswer,
} = creatorSlice.actions;

const creatorReducer = creatorSlice.reducer;

export default creatorReducer;
