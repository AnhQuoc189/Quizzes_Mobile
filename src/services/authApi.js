import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiAuth = createApi({
    reducerPath: 'apiAuth',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.134.18:4000/' }),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (formData) => ({
                url: 'api/auth/login',
                method: 'POST',
                body: formData,
            }),
        }),
        registerUser: builder.mutation({
            query: (formData) => ({
                url: 'api/auth/register',
                method: 'POST',
                body: formData,
            }),
        }),

        generateOtp: builder.mutation({
            query: (email) => ({
                url: 'api/auth/generateOTP',
                method: 'GET',
                params: { email },
            }),
        }),

        registerMailOtp: builder.query({
            query: (formData) => ({
                url: 'api/auth/registerMail',
                method: 'POST',
                body: formData,
            }),
        }),
        verifyOtp: builder.mutation({
            query: ({ email, code }) => ({
                url: 'api/auth/verifyOTP',
                method: 'GET',
                params: { email, code },
            }),
        }),
        resetPass: builder.mutation({
            query: ({ email, password, confirm }) => ({
                url: 'api/auth/resetPassword',
                method: 'PUT',
                body: { email, password, confirm },
            }),
        }),
    }),
});

export const {
    useLoginUserMutation,
    useRegisterUserMutation,
    useGenerateOtpMutation,
    useRegisterMailOtpQuery,
    useVerifyOtpMutation,
    useResetPassMutation,
} = apiAuth;
