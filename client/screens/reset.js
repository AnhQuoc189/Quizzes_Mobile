import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    TextInput,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Reset({ navigation }) {
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.viewContainer}>
                <View style={styles.header}>
                    <View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login')}
                        >
                            <AntDesign
                                name="arrowleft"
                                size={30}
                                color="black"
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.headerReset}>Reset Password</Text>
                </View>

                <View
                    style={{
                        width: '100%',
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
                <TouchableOpacity
                    onPress={() => navigation.navigate('Newpass')}
                >
                    <View style={styles.viewReset}>
                        <Text style={styles.textReset}>Reset Password</Text>
                    </View>
                </TouchableOpacity>
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
    },

    header: {
        flexDirection: 'row',
        marginTop: 60,
        alignItems: 'center',
        gap: 30,
    },

    headerReset: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 700,
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
