//Library
import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

//components
import Question from 'src/components/playquiz/Question';

export default function QuestionScreen({
    questionData,
    lengthQuiz,
    timer,
    host,
    correctAnswer,
    isAnswerSelect,
    onClick,
}) {
    return (
        <View style={styles.container}>
            <View style={{ width: '80%', alignItems: 'center' }}>
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
                        Question {questionData?.questionIndex} of {lengthQuiz}
                    </Text>
                    <Text style={styles.textSub}>
                        {questionData?.optionQuestion} Choice
                    </Text>
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={styles?.textTitle}>
                            {questionData?.question}
                        </Text>

                        <Image
                            source={{
                                uri: questionData?.backgroundImage
                                    ? questionData.backgroundImage
                                    : 'https://us.123rf.com/450wm/sn333g/sn333g1608/sn333g160800029/65791205-math-round-bright-symbol-vector-colorful-mathematics-school-subject-bright-sign-in-thin-line-style.jpg?ver=6',
                            }}
                            style={{
                                height: 70,
                                width: '40%',
                                resizeMode: 'cover',
                            }}
                        />
                    </View>
                </View>
                <View>
                    <Question
                        questionData={questionData}
                        host={host}
                        onClick={onClick}
                        isAnswerSelect={isAnswerSelect}
                        Correct={
                            host
                                ? correctAnswer[questionData?.questionIndex - 1]
                                : ''
                        }
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
        backgroundColor: '#F1FDFF',
        alignItems: 'center',
    },
    viewTimer: {
        height: '12%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },

    viewQuestionTitle: {
        width: '100%',
        height: '20%',
        justifyContent: 'center',
        alignContent: 'center',
    },

    textSub: {
        color: 'gray',
        fontSize: 14,
    },

    textTitle: {
        width: '60%',
        color: '#000',
        fontSize: 20,
    },

    viewQuestionAnswer: {
        width: '90%',
    },
});
