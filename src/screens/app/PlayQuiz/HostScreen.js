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

export default function HostScreen({ navigation }) {
    // const game = props.route.params.newGame;
    // const leaderboard = props.route.params.newLeaderboard;

    // const [quizData, setQuizData] = useState(props.route.params.quizData);
    // const [game, setGame] = useState(props.route.params.quizData);
    // const [leaderboard, setLeaderboard] = useState(
    //     props.route.params.newLeaderboard,
    // );

    const [correct, setCorrect] = useState();
    const socket = useSelector((state) => state.sockets.socket);

    const quiz = useSelector((state) => state.quizs.quiz);
    console.log(quiz.name);
    const game = useSelector((state) => state.games.game);
    console.log(game._id);

    const leaderboard = useSelector((state) => state.leaderboards.leaderboard);
    console.log(leaderboard._id);

    useEffect(() => {
        CorrectAnswer = [];
        quiz.questionList.map((question) => {
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
        socket?.emit('start-game', quiz, game, leaderboard);
        socket?.emit('countdown-preview', game?.pin, () => {
            StartCountDownPreview(10, currentQuestionIndex);
        });

        setTimeAlready(true);
        setIsStaretedGame(true);
        // console.log(game);
    };

    const cancelGame = () => {
        socket?.emit('host-leave-room', game.pin);
        navigation.navigate('DetailQuiz', { quizData: quiz, mylibrary: true });
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
        if (index === quiz.questionList.length) {
            displayCurrentLeaderBoard(index);
        } else {
            setQuestionData(quiz.questionList[index]);
            setCurrentQuestionIndex((prevstate) => prevstate + 1);
            let time = quiz.questionList[index].answerTime;
            let question = {
                questionData: quiz.questionList[index],
                answerList: quiz.questionList[index].answerList,
                questionIndex: quiz.questionList[index].questionIndex,
                correctAnswersCount: quiz.questionList[index].answerList.filter(
                    (answer) => answer.isCorrect === true,
                ).length,
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
        if (index >= quiz.questionList.length - 1) {
            // socket.emit('host-end-game', playerList, currentLeaderboard);
            socket.emit('host-end-game', game?.pin);
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
                    quizData={quiz}
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
                    lengthQuiz={quiz.questionList.length}
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
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
