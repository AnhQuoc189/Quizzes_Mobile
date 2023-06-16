//Librari
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

//RTKQuery
import { useGenerateOtpMutation } from 'src/services/authApi';

export default function ResendOTP({ navigation, ...props }) {
    const userEmail = props.userEmail;
    const userName = props.userName;

    const [generateOTP, { data, isError, error }] = useGenerateOtpMutation();

    useEffect(() => {
        if (data) {
            const infoEmail = {
                text: `Your Password Recovery OTP is ${data.code}. Verify and recover your password`,
                userName,
                userEmail,
                subject: 'Password Recovery OTP',
            };
            navigation.navigate('SendOTP', infoEmail);
            props.setTime();
        }
    }, [data, isError]);

    const handleResend = () => {
        generateOTP(userEmail);
    };

    return (
        <View style={styles.viewSendOTP}>
            <Text>Do not send OTP ? </Text>
            <TouchableOpacity onPress={handleResend}>
                <Text style={styles.textSendOTP}>Send OTP</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    viewSendOTP: {
        flexDirection: 'row',
    },

    textSendOTP: {
        color: '#865DFF',
        fontWeight: 700,
    },
});
