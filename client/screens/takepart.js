import React from 'react';
import background from '../assets/images/background.png';
import {
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Image,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import connect from '../assets/images/connect.png';

export default function TakePart({ navigation }) {
    return (
        <SafeAreaView>
            <ImageBackground style={styles.backgroundImage} source={background}>
                <View style={styles.viewImage}>
                    <Image source={connect} />
                </View>

                <View style={styles.optionSign}>
                    <View style={styles.optionContainer}>
                        <Text style={styles.textTakenpart}>
                            Take part in challenges with friends
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Register')}
                        >
                            <View
                                style={{
                                    width: 280,
                                    height: 50,
                                    backgroundColor: '#865DFF',
                                    borderRadius: 20,
                                    justifyContent: 'center',
                                }}
                            >
                                <Text style={styles.textSignUp}>SignUp</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row' }}>
                            <Text>Already have an account? </Text>
                            <TouchableOpacity
                                onPressIn={() => navigation.navigate('Login')}
                            >
                                <Text
                                    style={{
                                        color: '#865DFF',
                                        fontWeight: 700,
                                    }}
                                >
                                    Login
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    viewImage: {
        marginTop: 100,
    },

    optionSign: {
        backgroundColor: 'white',
        width: '90%',
        height: '30%',
        borderRadius: 15,
    },

    optionContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    textTakenpart: {
        fontSize: 26,
        fontWeight: 800,
        textAlign: 'center',
    },

    viewSignUp: {
        width: '85%',
        height: '25%',
        backgroundColor: '#865DFF',
        borderRadius: 20,
        justifyContent: 'center',
    },

    textSignUp: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 600,
    },
});
