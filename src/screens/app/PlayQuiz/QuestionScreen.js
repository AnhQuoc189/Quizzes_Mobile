import React from 'react';
import { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import Question from 'src/components/playquiz/Question';

export default function QuestionScreen({
    questionData,
    lengthQuiz,
    timer,
    host,
    correctAnswer,
}) {
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.viewTimer}>
                    <CountdownCircleTimer
                        isPlaying
                        duration={timer}
                        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                        colorsTime={[7, 5, 2, 0]}
                        size={100}
                    >
                        {({ remainingTime }) => <Text>{remainingTime}</Text>}
                    </CountdownCircleTimer>
                </View>
                <View style={styles.viewQuestionTitle}>
                    <Text style={styles.textSub}>
                        Question {questionData.questionIndex} of {lengthQuiz}
                    </Text>
                    <Text style={styles.textTitle}>
                        {questionData.question}
                    </Text>
                </View>
                <View>
                    <Question
                        questionData={questionData}
                        host={host}
                        Correct={correctAnswer[questionData.questionIndex - 1]}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    viewTimer: {
        height: '12%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        // backgroundColor: 'red',
    },

    viewQuestionTitle: {
        width: '90%',
        height: '20%',
        justifyContent: 'center',
        alignContent: 'center',
    },

    textSub: {
        color: 'gray',
        fontSize: 14,
    },

    textTitle: {
        color: '#000',
        fontSize: 20,
    },

    viewQuestionAnswer: {
        width: '90%',
    },
});
