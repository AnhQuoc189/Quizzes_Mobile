import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiQuiz = createApi({
    reducerPath: 'apiQuiz',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'https://server-auth-quocanh.onrender.com/',
        baseUrl: 'http://192.168.168.18:4000/',
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
} = apiQuiz;
