//Library
import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';

//component
import Header from 'src/components/auth/Header';
import HeaderBack from 'src/components/auth/HeaderBack';

export default function LetterScreen({ navigation, ...props }) {
    const letter = props.route.params;
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.viewContainer}>
                {/* <Header
                    title={letter.title}
                    direct="Login"
                    navigation={navigation}
                /> */}
                <HeaderBack
                    title={letter.title}
                    handleBack={() => navigation.navigate('Login')}
                />

                <View style={styles.viewTextInput}>
                    <Text style={{ fontSize: 16 }}>{letter.text}</Text>
                </View>
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
