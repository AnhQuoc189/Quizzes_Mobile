import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    TextInput,
} from 'react-native';

import Button from '../../components/auth/Button';
import Header from '../../components/auth/Header';
import FormTextInput from '../../components/auth/Input';

import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Reset({ navigation }) {
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
                />

                <Button
                    title="Reset Password"
                    direct={'Newpass'}
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
