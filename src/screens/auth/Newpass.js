//Library
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';

//RTK Query
import { useResetPassMutation } from 'src/services/authApi';

//validate
import { RequirePassword } from 'src/validate/auth/Resgister';

//Component
import Button from 'src/components/auth/Button';
import Header from 'src/components/auth/Header';
import HeaderBack from 'src/components/auth/HeaderBack';
import FormTextInput from 'src/components/auth/Input';

//icons
import { MaterialIcons } from '@expo/vector-icons';

const Init = { newPass: '', confirmNewPass: '' };

export default function Newpass({ navigation, ...props }) {
    const [formData, setFormData] = useState(Init);
    const [requirePasswordError, setRequirePasswordError] = useState(false);
    const [confirmError, setConfirmError] = useState(false);
    const [noClick, setNoClick] = useState(true);

    const mail = props.route.params;

    const handleChange = (e, name) => {
        const value = e.nativeEvent.text;
        setConfirmError(false);
        setFormData({ ...formData, [name]: value });
        if (name === 'newPass') {
            RequirePassword(value, setRequirePasswordError);
        }
    };

    const [newPass, { data, isError, isLoading }] = useResetPassMutation();

    useEffect(() => {
        if (
            !formData.newPass ||
            !formData.confirmNewPass ||
            requirePasswordError
        ) {
            setNoClick(true);
        } else {
            setNoClick(false);
        }
    }, [formData]);

    useEffect(() => {
        if (data) {
            const letter = {
                title: 'Successfully!',
                text: 'Change Password Successfully! Now you can signIn with your new password',
            };
            navigation.navigate('LetterScreen', letter);
        }
        if (isError) {
            setConfirmError(true);
        }
    }, [data, isError]);

    const handleResetPassWord = () => {
        newPass({
            mail,
            password: formData.newPass,
            confirm: formData.confirmNewPass,
        });
    };

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.viewAll}>
                <HeaderBack
                    title="Reset Password"
                    handleBack={() => navigation.navigate('Reset')}
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
                {requirePasswordError && (
                    <Text style={{ color: 'red' }}>
                        (upper,lower,special,number,atleast 8)
                    </Text>
                )}

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

                {confirmError && (
                    <Text style={{ color: 'red' }}>
                        Confirm password Invalid
                    </Text>
                )}

                <Button
                    title="Reset Password"
                    onPress={handleResetPassWord}
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
