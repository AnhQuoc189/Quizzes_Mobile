import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API } from 'src/constants/api';

export const apiQuiz = createApi({
    reducerPath: 'apiQuiz',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'https://server-auth-quocanh.onrender.com/',
        baseUrl: API,
    }),
    endpoints: (builder) => ({
        getAllQuizzes: builder.query({
            query: (accessToken) => ({
                url: 'api/quizzes/allquizzes',
                method: 'GET',
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        }),
        getPublicQuizzes: builder.query({
            query: (accessToken) => ({
                url: 'api/quizzes/public',
                method: 'GET',
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        }),
        getTeacherQuizzes: builder.query({
            query: ({ accessToken, teacherId }) => ({
                url: `api/quizzes/teacher/${teacherId}`,
                method: 'GET',
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        }),
        createQuiz: builder.mutation({
            query: ({ accessToken, newQuiz }) => ({
                url: `api/quizzes`,
                method: 'POST',
                headers: { Authorization: `Bearer ${accessToken}` },
                body: newQuiz,
            }),
        }),
        updateQuiz: builder.mutation({
            query: ({ accessToken, quizId, updateQuiz }) => ({
                url: `api/quizzes/${quizId}`,
                method: 'PUT',
                headers: { Authorization: `Bearer ${accessToken}` },
                body: updateQuiz,
            }),
        }),
        deleteQuiz: builder.mutation({
            query: ({ accessToken, quizId }) => ({
                url: `api/quizzes/${quizId}`,
                method: 'DELETE',
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        }),
        likeQuiz: builder.mutation({
            query: ({ accessToken, userId }) => ({
                url: `api/quizzes/${userId}/likeQuiz`,
                method: 'PATCH',
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        }),
        commentQuiz: builder.mutation({
            query: ({ accessToken, userId, comment }) => ({
                url: `api/quizzes/${userId}/commentQuiz`,
                method: 'POST',
                headers: { Authorization: `Bearer ${accessToken}` },
                body: comment,
            }),
        }),

        addQuestion: builder.mutation({
            query: ({ accessToken, quizId, newQuestion }) => ({
                url: `api/${quizId}/questions`,
                method: 'POST',
                headers: { Authorization: `Bearer ${accessToken}` },
                body: newQuestion,
            }),
        }),

        getQuestions: builder.query({
            query: ({ accessToken, quizId }) => ({
                url: `api/${quizId}/questions`,
                method: 'GET',
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        }),

        getQuestion: builder.query({
            query: ({ accessToken, quizId, questionId }) => ({
                url: `api/${quizId}/questions/${questionId}`,
                method: 'GET',
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        }),

        updateQuestion: builder.mutation({
            query: ({ accessToken, quizId, questionId }) => ({
                url: `api/${quizId}/questions/${questionId}`,
                method: 'PUT',
                headers: { Authorization: `Bearer ${accessToken}` },
                body: newQuestion,
            }),
        }),

        deleteQuestion: builder.mutation({
            query: ({ accessToken, quizId, questionId }) => ({
                url: `api/${quizId}/questions/${questionId}`,
                method: 'DELETE',
                headers: { Authorization: `Bearer ${accessToken}` },
                body: newQuestion,
            }),
        }),
    }),
});

export const {
    useGetAllQuizzesQuery,
    useGetPublicQuizzesQuery,
    useGetTeacherQuizzesQuery,
    useCreateQuizMutation,
    useUpdateQuizMutation,
    useDeleteQuizMutation,
    useLikeQuizMutation,
    useCommentQuizMutation,

    useAddQuestionMutation,
    useGetQuestionsQuery,
    useGetQuestionQuery,
    useUpdateQuestionMutation,
    useDeleteQuestionMutation,
} = apiQuiz;
