import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as api from '../api';

export const loginUser = createAsyncThunk(
    'loginUser',
    async ({ formData, navigation, handleLoading }) => {
        try {
            const { data } = await api.login(formData);
            if (data) {
                await handleLoading(true);
                setTimeout(() => {
                    navigation.navigate('AppNavigator');
                    handleLoading(false);
                }, 3000);
            }
            return data;
        } catch (error) {
            const data = error.response.data.message;
            switch (data) {
                case 'All fields are mandatory!':
                    console.log('Vui long nhap day du thong tin');

                    break;
                case 'Account not exist':
                    console.log('Khong tim thay user');
                    break;
                case 'Wrong password':
                    console.log('Sai mat khau roi');
                    break;
                case 'Not Verify':
                    console.log('Vui long vao mail de xac nhan');
                    const letter = {
                        title: 'SignIn Falure!',
                        text: ' Please check your mail to verify-account',
                    };
                    setTimeout(() => {
                        navigation.navigate('LetterScreen', letter);
                    }, 1500);
                    break;

                default:
                    break;
            }
            return data;
        }
    },
);

export const regiserUser = createAsyncThunk(
    'regiserUser',
    async ({ formData, navigation }) => {
        try {
            const { data } = await api.register(formData);
            console.log(data);
            if (data) {
                const letter = {
                    title: 'Congratulations!',
                    text: 'SignUp Successfully! Please check your mail to verify-account',
                };
                setTimeout(() => {
                    navigation.navigate('LetterScreen', letter);
                }, 1500);
            }
        } catch (error) {
            const data = error.response.data.message;
            console.log(data);

            switch (data) {
                case 'All fields are mandatory!':
                    console.log('Vui long nhap day du thong tin');
                    break;
                case 'Wrong email':
                    console.log('Email k dung');
                    break;
                case 'UserName already exists':
                    console.log('Ton tai userName roi thang ngu');
                    break;
                case 'Email already exists':
                    console.log('Ton tai email roi thang ngu');
                    break;
                default:
                    break;
            }
        }
    },
);

export const generateOTP = createAsyncThunk(
    'generateOTP',
    async ({ email, navigation }) => {
        try {
            const { data } = await api.generateOTP({ params: { email } });
            if (data) {
                const text = `Your Password Recovery OTP is ${data.code}. Verify and recover your password`;
                setTimeout(() => {
                    navigation.navigate('SendOTP', email);
                }, 1500);
                await api.registerMail({
                    userName: data.userName,
                    userEmail: email,
                    text,
                    subject: 'Password Recovery OTP',
                });
            }
        } catch (error) {
            const data = error.response.data.message;

            switch (data) {
                case 'email Empty':
                    console.log('please enter email');
                    break;
                case 'email does not exists':
                    console.log('Email Khong ton tai thang ngu');
                    break;
                default:
                    break;
            }
        }
    },
);

export const verifyOTP = createAsyncThunk(
    'verifyOTP',
    async ({ email, code, navigation }) => {
        try {
            const { data } = await api.verifyOTP({
                params: { email, code },
            });

            if (data) {
                setTimeout(() => {
                    navigation.navigate('Newpass', email);
                }, 1500);
            }
        } catch (error) {
            const data = error.response.data.message;
            switch (data) {
                case 'Invalid OTP':
                    console.log('Sai OTP roi thang ngu');
                    break;
                default:
                    break;
            }
        }
    },
);

export const resetPassword = createAsyncThunk(
    'resetPassword',
    async ({ email, password, navigation }) => {
        try {
            const { data } = await api.resetPassWord({ email, password });
            if (data === 'Change Password successfully!') {
                const letter = {
                    title: 'Successfully!',
                    text: 'Change Password Successfully! Now you can signIn with your new password',
                };
                setTimeout(() => {
                    navigation.navigate('LetterScreen', letter);
                }, 1500);
            }
        } catch (error) {
            console.log(error);
        }
    },
);

const auhtSlice = createSlice({
    name: 'auth',
    initialState: { authData: null },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            const SaveStore = async () => {
                await AsyncStorage.setItem(
                    'profile',
                    JSON.stringify(action?.payload),
                );
            };
            SaveStore();
        });
    },
});

export const authAction = auhtSlice.actions;
export default auhtSlice.reducer;
