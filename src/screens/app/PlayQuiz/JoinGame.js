//Library
import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { addPlayer } from 'src/slices/gamesSlice';
import { createPlayerResults } from 'src/slices/playerResultSlice';

//RTKQuery
import { useCreatePlayerResultMutation } from 'src/services/playerResultApi';
import { useAddPlayerMutation } from 'src/services/gameApi';

//component
import Header from 'src/components/auth/Header';

//Toast
import { Toast } from 'react-native-toast-message/lib/src/Toast';

//Sound
import { Audio } from 'expo-av';
import HeaderBack from 'src/components/auth/HeaderBack';

export default function JoinGame({ navigation }) {
    const focus = useIsFocused();
    const [pin, setPin] = useState();
    const [isPlayerAdded, setIsPlayerAdded] = useState(false);
    const [pinExist, setPinExist] = useState(true);

    const dispatch = useDispatch();

    const userData = useSelector((state) => state.auths?.authData);
    const socket = useSelector((state) => state.sockets.socket);

    const [InitPlayerResult, { data, isError, error, isLoading }] =
        useCreatePlayerResultMutation();

    const [InitAddPlayer] = useAddPlayerMutation();

    // useEffect(() => {
    //     if (data) {
    //         dispatch(createPlayerResults(data));
    //     }
    // }, [data]);

    const [sound, setSound] = useState();

    useEffect(() => {
        // Audio.setAudioModeAsync({
        //     allowsRecordingIOS: true,
        //     interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        //     playsInSilentModeIOS: true,
        //     shouldDuckAndroid: true,
        //     interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        // });

        const handlePlaySound = async () => {
            const { sound } = await Audio.Sound.createAsync(
                require('src/assets/video/quizzSound.mp3'),
            );

            setSound(sound);

            await sound.playAsync();
        };
        handlePlaySound();
    }, []);

    useEffect(() => {
        return sound
            ? () => {
                  sound.unloadAsync();
              }
            : () => {};
    }, [sound]);

    useEffect(() => {
        socket?.on('notify-host-leave-WattingRoom', (pin) => {
            Toast.show({
                type: 'error',
                text1: 'Host leave room',
                text2: 'You can not enter room',
                visibilityTime: 2500,
                topOffset: 60,
            });
        });
        return () => {
            socket.off('notify-host-leave-WattingRoom');
        };
    }, [socket]);

    useEffect(() => {
        socket?.on(
            'move-to-game-page',
            (
                gameId,
                gamePin,
                leaderboardID,
                length,
                playerList,
                pointsPerQuestion,
            ) => {
                navigation.navigate('PlayerScreen', {
                    gameId,
                    gamePin,
                    leaderboardID,
                    length,
                    playerList,
                    pointsPerQuestion,
                });
                setIsPlayerAdded(false);
                setPin();
            },
        );

        return () => {
            socket.off('move-to-game-page');
        };
    }, [socket, dispatch, navigation, userData?.data.user._id]);

    const result = async (message, playerId, gameId) => {
        if (message === 'correct') {
            const { data } = await InitAddPlayer({ gameId, playerId });
            dispatch(addPlayer(data));
            setPinExist(true);
            setIsPlayerAdded(true);
        } else {
            setPinExist(false);
        }
    };

    handleChangePin = (value) => {
        setPin(value);
        setPinExist(true);
    };

    const joinGame = () => {
        socket?.emit(
            'add-player',
            userData?.data?.user,
            socket.id,
            pin,
            (message, playerId, gameId) => {
                result(message, playerId, gameId);
            },
        );
    };

    const handleOutGame = () => {
        setIsPlayerAdded(false);
        socket.emit('studen-leave-JoinRoom', pin);
    };

    return (
        <SafeAreaView style={styles.SafeAreaView}>
            {!isPlayerAdded ? (
                <View style={styles.container}>
                    <View style={styles.viewHeader}>
                        <HeaderBack
                            title="Join Game"
                            handleBack={() => {
                                navigation.goBack();
                            }}
                        />
                    </View>
                    <View style={styles.viewTextInput}>
                        <TextInput
                            autoFocus={true}
                            placeholder="PIN"
                            style={{ fontSize: 50 }}
                            keyboardType="numeric"
                            onChangeText={(value) => handleChangePin(value)}
                        />
                    </View>
                    <View
                        style={{ width: '60%', alignItems: 'center', gap: 10 }}
                    >
                        {!pinExist && (
                            <Text
                                style={{
                                    color: 'red',
                                    fontSize: 20,
                                    fontWeight: 700,
                                }}
                            >
                                Pin doesn not exist
                            </Text>
                        )}
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
                </View>
            ) : (
                <View style={styles.loading}>
                    <View style={styles.viewHeader}>
                        <HeaderBack
                            title="Join Game"
                            handleBack={() => {
                                handleOutGame();
                                navigation.goBack();
                            }}
                        />
                    </View>
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
            <Toast />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    SafeAreaView: {
        width: '100%',
        height: '100%',
    },

    viewHeader: {
        width: '90%',
        alignSelf: 'center',
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
        width: '100%',
        backgroundColor: '#03C988',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
});
