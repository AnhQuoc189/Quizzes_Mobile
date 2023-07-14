//Library
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

//redux
import { useDispatch } from 'react-redux';
import { upDated } from 'src/slices/authSlice';

//validate
import { RequirePassword } from 'src/validate/auth/Resgister';

//component
import Button from 'src/components/auth/Button';
import { useResetPassMutation } from 'src/services/authApi';
import HeaderBack from 'src/components/auth/HeaderBack';
import FormTextInput from 'src/components/auth/Input';

//icons
import { MaterialIcons } from '@expo/vector-icons';

const Init = { newPass: '', confirmNewPass: '' };

export default function ChangePass({ navigation, ...props }) {
    const dispatch = useDispatch();

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

    const [newPass, { data, isError, isLoading, error }] =
        useResetPassMutation();

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
            dispatch(upDated(data));
            Toast.show({
                type: 'success',
                text1: 'Change Email',
                text2: 'Successffully !',
                visibilityTime: 2500,
                topOffset: 60,
            });
        }
        if (isError) {
            console.log(error);
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
        <View style={styles.safeAreaView}>
            <View style={styles.viewAll}>
                {/* <Header
                    title="Change Password"
                    direct="Settings"
                    navigation={navigation}
                /> */}
                <View style={styles.viewHeader}>
                    <HeaderBack
                        title="Change Password"
                        handleBack={() => navigation.goBack()}
                    />
                </View>

                <View style={styles.textNode}>
                    <Text style={styles.text}>
                        Your new password must be different from previous used
                        password
                    </Text>
                </View>

                <FormTextInput
                    lable="New Password"
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
                    title="Change Password"
                    onPress={handleResetPassWord}
                    navigation={navigation}
                    click={noClick}
                    loading={isLoading}
                />
            </View>
            <Toast />
        </View>
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
    viewHeader: {
        width: '100%',
        alignSelf: 'center',
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
    text: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
    },
});
