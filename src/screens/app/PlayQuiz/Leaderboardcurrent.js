import React from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { colors } from 'src/styles/color';
import UserLeader from 'src/components/playquiz/UserLeader';
import { AntDesign } from '@expo/vector-icons';
const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function LeaderBoardCurrent({
    playerList,
    currentLeaderboard,
    lengthQuiz,
    host,
    handleExitGame,
    handleBackLeaderboard,
}) {
    // let leaderFinal = false;
    // if (lengthQuiz) {
    //     leaderFinal = currentLeaderboard.leaderboardList.questionIndex =
    //         lengthQuiz;
    // }

    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    ...styles.viewQuestionResults,
                    height:
                        host && currentLeaderboard.questionIndex === lengthQuiz
                            ? '90%'
                            : '100%',
                }}
            >
                <View style={styles.viewHeader}>
                    {!host && (
                        <TouchableOpacity
                            style={{ position: 'absolute', left: 0 }}
                            onPress={handleBackLeaderboard}
                        >
                            <AntDesign
                                name="arrowleft"
                                size={30}
                                color="black"
                            />
                        </TouchableOpacity>
                    )}
                    <Text style={styles.textHeader}>LeaderBoard Result</Text>
                </View>

                {/* <View style={styles.leftHeader}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </View> */}

                <View style={styles.viewLeaderBoard}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <View
                            style={{
                                width: '100%',
                                height: '100%',
                                alignItems: 'center',
                            }}
                        >
                            {currentLeaderboard.leaderboardList &&
                                currentLeaderboard.leaderboardList.map(
                                    (player, index) => (
                                        <UserLeader
                                            leaderboard={true}
                                            key={index}
                                            index={index}
                                            playerList={playerList}
                                            player={player}
                                        />
                                    ),
                                )}
                        </View>
                    </ScrollView>
                </View>
            </View>
            {host && (
                <TouchableOpacity
                    style={styles.viewHostExit}
                    onPress={handleExitGame}
                >
                    <Text style={styles.textExitGame}>Exit Game</Text>
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.lightPurple,
        // justifyContent: 'center',
        alignItems: 'center',
    },

    leftHeader: {
        width: '90%',
        left: 0,
        bottom: 50,
    },

    viewQuestionResults: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },

    viewHeader: {
        marginTop: 30,
        width: '90%',
        height: '10%',
        flexDirection: 'row',
        // gap: 20,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red',
    },

    textHeader: {
        color: '#884A39',
        fontSize: 24,
        fontWeight: 600,
    },

    viewLeaderBoard: {
        width: '94%',
        height: '80%',
        backgroundColor: '#DBDFEA',
        borderRadius: 20,
        alignItems: 'center',
    },

    viewHostExit: {
        width: '90%',
        height: '7%',
        backgroundColor: '#D4ADFC',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },

    textExitGame: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 700,
    },
});
