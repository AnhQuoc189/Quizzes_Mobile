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
import { MaterialIcons } from '@expo/vector-icons';

export default function Newpass({ navigation }) {
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.viewAll}>
                <View style={styles.header}>
                    <View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Reset')}
                        >
                            <AntDesign
                                name="arrowleft"
                                size={30}
                                color="black"
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.headerReset}>New Password</Text>
                </View>

                <View style={styles.textNode}>
                    <Text style={{ fontSize: 16, color: 'gray' }}>
                        Your new password must be different from previous used
                        password
                    </Text>
                </View>

                <View style={styles.formItem}>
                    <Text>Password</Text>
                    <View style={styles.viewItem}>
                        <View style={styles.viewTextInput}>
                            <MaterialIcons
                                name="lock-outline"
                                size={24}
                                color="#865DFF"
                            />
                            <TextInput
                                style={{ width: '70%' }}
                                placeholder="Your new password"
                                secureTextEntry={true}
                            />
                            <TouchableOpacity>
                                <MaterialCommunityIcons
                                    name="eye-off-outline"
                                    size={24}
                                    color="#865DFF"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.formItem}>
                    <Text>confirm Password</Text>
                    <View style={styles.viewItem}>
                        <View style={styles.viewTextInput}>
                            <MaterialIcons
                                name="lock-outline"
                                size={24}
                                color="#865DFF"
                            />
                            <TextInput
                                style={{ width: '70%' }}
                                placeholder="Confirm your password"
                                secureTextEntry={true}
                            />
                            <TouchableOpacity>
                                <MaterialCommunityIcons
                                    name="eye-off-outline"
                                    size={24}
                                    color="#865DFF"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <TouchableOpacity>
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

    viewAll: {
        width: '90%',
        gap: 20,
    },

    header: {
        flexDirection: 'row',
        marginTop: 60,
        alignItems: 'center',
        gap: 30,
    },

    textNode: {
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
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
