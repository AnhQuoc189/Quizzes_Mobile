import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

//icons
import { MaterialCommunityIcons } from '@expo/vector-icons';

//RTK Query
import { useGenerateOtpMutation } from 'src/services/authApi';

//validate
import { EmailReset } from 'src/validate/auth/Resgister';

//component
import Button from 'src/components/auth/Button';
import Header from 'src/components/auth/Header';
import HeaderBack from 'src/components/auth/HeaderBack';
import FormTextInput from 'src/components/auth/Input';

export default function Reset({ navigation }) {
    const [mail, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailFormatError, setEmailFormaError] = useState(false);
    const [noClick, setNoClick] = useState(true);

    const [generateOTP, { data, isError, error, isLoading }] =
        useGenerateOtpMutation();

    useEffect(() => {
        if (!mail) {
            setNoClick(true);
        } else {
            setNoClick(false);
        }
    }, [mail]);

    useEffect(() => {
        if (data) {
            const infoEmail = {
                text: `Your Password Recovery OTP is ${data.code}. Verify and recover your password`,
                userName: data.userName,
                userEmail: mail,
                subject: 'Password Recovery OTP',
            };
            navigation.navigate('SendOTP', infoEmail);
        }
        if (isError) {
            const errorText = error?.data?.message;
            switch (errorText) {
                case 'email does not exists':
                    setEmailError(true);
                    setEmailFormaError(false);
                    break;
                default:
                    break;
            }
        }
    }, [data, isError]);

    const handleChange = (e, name) => {
        const value = e.nativeEvent.text;
        setEmail(value);
        setEmailError(false);
        EmailReset(value, setEmailFormaError);
    };

    const handleReset = () => {
        if (!noClick) {
            generateOTP(mail);
        }
    };

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.viewContainer}>
                <HeaderBack
                    title="Reset Password"
                    handleBack={() => navigation.goBack()}
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
                    value={mail}
                    handleChange={(e) => handleChange(e, 'mail')}
                />
                {emailError && (
                    <Text style={{ color: 'red' }}>Email doesn' not exist</Text>
                )}

                {emailFormatError && (
                    <Text style={{ color: 'red' }}>
                        Example:binbin18092003@gmail.com
                    </Text>
                )}

                <Button
                    title="Reset Password"
                    // direct={'Newpass'}
                    onPress={handleReset}
                    navigation={navigation}
                    click={noClick}
                    loading={isLoading}
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
