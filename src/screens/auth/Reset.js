import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { useGenerateOtpMutation } from 'src/services/authApi';

import Button from 'src/components/auth/Button';
import Header from 'src/components/auth/Header';
import FormTextInput from 'src/components/auth/Input';

export default function Reset({ navigation }) {
    const [email, setEmail] = useState('');

    const [generateOTP, { data, isError, error }] = useGenerateOtpMutation();

    useEffect(() => {
        if (data) {
            const text = `Your Password Recovery OTP is ${data.code}. Verify and recover your password`;
            const userName = data.userName;
            const userEmail = email;
            const subject = 'Password Recovery OTP';
            setTimeout(() => {
                navigation.navigate('SendOTP', {
                    userName,
                    userEmail,
                    text,
                    subject,
                });
            }, 1500);
        }
        if (isError) {
            const errorText = error?.data?.message;
            switch (errorText) {
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
    }, [data, isError]);

    const handleReset = () => {
        // dispatch(generateOTP({ email, navigation }));
        generateOTP(email);
    };

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.viewContainer}>
                <Header
                    title="Reset Password"
                    direct="Login"
                    navigation={navigation}
                />

                <View style={styles.viewTextInput}>
                    <Text style={{ fontSize: 16 }}>
                        Enter your email and we will send you a link to reset
                        your password.
                    </Text>
                </View>

                <FormTextInput
                    lable="Email Address"
                    place="Your email address"
                    icon={
                        <MaterialCommunityIcons
                            name="email-outline"
                            size={24}
                            color="#865DFF"
                        />
                    }
                    value={email}
                    handleChange={(e) => setEmail(e.nativeEvent.text)}
                />

                <Button
                    title="Reset Password"
                    // direct={'Newpass'}
                    onPress={handleReset}
                    navigation={navigation}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: '#E3DFFD',
        display: 'flex',
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },

    viewContainer: {
        width: '90%',
        gap: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    viewTextInput: {
        alignSelf: 'center',
        justifyContent: 'center',
    },
});
