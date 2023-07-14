//Library
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

//redux
import { useSelector } from 'react-redux';

//Screen
import WaitingRoom from './WaitingRoom';
import QuestionScreen from './QuestionScreen';
import ResultScreen from './ResultScreen';
import CheckResultScreen from './CheckResult/CheckResultScreen';

//images
import correctAnswer from 'src/assets/images/correctAnsswer.png';
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

let arrayAnswer = [];

export default function PlayerSolo({ navigation, ...props }) {
    const { quizList, title, userType, community } = props.route.params;

    const [questionData, setQuestionData] = useState(InitQuizData);
    const [isStartedGame, setIsStaretedGame] = useState(false);
    const [timeAlready, setTimeAlready] = useState(false);
    const [isQuestionScreen, setIsQuestionScreen] = useState(false);
    const [isResultScreen, setIsResultScreen] = useState(false);
    const [isResultFinal, setIsResultFinal] = useState(false);
    const [isCheckAnswerScreen, setIsCheckAnswerScreen] = useState(false);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questionOptionCurrent, setQuestionOptionCurrent] = useState();
    const [questionpointType, setQuestionpointType] = useState();
    const [scorePlayer, setScorePlayer] = useState([]);
    const [expireTimeQuestion, setExpireTimeQuestion] = useState(false);
    const [trueAnswer, setTrueAnswer] = useState(true);

    const [timer, setTimer] = useState(10);
    // const [timerQuestion,setTimerQuestion]=useState()
    const [answer, setAnswer] = useState([]);

    const [resultDetail, setResultDetails] = useState({
        correctAnswer: 0,
        noAnswer: 0,
        incorrectAnswer: 0,
        pointSum: 0,
    });

    // const socket = useSelector((state) => state.sockets.socket);
    const quiz = useSelector((state) => state.quizs.quiz);
    const poitperQuestion = quiz.pointsPerQuestion;

    useEffect(() => {
        const listIndexQuestion = quiz.questionList.map(
            (item) => item.questionIndex,
        );
        setResultDetails({ ...resultDetail, listIndexQuestion });
    }, [quiz]);

    useEffect(() => {
        arrayAnswer = [];
    }, [currentQuestionIndex]);

    const StartGame = () => {
        StartCountDownPreview(10, currentQuestionIndex);
        setTimeAlready(true);
        setIsStaretedGame(true);
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

    useEffect(() => {
        if (isResultFinal) {
            const listTimerAnswer = answer.map((item) => item.time);
            setResultDetails({ ...resultDetail, listTimerAnswer });
        }
    }, [isResultFinal]);

    const displayQuestion = (index) => {
        setIsResultScreen(false);
        if (index === quiz.questionList.length) {
            setIsResultFinal(true);
        } else {
            setQuestionData(quiz.questionList[index]);
            setQuestionOptionCurrent(quiz.questionList[index].optionQuestion);
            setQuestionpointType(quiz.questionList[index].pointType);
            let time = quiz.questionList[index].answerTime;
            setCurrentQuestionIndex((prevstate) => prevstate + 1);
            setAnswer((prevstate) => [
                ...prevstate,
                {
                    questionIndex: quiz.questionList[index].questionIndex,
                    answers: [],
                    time: 0,
                },
            ]);
            startQuestionCountdown(time, index);
        }
    };

    const calculPoint = () => {
        switch (questionpointType) {
            case 'Standard':
                return poitperQuestion;
            case 'Double':
                return poitperQuestion * 2;
            case 'OnTime':
                console.log(
                    questionData.answerTime,
                    answer[currentQuestionIndex - 1].time,
                    poitperQuestion,
                );
                return answer[currentQuestionIndex - 1].time * poitperQuestion;
            default:
                break;
        }
    };

    useEffect(() => {
        if (expireTimeQuestion) {
            const answerPlayer = answer[currentQuestionIndex - 1].answers;
            const answerQuestion =
                quiz.questionList[currentQuestionIndex - 1].answerCorrect;

            let wrong = false;
            if (answerPlayer.length === answerQuestion.length) {
                answerPlayer.map((item) => {
                    if (!answerQuestion.includes(item)) {
                        wrong = true;
                        setResultDetails({
                            ...resultDetail,
                            incorrectAnswer: resultDetail.incorrectAnswer + 1,
                        });
                    }
                });

                if (wrong === true) {
                    setTrueAnswer(false);
                    setScorePlayer([...scorePlayer, 0]);
                } else {
                    const score = calculPoint();
                    setResultDetails({
                        ...resultDetail,
                        correctAnswer: resultDetail.correctAnswer + 1,
                        pointSum: resultDetail.pointSum + score,
                    });
                    setScorePlayer([...scorePlayer, score]);
                }
            } else {
                setTrueAnswer(false);
                if (answerPlayer.length === 0) {
                    setResultDetails({
                        ...resultDetail,
                        noAnswer: resultDetail.noAnswer + 1,
                    });
                } else {
                    setResultDetails({
                        ...resultDetail,
                        incorrectAnswer: resultDetail.incorrectAnswer + 1,
                    });
                }
                setScorePlayer([...scorePlayer, 0]);
            }
        }
    }, [expireTimeQuestion]);

    const startQuestionCountdown = (seconds, index) => {
        setTrueAnswer(true);
        setExpireTimeQuestion(false);
        setIsQuestionScreen(true);
        let time = seconds;
        let interval = setInterval(() => {
            setTimer(time);
            if (time === 0) {
                clearInterval(interval);
                setExpireTimeQuestion(true);
                displayQuestionResult(index);
            }
            time--;
        }, 1000);
    };

    const displayQuestionResult = (index) => {
        setIsQuestionScreen(false);
        setIsResultScreen(true);
        setTimeout(() => {
            displayQuestion(index + 1);
        }, 5000);
    };

    const cancelGame = () => {
        // navigation.navigate('DetailQuiz', {
        //     quizData: quiz,
        //     mylibrary: false,
        //     community,
        //     quizList,
        //     title,
        // });
        navigation.goBack();
    };

    const handleFinish = () => {
        // if (quizList && title) {
        //     navigation.navigate('CommunityDetais', {
        //         quizList,
        //         title,
        //         community,
        //     });
        // } else {
        //     // if (student) {
        //     //     navigation.navigate('Home');
        //     // } else {
        //     //     navigation.navigate('Discover');
        //     // }
        //     navigation.navigate('DetailQuiz', {
        //         quizData: quiz,
        //         mylibrary: false,
        //         userType,
        //         community,
        //     });
        // }
        navigation.goBack();
    };

    const handleAnswer = (key) => {
        if (!arrayAnswer.includes(key)) {
            arrayAnswer.push(key);
        } else {
            arrayAnswer = arrayAnswer.filter((item) => item !== key);
        }

        setAnswer([
            ...answer.slice(0, currentQuestionIndex - 1),
            {
                answers:
                    questionOptionCurrent === 'Single' ? [key] : arrayAnswer,
                questionIndex: currentQuestionIndex,
                time: timer,
            },
            ...answer.slice(currentQuestionIndex + 1, answer.length),
        ]);
    };

    const handleCompareResult = () => {
        setIsResultFinal(false);
        setIsCheckAnswerScreen(true);
    };

    const handleBackResult = () => {
        setIsResultFinal(true);
        setIsCheckAnswerScreen(false);
    };

    return (
        <SafeAreaView style={styles.viewSafe}>
            {!isStartedGame && (
                <WaitingRoom
                    quizData={quiz}
                    navigation={navigation}
                    onPressLetgo={StartGame}
                    onPressCanCel={cancelGame}
                    solo={true}
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
                    host={false}
                    isAnswerSelect={(key) =>
                        answer[currentQuestionIndex - 1]?.answers.includes(key)
                    }
                    onClick={(key) => handleAnswer(key)}
                />
            )}
            {isResultScreen &&
                (trueAnswer ? (
                    <AnswerCorrect
                        point={scorePlayer[currentQuestionIndex - 1]}
                    />
                ) : (
                    <AnswerWrong
                        point={scorePlayer[currentQuestionIndex - 1]}
                    />
                ))}
            {isResultFinal && (
                <ResultScreen
                    solo={true}
                    navigation={navigation}
                    finish={handleFinish}
                    result={resultDetail}
                    compareResult={handleCompareResult}
                />
            )}
            {isCheckAnswerScreen && (
                <CheckResultScreen
                    questionList={quiz.questionList}
                    answer={answer}
                    handleBack={handleBackResult}
                />
            )}
        </SafeAreaView>
    );
}

const AnswerCorrect = ({ point }) => {
    return (
        <View style={{ ...styles.containerAnswer, backgroundColor: '#F1FDFF' }}>
            <Image
                style={{ width: '90%', height: '24%' }}
                source={correctAnswer}
            />
            <Text style={{ fontSize: 30, fontWeight: 800 }}>
                Your answer is correct
            </Text>
            <Text style={{ fontSize: 20 }}>Point Question: {point}</Text>
        </View>
    );
};

const AnswerWrong = ({ point }) => {
    return (
        <View style={{ ...styles.containerAnswer, backgroundColor: '#F69A2B' }}>
            <Image style={{ width: '80%', height: '30%' }} source={wrong} />
            <Text style={{ fontSize: 30, fontWeight: 800 }}>
                Your answer is wrong!
            </Text>
            <Text style={{ fontSize: 20 }}>Point Question: {point}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    viewSafe: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
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
