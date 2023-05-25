import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useState } from 'react';

import { colors } from 'src/styles/color';
import { bgColors } from 'src/styles/color';

import BoxQuestion from './BoxQuestion';
import { Button } from './creator';
import { FlatList } from 'react-native';

import { useCreateGameMutation } from 'src/services/gameApi';
import { useCreateLeaderboardMutation } from 'src/services/leaderboardApi';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { createGame } from 'src/slices/gamesSlice';
import { createLeaderboard } from 'src/slices/leaderboardSlice';

const QuizInfo = ({
    isMine,
    category,
    numberQuestions,
    title,
    discription,
    isCreator,
    questionList,
    navigation,
    quizData,
}) => {
    const dispatch = useDispatch();
    const [InitGame] = useCreateGameMutation();

    const [InitLeaderboard] = useCreateLeaderboardMutation();

    const socket = useSelector((state) => state.sockets.socket);

    const StartGame = async () => {
        // navigation.navigate('HostScreen', quizData);
        // console.log(quizData);
        if (questionsData.length === 0) {
            console.log('Lam gi co quiz ma choi ha thang ngu');
        } else {
            let gameData = {
                hostId: quizData.creatorId,
                quizId: quizData._id,
                isLive: true,
                pin: String(Math.floor(Math.random() * 9000) + 1000),
            };
            const newGameData = await InitGame(gameData);
            const newGame = newGameData.data;
            dispatch(createGame(newGame));

            let leaderboardData = {
                gameId: newGame._id,
                playerResultList: [],
                pin: newGame.pin,
            };
            const newLeaderboardData = await InitLeaderboard(leaderboardData);
            const newLeaderboard = newLeaderboardData.data;
            dispatch(createLeaderboard(newLeaderboard));

            navigation.navigate('HostScreen', {
                quizData,
                newGame,
                newLeaderboard,
            });

            socket.emit('init-game', newGame, newLeaderboard);
        }
    };

    const questionsData = quizData.questionList;

    return (
        <View style={styles.container}>
            {/* First section */}
            <View style={styles.fisrtSection}>
                <View>
                    {/* category of quiz and number */}
                    <View style={styles.editBox}>
                        <View style={styles.categoryBox}>
                            <MaterialIcons
                                name="category"
                                size={12}
                                color={colors.primary}
                            />
                            <Text style={styles.textCategory}>
                                {category} . {questionsData.length} QUESTIONS
                            </Text>
                        </View>

                        {isMine && (
                            <TouchableOpacity style={{ padding: 5 }}>
                                <Feather name="edit" size={24} color="gray" />
                            </TouchableOpacity>
                        )}
                    </View>
                    {/* Name of quiz */}
                    <Text style={styles.textHeader}>{title}</Text>
                    {/* discription */}
                    <Text style={styles.textDiscription}>{discription}</Text>
                </View>
            </View>

            {/* second section */}
            <View style={styles.secondSection}>
                <View style={styles.editBox}>
                    <View
                        style={{
                            ...styles.categoryBox,
                            backgroundColor: 'transparent',
                        }}
                    >
                        <Text style={styles.textHeader}>Questions</Text>

                        <View style={styles.numberBox}>
                            <Text style={styles.textNumber}>
                                {questionsData.length}
                            </Text>
                        </View>
                    </View>

                    {isMine && (
                        <TouchableOpacity style={{ padding: 5 }}>
                            <Feather name="edit" size={24} color="gray" />
                        </TouchableOpacity>
                    )}
                </View>

                <View style={{ height: '70%' }}>
                    <FlatList
                        keyExtractor={(item) => item._id}
                        data={questionsData}
                        renderItem={({ item }) => (
                            <View style={styles.questionsBox}>
                                <BoxQuestion
                                    title="Which mathematical symbol was the title of Ed Sheeran's
                        first album in 2011"
                                    number="1"
                                    type="Multiple Choices"
                                    questionData={item}
                                />
                            </View>
                        )}
                        ItemSeparatorComponent={() => (
                            <View style={{ height: 20 }} />
                        )}
                    />
                </View>

                <View style={{ marginTop: 20 }}>
                    {isCreator ? (
                        <Button title="Save" />
                    ) : (
                        <Button title="Play" handleOnPress={StartGame} />
                    )}
                </View>
            </View>
        </View>
    );
};

export default QuizInfo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        padding: 10,
    },
    fisrtSection: {
        height: 150,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },

    secondSection: {
        height: '70%',

        // flex: 1,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginTop: 20,
    },
    editBox: {
        // height: '50%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 10,
        // height: '10%',
        // backgroundColor: 'red',
    },
    textCategory: {
        color: colors.primary,
        fontSize: 11,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    categoryBox: {
        flexDirection: 'row',
        backgroundColor: bgColors.second,
        borderRadius: 6,
        padding: 5,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textHeader: {
        fontSize: 18,
        fontWeight: '900',
    },
    textDiscription: {
        color: 'gray',
        fontWeight: '600',
    },
    numberBox: {
        backgroundColor: colors.primary,
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 2,
        marginLeft: 5,
    },
    textNumber: {
        fontWeight: '900',
        fontSize: 12,
        color: 'white',
    },
    questionsBox: {
        // flexDirection: 'row',
        // height: '90%',
        // width: '200%',
        borderRadius: 20,
        backgroundColor: bgColors.second,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
});
