import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    community: null,
    communities: [],
};

const communitySlice = createSlice({
    name: 'community',
    initialState,
    reducers: {
        fetchAllCommunity: (state, action) => {
            state.community = action.payload;
        },
        fetchAllCommunities: (state, action) => {
            state.communities = action.payload;
        },
        createCommunity: (state, action) => {
            state.communities.push(action.payload);
        },
        updateCommunity: (state, action) => {
            state.communities = state.communities.filter((item) => {
                return item._id === action.payload._id ? action.payload : item;
            });
        },
        deleteCommunity: (state, action) => {
            state.communities = state.communities.filter((item) => {
                return item._id !== action.payload._id;
            });
        },
        addQuiz: (state, action) => {
            state.communities = state.communities.map((item) => {
                if (item._id === action.payload.id) {
                    item.quizList.push(action.payload.quiz);
                    return item;
                } else {
                    return item;
                }
            });
            state.community.quizList.push(action.payload.quiz);
        },
        removeQuiz: (state, action) => {
            console.log(action.payload.quiz._id);
            state.communities = state.communities.map((item) => {
                if (item._id === action.payload.id) {
                    item.quizList = item.quizList.filter(
                        (item) => item._id !== action.payload.quiz._id,
                    );
                    return item;
                } else {
                    return item;
                }
            });
            // console.log(action);
            state.community.quizList = state.community.quizList.filter(
                (item) => {
                    return item._id !== action.payload.quiz._id;
                },
            );
        },
        addMessageChat: (state, action) => {
            state.community.chatBox.push(action.payload);
            // console.log(action);
        },
    },
});

export const {
    fetchAllCommunity,
    createCommunity,
    deleteCommunity,
    fetchAllCommunities,
    addQuiz,
    removeQuiz,
    addMessageChat,
} = communitySlice.actions;

const communityReducer = communitySlice.reducer;
export default communityReducer;
