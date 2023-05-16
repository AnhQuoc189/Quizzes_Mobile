import React, { useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import Header from 'src/components/auth/Header';
import { ActivityIndicator } from 'react-native';

export default function JoinGame({ navigation }) {
    const [pin, setPin] = useState();
    const [isPlayerAdded, setIsPlayerAdded] = useState(false);

    const joinGame = () => {
        setIsPlayerAdded(true);
        setTimeout(() => {
            navigation.navigate('PlayerScreen');
        }, 5000);
    };

    return (
        <SafeAreaView style={styles.SafeAreaView}>
            {!isPlayerAdded ? (
                <View style={styles.container}>
                    <Header
                        title="Join Game"
                        direct="Home"
                        navigation={navigation}
                    />
                    <View style={styles.viewTextInput}>
                        <TextInput
                            autoFocus={true}
                            placeholder="PIN"
                            style={{ fontSize: 50 }}
                            keyboardType="numeric"
                            onChangeText={(value) => setPin(value)}
                        />
                    </View>
                    {pin && (
                        <TouchableOpacity
                            style={styles.viewEnter}
                            onPress={joinGame}
                        >
                            <View>
                                <Text style={styles.textEnter}>Enter</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            ) : (
                <View style={styles.loading}>
                    <Header
                        title="Join Game"
                        direct="Home"
                        navigation={navigation}
                    />
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 600 }}>
                            You joined the game
                        </Text>
                        <Text style={{ fontSize: 20, fontWeight: 600 }}>
                            Waiting on a host to start the game
                        </Text>
                        <ActivityIndicator size="large" color="#fff" />
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    SafeAreaView: {
        width: '100%',
        height: '100%',
    },

    container: {
        backgroundColor: '#865DFF',
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        gap: 50,
    },

    loading: {
        backgroundColor: '#865DFF',
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        gap: 150,
    },

    viewTextInput: {
        height: '20%',
        justifyContent: 'center',
    },

    textEnter: {
        fontWeight: 800,
        fontSize: 20,
    },

    viewEnter: {
        height: 60,
        width: '60%',
        backgroundColor: '#03C988',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
});
