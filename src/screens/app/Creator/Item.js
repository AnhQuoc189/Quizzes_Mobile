// Library
import { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Modal,
    TextInput,
    Pressable,
    ActivityIndicator,
    Platform,
    ToastAndroid,
    AlertIOS,
    Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const screenWidth = Dimensions.get('screen').width;

// Layout
import { MainLayout } from 'src/layouts';

import AnswerInput from './AnswerInput';

// Constant
import { timeLimit } from 'src/constants/time.constant';
import { questionTypes } from 'src/constants/questionTypes.constant';
import { pointTypes } from 'src/constants/pointTypes.constant';
import { optionQuestions } from 'src/constants/optionQuestion';

import { useUpdateQuestionMutation } from 'src/services/quizApi';

import {
    Button,
    CoverImage,
    Header,
    PoolAnswer,
    TrueOrFalseAnswer,
} from 'src/components/creator';

import { ModalQuiz } from './Modal';

import ImageUpload from 'src/components/creator/imageUpload';

import { bgColors, colors } from 'src/styles/color';
import { useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { updateQuiz } from 'src/slices/quizSlice';

export default function Item({
    quizId,
    data,
    loadingDelete,
    length,
    handleAddQuestion,
    handleDeleteQuestion,
}) {
    const [coverImage, setCoverImage] = useState(null);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auths?.authData);
    const accessToken = userData?.data?.accessToken;
    const [file, setFile] = useState(null);

    const [questionData, setQuestionData] = useState(data);

    const changeMaxCorrectAnswerCount = (value) => {
        questionData.answerList.forEach((answer) => (answer.isCorrect = false));
    };

    useEffect(() => {
        if (data) {
            setQuestionData(data);
        }
    }, [data]);

    const {
        questionType,
        optionQuestion,
        pointType,
        answerTime,
        backgroundImage,
        question,
        answerList,
        questionIndex,
        maxCorrectAnswer,
        correctAnswerCount,
        answerCorrect,
    } = questionData;

    const [updateQuestion, { isLoading }] = useUpdateQuestionMutation();

    // // Modal Visible State
    const [optionsModalVisible, setOptionsModalVisible] = useState(false);
    const [timeModalVisible, setTimeModalVisible] = useState(false);
    const [pointTypeModalVisible, setPointTypeModalVisible] = useState(false);
    const [questionTypeModalVisible, setQuestionTypeModalVisible] =
        useState(false);

    const handleQuestionChange = (key, name) => {
        switch (name) {
            case 'optionQuestion':
                if (key === 'Single') {
                    setQuestionData({
                        ...questionData,
                        [name]: key,
                        maxCorrectAnswer: 1,
                        correctAnswerCount: 0,
                        answerCorrect: [],
                    });
                } else {
                    if (questionType === 'True/False') {
                        return;
                    } else {
                        setQuestionData({
                            ...questionData,
                            [name]: key,
                            maxCorrectAnswer: 4,
                            correctAnswerCount: 0,
                            answerCorrect: [],
                        });
                    }
                }
                break;

            case 'questionType':
                if (key === 'Quiz') {
                    setQuestionData({
                        ...questionData,
                        [name]: key,
                        answerList: [
                            { name: 'a', body: '', isCorrect: false },
                            { name: 'b', body: '', isCorrect: false },
                            { name: 'c', body: '', isCorrect: false },
                            { name: 'd', body: '', isCorrect: false },
                        ],
                    });
                } else {
                    setQuestionData({
                        ...questionData,
                        [name]: key,
                        answerList: [
                            {
                                name: 'a',
                                body: 'True',
                                isCorrect: false,
                            },
                            {
                                name: 'b',
                                body: 'False',
                                isCorrect: false,
                            },
                        ],
                        optionQuestion: 'Single',
                        maxCorrectAnswer: 1,
                        correctAnswerCount: 0,
                        answerCorrect: [],
                    });
                }
                break;
            default:
                setQuestionData({ ...questionData, [name]: key });
                break;
        }
        // setQuestionData({ ...questionData, [name]: key });
    };

    const updateAnswer = (name, body, index) => {
        setQuestionData((prevState) => ({
            ...prevState,
            answerList: [
                ...prevState.answerList.slice(0, index),
                {
                    name: name,
                    body: body,
                    isCorrect: prevState.answerList[index].isCorrect,
                },
                ...prevState.answerList.slice(
                    index + 1,
                    prevState.answerList.length,
                ),
            ],
        }));
    };

    const setCorrectAnswer = (index, name) => {
        setQuestionData((prevState) => ({
            ...prevState,
            answerList: [
                ...prevState.answerList.slice(0, index),
                {
                    name: prevState.answerList[index].name,
                    body: prevState.answerList[index].body,
                    isCorrect: !prevState.answerList[index].isCorrect,
                },
                ...prevState.answerList.slice(
                    index + 1,
                    prevState.answerList.length,
                ),
            ],
            correctAnswerCount:
                prevState.answerList[index].isCorrect === true
                    ? correctAnswerCount - 1
                    : correctAnswerCount + 1,

            answerCorrect:
                prevState.answerList[index].isCorrect === true
                    ? answerCorrect.filter((item) => item !== name)
                    : [...answerCorrect, name],
        }));
    };

    const handleSaveQuestion = async () => {
        const { data } = await updateQuestion({
            accessToken,
            questionId: questionData._id,
            quizId,
            newQuestion: { ...questionData, backgroundImage: file },
        });

        if (data) {
            ToastAndroid.show(
                'Question save successfully !',
                ToastAndroid.SHORT,
            );
            dispatch(updateQuiz(data));
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ width: '90%' }}>
                <ScrollView
                    contentContainerStyle={styles.questionContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Add Cover Image Question */}
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 20,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: 800,
                            }}
                        >
                            Question {data.questionIndex}
                        </Text>
                    </View>
                    <ImageUpload
                        onChange={setCoverImage}
                        setFile={setFile}
                        picture={backgroundImage}
                        creator={false}
                    />

                    {/* Question Settings */}
                    <View style={styles.settings}>
                        {/* Type Question Setting Button */}
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                            }}
                        >
                            <TouchableOpacity
                                onPress={() =>
                                    setOptionsModalVisible(!optionsModalVisible)
                                }
                                // onPress={() => setQuestionTypeModalVisible(true)}
                                style={{ ...styles.settingBtn, width: '40%' }}
                            >
                                <Text
                                    style={{
                                        fontWeight: 700,
                                    }}
                                >
                                    {optionQuestion}
                                </Text>
                                <MaterialCommunityIcons
                                    name="chevron-down"
                                    size={25}
                                    color={colors.lightPurple}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    setQuestionTypeModalVisible(
                                        !questionTypeModalVisible,
                                    )
                                }
                                // onPress={() => setQuestionTypeModalVisible(true)}
                                style={{ ...styles.settingBtn, width: '44%' }}
                            >
                                <Text
                                    style={{
                                        fontWeight: 700,
                                    }}
                                >
                                    {questionType}
                                </Text>
                                <MaterialCommunityIcons
                                    name="chevron-down"
                                    size={25}
                                    color={colors.lightPurple}
                                />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                            }}
                        >
                            {/* Time Setting Button */}
                            <TouchableOpacity
                                onPress={() =>
                                    setTimeModalVisible(!timeModalVisible)
                                }
                                style={{ ...styles.settingBtn, width: '30%' }}
                            >
                                <MaterialCommunityIcons
                                    name="clock-outline"
                                    size={25}
                                    color={colors.lightPurple}
                                />
                                <Text
                                    style={{
                                        fontWeight: 700,
                                    }}
                                >
                                    {/* {activeQuestion.timeLimit} Sec */}
                                    {questionData.answerTime} Sec
                                </Text>
                            </TouchableOpacity>

                            {/* {questionIndex === length && (
                            <TouchableOpacity
                                style={{
                                    ...styles.settingBtn,
                                    borderWidth: 0,
                                    backgroundColor: colors.primary,
                                }}
                                onPress={() => {
                                    // setConfirmSaveModalVisible(true);
                                    handleAddQuestion(InitQuestion);
                                }}
                            >
                                <MaterialCommunityIcons
                                    name="plus"
                                    size={25}
                                    color="#fff"
                                />
                                <Text
                                    style={{ color: '#fff', fontWeight: 900 }}
                                >
                                    Add
                                </Text>
                            </TouchableOpacity>
                        )} */}

                            <TouchableOpacity
                                onPress={() =>
                                    setPointTypeModalVisible(
                                        !pointTypeModalVisible,
                                    )
                                }
                                style={{ ...styles.settingBtn, width: '35%' }}
                            >
                                <MaterialCommunityIcons
                                    name="clock-outline"
                                    size={25}
                                    color={colors.lightPurple}
                                />
                                <Text
                                    style={{
                                        fontWeight: 700,
                                    }}
                                >
                                    {/* {activeQuestion.timeLimit} Sec */}
                                    {questionData.pointType}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Add Question Button */}

                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={optionsModalVisible}
                            onRequestClose={() => {
                                setOptionsModalVisible(!optionsModalVisible);
                            }}
                        >
                            <ModalQuiz
                                title="Options Quetstion"
                                arrayModal={optionQuestions}
                                stateModal={optionsModalVisible}
                                setStateModal={setOptionsModalVisible}
                                handleQuizChange={(option) => {
                                    handleQuestionChange(
                                        option,
                                        'optionQuestion',
                                    );
                                    changeMaxCorrectAnswerCount(
                                        option === 'Single' ? 1 : 4,
                                    );
                                }}
                                value={optionQuestion}
                            />
                        </Modal>

                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={timeModalVisible}
                            onRequestClose={() => {
                                setTimeModalVisible(!timeModalVisible);
                            }}
                        >
                            <ModalQuiz
                                title="Time limit"
                                arrayModal={timeLimit}
                                stateModal={timeModalVisible}
                                setStateModal={setTimeModalVisible}
                                handleQuizChange={(time) =>
                                    handleQuestionChange(time, 'answerTime')
                                }
                                value={answerTime}
                            />
                        </Modal>

                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={pointTypeModalVisible}
                            onRequestClose={() => {
                                setPointTypeModalVisible(
                                    !pointTypeModalVisible,
                                );
                            }}
                        >
                            <ModalQuiz
                                title="Point Types"
                                arrayModal={pointTypes}
                                stateModal={pointTypeModalVisible}
                                setStateModal={setPointTypeModalVisible}
                                handleQuizChange={(type) =>
                                    handleQuestionChange(type, 'pointType')
                                }
                                value={pointType}
                            />
                        </Modal>

                        {/* Type Setting Modal */}
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={questionTypeModalVisible}
                            onRequestClose={() => {
                                setQuestionTypeModalVisible(
                                    !questionTypeModalVisible,
                                );
                            }}
                        >
                            <ModalQuiz
                                title="Question Types"
                                arrayModal={questionTypes}
                                stateModal={questionTypeModalVisible}
                                setStateModal={setQuestionTypeModalVisible}
                                handleQuizChange={(type) => {
                                    handleQuestionChange(type, 'questionType');
                                }}
                                value={questionType}
                            />
                        </Modal>

                        {/* Modal PointType */}
                    </View>

                    {/* Question title */}
                    <View style={{ marginTop: 10, width: '100%' }}>
                        <Text style={styles.label}>Title</Text>
                        <View style={styles.viewInput}>
                            <TextInput
                                value={question}
                                style={styles.input}
                                placeholder="Enter your question"
                                onChangeText={(value) =>
                                    handleQuestionChange(value, 'question')
                                }
                            />
                        </View>
                    </View>

                    {/* Answer Choices */}
                    <View
                        style={{ marginVertical: 10, width: '100%', gap: 10 }}
                    >
                        <Text style={styles.label}>Answers</Text>
                        <AnswerInput
                            name="A"
                            body={answerList[0]?.body}
                            isCorrect={answerList[0]?.isCorrect}
                            onChangeText={(value) => {
                                questionType !== 'Quiz'
                                    ? updateAnswer('A', 'True', 0)
                                    : updateAnswer('A', value, 0);
                            }}
                            onClick={() => {
                                if (
                                    questionData.answerList[0].isCorrect ||
                                    correctAnswerCount < maxCorrectAnswer
                                ) {
                                    setCorrectAnswer(0, 'A');
                                }
                            }}
                        />
                        <AnswerInput
                            name="B"
                            body={answerList[1]?.body}
                            isCorrect={answerList[1]?.isCorrect}
                            onChangeText={(value) => {
                                questionType !== 'Quiz'
                                    ? updateAnswer('B', 'False', 1)
                                    : updateAnswer('B', value, 1);
                            }}
                            onClick={() => {
                                if (
                                    questionData.answerList[1].isCorrect ||
                                    correctAnswerCount < maxCorrectAnswer
                                ) {
                                    setCorrectAnswer(1, 'B');
                                }
                            }}
                        />
                        {questionType === 'Quiz' && (
                            <>
                                <AnswerInput
                                    name="C"
                                    body={answerList[2]?.body}
                                    isCorrect={answerList[2]?.isCorrect}
                                    onChangeText={(value) =>
                                        updateAnswer('C', value, 2)
                                    }
                                    onClick={() => {
                                        if (
                                            questionData.answerList[2]
                                                .isCorrect ||
                                            correctAnswerCount <
                                                maxCorrectAnswer
                                        ) {
                                            setCorrectAnswer(2, 'C');
                                        }
                                    }}
                                />
                                <AnswerInput
                                    name="D"
                                    body={answerList[3]?.body}
                                    isCorrect={answerList[3]?.isCorrect}
                                    onChangeText={(value) =>
                                        updateAnswer('D', value, 3)
                                    }
                                    onClick={() => {
                                        if (
                                            questionData.answerList[3]
                                                .isCorrect ||
                                            correctAnswerCount <
                                                maxCorrectAnswer
                                        ) {
                                            setCorrectAnswer(3, 'D');
                                        }
                                    }}
                                />
                            </>
                        )}
                    </View>

                    {/* Save Button */}
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                ...styles.button,
                                backgroundColor: '#ED2B2A',
                            }}
                            onPress={() =>
                                handleDeleteQuestion(questionData._id)
                            }
                        >
                            {loadingDelete ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text style={styles.text}>Delete</Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSaveQuestion}
                        >
                            {isLoading ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text style={styles.text}>Save</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: screenWidth - 30,
        backgroundColor: '#fff',
        borderRadius: 20,
    },
    questionIndex: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        width: 30,
        height: 30,
    },
    questionContainer: {
        width: '100%',
        height: '160%',
    },
    settings: {
        marginTop: 10,
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
    },
    settingBtn: {
        borderWidth: 3,
        borderColor: bgColors.lightPurple,
        borderRadius: 99,
        paddingVertical: 5,
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
    },
    label: {
        fontSize: 20,
        fontWeight: 600,
    },

    viewInput: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 16,
        width: '100%',
    },
    input: {
        width: '100%',
        fontSize: 20,
    },
    button: {
        width: '46%',
        backgroundColor: colors.lightPurple,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 14,
        borderRadius: 20,
    },

    text: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
    },

    // Options Modal
    optionsCenteredView: {
        flex: 1,
        paddingTop: 80,
        paddingRight: 20,
        alignItems: 'flex-end',
    },
    optionsModalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    optionsBtn: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 6,
    },
    optionsText: {
        fontSize: 16,
        marginLeft: 10,
    },

    //Time and Question Type Modal
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc',
        padding: 10,
    },
    modalView: {
        width: '100%',
        margin: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 4,
        elevation: 5,
        borderColor: colors.lightPurple,
        borderWidth: 5,
    },
    timeLimitGroup: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timeLimitBtn: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 10,
    },
    timeLimitText: {
        fontSize: 16,
    },
});
