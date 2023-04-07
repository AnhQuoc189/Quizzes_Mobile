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
import { MaterialIcons } from '@expo/vector-icons';
export default function Newpass({ navigation }) {
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.viewAll}>
                <Header
                    title="Reset Password"
                    direct="Login"
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
                    place="Your new Password"
                    icon={
                        <MaterialIcons
                            name="lock-outline"
                            size={24}
                            color="#865DFF"
                        />
                    }
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
                />

                <Button
                    title="Reset Password"
                    direct="Settings"
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
