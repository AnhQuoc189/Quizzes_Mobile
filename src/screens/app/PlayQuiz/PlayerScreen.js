import React from 'react';
import { SafeAreaView, Text, StyleSheet, View, Image } from 'react-native';
import WaitingRoom from './WaitingRoom';
import QuestionScreen from './QuestionScreen';
import QuesntionLeaderboard from './QuesntionLeaderboard';
import LeaderBoardCurrent from './Leaderboardcurrent';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import correct from 'src/assets/images/correctfull.png';
import wrong from 'src/assets/images/wrong.png';

const InitQuizData = {
    questionType: 'Quiz',
    pointType: 'Standard',
    answerTime: 5,
    backgroundImage: '',
    question: '',
    answerList: [
        { name: 'a', body: '', isCorrect: false },
        { name: 'b', body: '', isCorrect: false },
        { name: 'c', body: '', isCorrect: false },
        { name: 'd', body: '', isCorrect: false },
    ],
    questionIndex: 1,
};

export default function PlayerScreen({ navigation, ...props }) {
    // const quizData = props.route.params;

    const [isStartedGame, setIsStaretedGame] = useState(false);
    const [timeAlready, setTimeAlready] = useState(true);
    const [isQuestionScreen, setIsQuestionScreen] = useState(false);
    const [isQuestionResultScreen, setIsQuestionResultScreen] = useState(false);
    const [isLeaderboardScreen, setIsLeaderboardScreen] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questionData, setQuestionData] = useState(InitQuizData);
    const [timer, setTimer] = useState(10);

    // const StartGame = () => {
    //     setIsStaretedGame(true);
    //     setTimeAlready(true);
    //     StartCountDownPreview(10, currentQuestionIndex);
    // };

    // const StartCountDownPreview = (seconds, index) => {
    //     let time = seconds;
    //     let interval = setInterval(() => {
    //         setTimer(time);
    //         if (time === 0) {
    //             clearInterval(interval);
    //             displayQuestion(index);
    //             setTimeAlready(false);
    //             setIsQuestionScreen(true);
    //         }
    //         time--;
    //     }, 1000);
    // };

    // const displayQuestion = (index) => {
    //     if (index === quizData.questionList.length) {
    //         displayCurrentLeaderBoard(index);
    //     } else {
    //         setQuestionData(quizData.questionList[index]);
    //         setCurrentQuestionIndex((prevstate) => prevstate + 1);
    //         let time = quizData.questionList[index].answerTime;
    //         let question = {
    //             questionData: quizData.questionList[index],
    //             answerList: quizData.questionList[index].answerList,
    //             questionIndex: quizData.questionList[index].questionIndex,
    //             correctAnswersCount: quizData.questionList[
    //                 index
    //             ].answerList.filter((answer) => answer.isCorrect === true)
    //                 .length,
    //         };
    //         //   socket.emit("start-question-timer", time, question, () => {
    //         //     startQuestionCountdown(time, index)
    //         //   })
    //         startQuestionCountdown(time, index);
    //     }
    // };

    // const startQuestionCountdown = (seconds, index) => {
    //     setIsLeaderboardScreen(false);
    //     setIsQuestionScreen(true);
    //     let time = seconds;
    //     let interval = setInterval(() => {
    //         setTimer(time);
    //         if (time === 0) {
    //             clearInterval(interval);
    //             displayQuestionResult(index);
    //         }
    //         time--;
    //     }, 1000);
    // };

    // const displayQuestionResult = (index) => {
    //     setIsQuestionScreen(false);
    //     setIsQuestionResultScreen(true);
    //     setTimeout(() => {
    //         displayCurrentLeaderBoard(index);
    //     }, 5000);
    // };

    // const displayCurrentLeaderBoard = (index) => {
    //     setIsQuestionResultScreen(false);
    //     setIsLeaderboardScreen(true);
    //     if (index >= quizData.questionList.length - 1) {
    //         // socket.emit('host-end-game', playerList, currentLeaderboard);
    //         // toast.info('Game ended!', {
    //         //     position: 'top-right',
    //         //     autoClose: 2000,
    //         //     pauseOnFocusLoss: false,
    //         // });
    //         // window.location.reload();
    //         console.log('Dung co noi nhieu');
    //     } else {
    //         setTimeout(() => {
    //             // socket.emit('question-preview', () => {
    //             //     startPreviewCountdown(5, index + 1);
    //             //     // index !== quiz.questionList.length - 1 && setPlayerList([])
    //             // });
    //             displayQuestion(index + 1);
    //         }, 5000);
    //     }
    // };

    return (
        <SafeAreaView style={styles.container}>
            {/* {timeAlready && (
                <View style={styles.viewTimerAlready}>
                    <LinearGradient
                        // Button Linear Gradient
                        colors={['#8ec5fc', '#e0c3fc']}
                        style={styles.viewPreview}
                    >
                        <Text style={{ fontSize: 100, fontWeight: 400 }}>
                            {timer}
                        </Text>
                    </LinearGradient>
                </View>
            )} */}
            {/* {timeAlready && <AnswerCorrect />} */}
            {timeAlready && <AnswerWrong />}

            {/* {isQuestionScreen && (
                <QuestionScreen
                    timer={questionData.answerTime}
                    questionData={questionData}
                    lengthQuiz={quizData.questionList.length}
                    host={true}
                />
            )}
            {isQuestionResultScreen && <QuesntionLeaderboard />}
            {isLeaderboardScreen && <LeaderBoardCurrent />} */}
        </SafeAreaView>
    );
}

const AnswerCorrect = () => {
    return (
        <View style={{ ...styles.containerAnswer, backgroundColor: '#F1FDFF' }}>
            <Image style={{ width: '50%', height: '24%' }} source={correct} />
            <Text style={{ fontSize: 30, fontWeight: 800 }}>
                Your answer is correct
            </Text>
            <Text style={{ fontSize: 20 }}>Point Question: 5</Text>
        </View>
    );
};

const AnswerWrong = () => {
    return (
        <View style={{ ...styles.containerAnswer, backgroundColor: '#F69A2B' }}>
            <Image style={{ width: '80%', height: '30%' }} source={wrong} />
            <Text style={{ fontSize: 30, fontWeight: 800 }}>
                Your answer is wrong!
            </Text>
            <Text style={{ fontSize: 20 }}>Point Question: 0</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    viewTimerAlready: {
        width: '100%',
        height: '100%',
    },
    viewPreview: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    containerAnswer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 100,
    },

    imageAnswer: {
        width: '50%',
        height: '24%',
    },
});
