import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiAuth = createApi({
    reducerPath: 'apiAuth',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'https://server-auth-quocanh.onrender.com/',
        baseUrl: 'http://192.168.22.18:4000/',
    }),
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
            query: (mail) => ({
                url: 'api/auth/generateOTP',
                method: 'GET',
                params: { mail },
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
            query: ({ mail, code }) => ({
                url: 'api/auth/verifyOTP',
                method: 'GET',
                params: { mail, code },
            }),
        }),
        resetPass: builder.mutation({
            query: ({ mail, password, confirm }) => ({
                url: 'api/auth/resetPassword',
                method: 'PUT',
                body: { mail, password, confirm },
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
