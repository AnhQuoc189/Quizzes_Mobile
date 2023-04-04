import React, { useState } from 'react';
import {
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    ScrollView,
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import google from '../assets/images/google.png';
import Divider from 'react-native-divider';

import Header from '../components/auth/header';
import Button from '../components/auth/button';
import FormTextInput from '../components/auth/input';
export default function Login({ navigation }) {


    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView style={{width:'90%'}} showsVerticalScrollIndicator={false}>       
                <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>  
                    <Header title='Login' direct='Onboard' navigation={navigation}/>
                    <View style={styles.formSignUp}>
                        <FormTextInput lable='Email Addresss'/>
                        <FormTextInput lable='Password' eye={true}/>

                        <View style={styles.viewFormfooter}>

                            <Button title='Login'  navigation={navigation}/>
                            

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
                </View>
            </ScrollView>
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
        alignItems:'center'
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
        width: '100%',
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
