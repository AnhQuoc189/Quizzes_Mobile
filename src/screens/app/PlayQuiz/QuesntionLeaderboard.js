import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, ScrollView } from 'react-native';
import { colors } from 'src/styles/color';
import UserLeader from 'src/components/playquiz/UserLeader';

const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function QuesntionLeaderboard({ playerList, questionResult }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewQuestionResults}>
                <View style={styles.viewHeader}>
                    <Text style={styles.textHeader}>Question Result</Text>
                </View>

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
                            {questionResult.questionResultList &&
                                questionResult.questionResultList.map(
                                    (player, index) => (
                                        <UserLeader
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.lightPurple,
    },

    viewQuestionResults: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },

    viewHeader: {
        marginTop: 30,
        width: '100%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textHeader: {
        fontSize: 20,
        fontWeight: 600,
    },

    viewLeaderBoard: {
        width: '94%',
        height: '80%',
        backgroundColor: '#DBDFEA',
        borderRadius: 20,
        alignItems: 'center',
    },
});
