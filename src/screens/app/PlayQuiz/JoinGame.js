import React, { useState, useEffect } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import Header from 'src/components/auth/Header';
import { ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useCreatePlayerResultMutation } from 'src/services/playerResultApi';
import { createPlayerResults } from 'src/slices/playerResultSlice';
import { useAddPlayerMutation } from 'src/services/gameApi';
import { addPlayer } from 'src/slices/gamesSlice';

export default function JoinGame({ navigation }) {
    const [pin, setPin] = useState();
    const [isPlayerAdded, setIsPlayerAdded] = useState(false);
    const [pinExist, setPinExist] = useState(true);

    const dispatch = useDispatch();

    const userData = useSelector((state) => state.auths?.authData);
    const socket = useSelector((state) => state.sockets.socket);

    const [InitPlayerResult, { data, isError, error, isLoading }] =
        useCreatePlayerResultMutation();

    const [InitAddPlayer] = useAddPlayerMutation();

    useEffect(() => {
        if (data) {
            dispatch(createPlayerResults(data));
        }
    }, [data]);

    useEffect(() => {
        socket?.on(
            'move-to-game-page',
            (gameId, gamePin, leaderboardID, quizData) => {
                // console.log(gameId, gamePin);

                // dispatch(
                //     createPlayerResult({
                //         playerId: user.result._id,
                //         gameId: gameId,
                //         score: 0,
                //         answers: [],
                //     }),
                // );
                // history(`/games/player/${gameId}`, {
                //     state: { gamePin, leaderboardID },
                // });
                navigation.navigate('PlayerScreen', {
                    gameId,
                    gamePin,
                    leaderboardID,
                    quizData,
                });
                // InitPlayerResult({
                //     playerId: userData.data.user._id,
                //     gameId: gameId,
                //     score: 0,
                //     answers: [],
                // });
            },
        );
    }, [socket, dispatch, navigation, userData.data.user._id]);

    const result = async (message, playerId, gameId) => {
        if (message === 'correct') {
            // dispatch(addPlayer(gameId, playerId));
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
        // setIsPlayerAdded(true);
        // setTimeout(() => {
        //     navigation.navigate('PlayerScreen');
        // }, 5000);
        socket?.emit(
            'add-player',
            userData.data.user,
            socket.id,
            pin,
            (message, playerId, gameId) => {
                result(message, playerId, gameId);
            },
        );
        // console.log(userData);
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
                            onChangeText={(value) => handleChangePin(value)}
                        />
                    </View>
                    <View
                        style={{ width: '60%', alignItems: 'center', gap: 10 }}
                    >
                        {!pinExist && (
                            <Text style={{ color: 'red' }}>
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
        width: '100%',
        backgroundColor: '#03C988',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
});
