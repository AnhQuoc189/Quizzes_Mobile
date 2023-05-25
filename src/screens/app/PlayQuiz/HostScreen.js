import React, { useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import WaitingRoom from './WaitingRoom';
import QuestionScreen from './QuestionScreen';
import QuesntionLeaderboard from './QuesntionLeaderboard';
import LeaderBoardCurrent from './Leaderboardcurrent';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';

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

let CorrectAnswer = [];

export default function HostScreen({ navigation, ...props }) {
    // console.log(props.route.params);
    const quizData = props.route.params.quizData;
    const game = props.route.params.newGame;
    const leaderboard = props.route.params.newLeaderboard;

    const [correct, setCorrect] = useState();
    const socket = useSelector((state) => state.sockets.socket);
    // console.log(socket);
    // const game = useSelector((state) => state.games);
    // console.log(game);

    useEffect(() => {
        CorrectAnswer = [];
        quizData.questionList.map((question) => {
            question.answerList.map((answer) => {
                if (answer.isCorrect === true) {
                    return (
                        !CorrectAnswer.includes(answer.body) &&
                        CorrectAnswer.push(answer.body)
                    );
                }
            });
        });
        setCorrect(CorrectAnswer);
    }, []);

    const [isStartedGame, setIsStaretedGame] = useState(false);
    const [timeAlready, setTimeAlready] = useState(false);
    const [isQuestionScreen, setIsQuestionScreen] = useState(false);
    const [isQuestionResultScreen, setIsQuestionResultScreen] = useState(false);
    const [isLeaderboardScreen, setIsLeaderboardScreen] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questionData, setQuestionData] = useState(InitQuizData);
    const [timer, setTimer] = useState(10);

    const StartGame = () => {
        socket?.emit('start-game', quizData, game, leaderboard);
        socket?.emit('countdown-preview', game?.pin, () => {
            StartCountDownPreview(10, currentQuestionIndex);
        });

        setTimeAlready(true);
        setIsStaretedGame(true);
    };

    const cancelGame = () => {
        socket?.emit('host-leave-room', game.pin);
        navigation.navigate('DetailQuiz', quizData);
    };

    const StartCountDownPreview = (seconds, index) => {
        let time = seconds;
        let interval = setInterval(() => {
            setTimer(time);
            if (time === 0) {
                clearInterval(interval);
                displayQuestion(index);
                setTimeAlready(false);
                setIsQuestionScreen(true);
            }
            time--;
        }, 1000);
    };

    const displayQuestion = (index) => {
        if (index === quizData.questionList.length) {
            displayCurrentLeaderBoard(index);
        } else {
            setQuestionData(quizData.questionList[index]);
            setCurrentQuestionIndex((prevstate) => prevstate + 1);
            let time = quizData.questionList[index].answerTime;
            let question = {
                questionData: quizData.questionList[index],
                answerList: quizData.questionList[index].answerList,
                questionIndex: quizData.questionList[index].questionIndex,
                correctAnswersCount: quizData.questionList[
                    index
                ].answerList.filter((answer) => answer.isCorrect === true)
                    .length,
            };
            socket.emit(
                'start-question-timer',
                game.pin,
                time,
                question,
                () => {
                    startQuestionCountdown(time, index);
                },
            );
            // startQuestionCountdown(time, index);
        }
    };

    const startQuestionCountdown = (seconds, index) => {
        setIsLeaderboardScreen(false);
        setIsQuestionScreen(true);
        let time = seconds;
        let interval = setInterval(() => {
            setTimer(time);
            if (time === 0) {
                clearInterval(interval);
                displayQuestionResult(index);
            }
            time--;
        }, 1000);
    };

    const displayQuestionResult = (index) => {
        setIsQuestionScreen(false);
        setIsQuestionResultScreen(true);
        setTimeout(() => {
            displayCurrentLeaderBoard(index);
        }, 5000);
    };

    const displayCurrentLeaderBoard = (index) => {
        setIsQuestionResultScreen(false);
        setIsLeaderboardScreen(true);
        if (index >= quizData.questionList.length - 1) {
            // socket.emit('host-end-game', playerList, currentLeaderboard);
            socket.emit('host-end-game', game?.pin);

            // toast.info('Game ended!', {
            //     position: 'top-right',
            //     autoClose: 2000,
            //     pauseOnFocusLoss: false,
            // });
            // window.location.reload();
            console.log('Dung co noi nhieu');
        } else {
            setTimeout(() => {
                // socket.emit('question-preview', () => {
                //     startPreviewCountdown(5, index + 1);
                //     // index !== quiz.questionList.length - 1 && setPlayerList([])
                // });
                displayQuestion(index + 1);
            }, 5000);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {!isStartedGame && (
                <WaitingRoom
                    pin={game.pin}
                    socket={socket}
                    quizData={quizData}
                    navigation={navigation}
                    onPressLetgo={StartGame}
                    onPressCanCel={cancelGame}
                />
            )}
            {timeAlready && (
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
            )}
            {isQuestionScreen && (
                <QuestionScreen
                    timer={questionData.answerTime}
                    questionData={questionData}
                    lengthQuiz={quizData.questionList.length}
                    host={true}
                    correctAnswer={correct}
                />
            )}
            {isQuestionResultScreen && <QuesntionLeaderboard />}
            {isLeaderboardScreen && <LeaderBoardCurrent />}
        </SafeAreaView>
    );
}

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
});
