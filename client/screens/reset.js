import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    TextInput,
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import Button from '../components/auth/button';
import Header from '../components/auth/header';

export default function Reset({ navigation }) {
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.viewContainer}>
                <Header
                    title="Reset Password"
                    direct="Login"
                    navigation={navigation}
                />

                <View
                    style={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text style={{ fontSize: 16 }}>
                        Enter your email and we will send you a link to reset
                        your password.
                    </Text>
                </View>

                <View style={styles.formItem}>
                    <Text>Email Address</Text>
                    <View style={styles.viewItem}>
                        <View style={styles.viewTextInput}>
                            <MaterialCommunityIcons
                                name="email-outline"
                                size={24}
                                color="#865DFF"
                            />
                            <TextInput
                                style={{ width: '80%' }}
                                placeholder="Your email address"
                            />
                        </View>
                    </View>
                </View>
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

    formItem: {
        flexDirection: 'column',
        gap: 10,
    },

    viewItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    viewTextInput: {
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },

    viewReset: {
        backgroundColor: '#865DFF',
        width: '100%',
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100,
    },

    textReset: {
        color: 'white',
        fontWeight: 800,
    },
});
