import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';

import { useResetPassMutation } from 'src/services/authApi';

import Button from 'src/components/auth/Button';
import Header from 'src/components/auth/Header';
import FormTextInput from 'src/components/auth/Input';
import { MaterialIcons } from '@expo/vector-icons';

const Init = { newPass: '', confirmNewPass: '' };

export default function Newpass({ navigation, ...props }) {
    const [formData, setFormData] = useState(Init);

    const email = props.route.params;
    console.log(email);
    const handleChange = (e, name) => {
        setFormData({ ...formData, [name]: e.nativeEvent.text });
    };

    const [newPass, { data, isError, error }] = useResetPassMutation();

    useEffect(() => {
        if (data) {
            const letter = {
                title: 'Successfully!',
                text: 'Change Password Successfully! Now you can signIn with your new password',
            };
            setTimeout(() => {
                navigation.navigate('LetterScreen', letter);
            }, 1500);
        } else {
            console.log('loi');
        }
    }, [data, isError]);

    const handleResetPassWord = () => {
        if (formData.newPass === formData.confirmNewPass) {
            let password = formData.newPass;
            newPass({ email, password });
        } else {
            console.log('Sai roi kia thang ngu');
        }
    };

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.viewAll}>
                <Header
                    title="Reset Password"
                    direct="SendOTP"
                    navigation={navigation}
                />

                <View style={styles.textNode}>
                    <Text style={{ fontSize: 16, color: 'gray' }}>
                        Your new password must be different from previous used
                        password
                    </Text>
                </View>

                <FormTextInput
                    lable="Password"
                    place="New Password"
                    icon={
                        <MaterialIcons
                            name="lock-outline"
                            size={24}
                            color="#865DFF"
                        />
                    }
                    value={formData.newPass}
                    handleChange={(e) => handleChange(e, 'newPass')}
                />

                <FormTextInput
                    lable="Confirm Password"
                    place="Confirm Password"
                    icon={
                        <MaterialIcons
                            name="lock-outline"
                            size={24}
                            color="#865DFF"
                        />
                    }
                    value={formData.confirmNewPass}
                    handleChange={(e) => handleChange(e, 'confirmNewPass')}
                />

                <Button
                    title="Reset Password"
                    onPress={handleResetPassWord}
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

    viewAll: {
        width: '90%',
        gap: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textNode: {
        alignSelf: 'center',
        justifyContent: 'center',
    },
});
