//Library
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView } from 'react-native';

//RTKQuery
import {
    useRegisterMailOtpQuery,
    useVerifyOtpMutation,
} from 'src/services/authApi';

//component
import Header from 'src/components/auth/Header';
import Button from 'src/components/auth/Button';
import ResendOTP from 'src/components/auth/ResendOTP';

const InitOtp = { 1: '', 2: '', 3: '', 4: '' };

export default function SendOTP({ navigation, ...props }) {
    const firstInput = useRef();
    const secondInput = useRef();
    const thirdInput = useRef();
    const fourthInput = useRef();
    const [OTP, setOTP] = useState(InitOtp);
    const [time, setTime] = useState(60);
    const [noClick, setNoClick] = useState(true);
    const [optValid, setOtpvalid] = useState(false);
    const timerId = useRef();

    const mail = props.route.params.userEmail;
    const username = props.route.params.userName;

    const OtpMail = props.route.params;
    useRegisterMailOtpQuery(OtpMail);

    const [verifyOTP, { data, isError, error, isLoading }] =
        useVerifyOtpMutation();

    useEffect(() => {
        if (data) {
            navigation.navigate('Newpass', mail);
        } else {
            const errorText = error?.data?.message;
            switch (errorText) {
                case 'Invalid OTP':
                    setOtpvalid(true);
                    break;
                default:
                    break;
            }
        }
    }, [data, isError]);

    useEffect(() => {
        timerId.current = setTimeout(() => {
            setTime((prev) => prev - 1);
        }, 1000);

        if (time === 0) {
            setOtpvalid(false);
            setNoClick(true);
        } else {
            setNoClick(false);
        }

        if (time === 0) {
            clearTimeout(timerId.current);
        }
    }, [time]);

    const setTimeStart = () => {
        setOtpvalid(false);
        setOTP(InitOtp);
        clearTimeout(timerId.current);
        setTime(60);
    };

    const handelSubmitOTP = () => {
        const OTPnumber = OTP[1] + OTP[2] + OTP[3] + OTP[4];
        if (!noClick) {
            verifyOTP({ mail, code: OTPnumber });
        }
    };

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View styles={(width = '90%')}>
                <View style={styles.viewAll}>
                    <Header
                        title="OTP Vertification"
                        direct="Reset"
                        navigation={navigation}
                    />

                    <View style={styles.viewText}>
                        <Text>
                            We will send you a one time password on this
                        </Text>
                        <Text style={{ fontWeight: 700 }}>Email Address</Text>
                    </View>

                    <View style={styles.otpContainer}>
                        <View style={styles.otpBox}>
                            <TextInput
                                style={styles.otpText}
                                keyboardType="number-pad"
                                maxLength={1}
                                ref={firstInput}
                                onChangeText={(text) => {
                                    setOTP({ ...OTP, 1: text });
                                    // setOTP([...OTP  ,OTP[0]:text])
                                    setOtpvalid(false);
                                    text && secondInput.current.focus();
                                }}
                            />
                        </View>
                        <View style={styles.otpBox}>
                            <TextInput
                                style={styles.otpText}
                                keyboardType="number-pad"
                                maxLength={1}
                                ref={secondInput}
                                onChangeText={(text) => {
                                    setOTP({ ...OTP, 2: text });
                                    setOtpvalid(false);
                                    text && thirdInput.current.focus();
                                }}
                            />
                        </View>
                        <View style={styles.otpBox}>
                            <TextInput
                                style={styles.otpText}
                                keyboardType="number-pad"
                                maxLength={1}
                                ref={thirdInput}
                                onChangeText={(text) => {
                                    setOTP({ ...OTP, 3: text });
                                    setOtpvalid(false);
                                    text && fourthInput.current.focus();
                                }}
                            />
                        </View>
                        <View style={styles.otpBox}>
                            <TextInput
                                style={styles.otpText}
                                keyboardType="number-pad"
                                maxLength={1}
                                ref={fourthInput}
                                onChangeText={(text) => {
                                    setOTP({ ...OTP, 4: text });
                                    setOtpvalid(false);
                                }}
                            />
                        </View>
                    </View>

                    <Text style={{ marginTop: -20 }}>
                        {time === 60
                            ? '1:00'
                            : time >= 10
                            ? `0:${time}`
                            : `0:0${time}`}
                    </Text>
                    <ResendOTP
                        navigation={navigation}
                        userEmail={mail}
                        userName={username}
                        setTime={setTimeStart}
                    />

                    {optValid && (
                        <Text style={{ color: 'red' }}>OTP Invalid</Text>
                    )}

                    <Button
                        title="Submit"
                        navigation={navigation}
                        onPress={handelSubmitOTP}
                        click={noClick}
                        loading={isLoading}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: '#E3DFFD',
        display: 'flex',
        width: '100%',
        height: '100%',
        gap: 10,
        alignItems: 'center',
    },

    viewAll: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },

    viewText: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    otpContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 20,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 20,
    },

    otpBox: {
        borderRadius: 5,
        borderColor: '#865DFF',
        borderWidth: 0.5,
    },
    otpText: {
        fontSize: 25,
        color: '#0E122B',
        padding: 0,
        textAlign: 'center',
        paddingHorizontal: 18,
        paddingVertical: 10,
    },

    viewSendOTP: {
        flexDirection: 'row',
    },

    textSendOTP: {
        color: '#865DFF',
        fontWeight: 700,
    },

    viewSubmit: {
        width: 100,
        backgroundColor: '#865DFF',
        height: 50,
    },
});
