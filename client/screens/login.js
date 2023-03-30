import React, { useState } from 'react';
import {
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import google from '../assets/images/google.png';
import Divider from 'react-native-divider';

export default function Login({ navigation }) {
    const [showPass, setShowPass] = useState(false);
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.header}>
                <View style={{ left: 20 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('TakePart')}
                    >
                        <AntDesign name="arrowleft" size={30} color="black" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.headerLogin}>Login</Text>
            </View>
            <View style={styles.formSignUp}>
                <View style={styles.formItem}>
                    <Text style={{ left: 25 }}>Email Address</Text>
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

                <View style={styles.formItem}>
                    <Text style={{ left: 25 }}>Password</Text>
                    <View style={styles.viewItem}>
                        <View style={styles.viewTextInput}>
                            <MaterialIcons
                                name="lock-outline"
                                size={24}
                                color="#865DFF"
                            />
                            <TextInput
                                style={{ width: '70%' }}
                                placeholder="Your password"
                                secureTextEntry={!showPass ? true : false}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPass(!showPass)}
                            >
                                <MaterialCommunityIcons
                                    name={
                                        !showPass
                                            ? 'eye-off-outline'
                                            : 'eye-outline'
                                    }
                                    size={24}
                                    color="#865DFF"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.viewFormfooter}>
                    <TouchableOpacity>
                        <View style={styles.viewLogin}>
                            <Text style={styles.textLogin}>Login</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.viewForgot}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Reset')}
                        >
                            <Text style={styles.textForgot}>
                                Forgot password?
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.viewNote}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.textNoteGray}>
                                By continuing, you agree to the
                            </Text>
                            <Text style={styles.textNoteBlack}>
                                Term of Services
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.textNoteGray}>&</Text>
                            <Text style={styles.textNoteBlack}>
                                Privcacy Policy
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            <Divider borderColor="gray" color="gray" orientation="center">
                OR
            </Divider>

            <View style={styles.viewLoginAnother}>
                <TouchableOpacity>
                    <View style={styles.viewLoginwithFB}>
                        <MaterialCommunityIcons
                            name="facebook"
                            size={24}
                            color="white"
                        />

                        <Text style={styles.textFB}>Login with Facebook</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.viewLoginwithGG}>
                        <Image source={google} />

                        <Text style={styles.textGG}>Login with Google</Text>
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
        width: '100%',
        height: '100%',
        gap: 10,
    },

    header: {
        flexDirection: 'row',
        marginTop: 60,
        alignItems: 'center',
        gap: 120,
    },

    headerLogin: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 700,
    },

    formSignUp: {
        flexDirection: 'column',
        marginTop: 20,
        gap: 20,
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
        width: 310,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },

    viewFormfooter: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },

    viewLogin: {
        backgroundColor: '#865DFF',
        width: 310,
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textLogin: {
        color: 'white',
        fontWeight: 800,
    },

    viewForgot: {
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textForgot: {
        color: '#865DFF',
        fontWeight: 700,
    },

    viewNote: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textNoteGray: {
        fontSize: 14,
        color: 'gray',
    },

    textNoteBlack: {
        textAlign: 'center',
        fontSize: 14,
        color: '#000',
        fontWeight: '500',
    },

    viewLoginAnother: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        gap: 20,
    },

    viewLoginwithFB: {
        backgroundColor: '#2F58CD',
        width: 310,
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
    },

    textFB: {
        color: 'white',
        fontWeight: 800,
    },

    viewLoginwithGG: {
        backgroundColor: 'white',
        width: 310,
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
    },

    textGG: {
        color: 'black',
        fontWeight: 800,
    },
});
