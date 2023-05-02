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
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Layout
import { MainLayout } from 'src/layouts';

// Constant
import { timeLimit } from 'src/constants/time.constant';
import { questionTypes } from 'src/constants/questionTypes.constant';

// Actions
import {
    addQuestion,
    changeActiveQuestionIndex,
    changeActiveQuestionInfo,
    changeQuestionInfo,
    deleteQuestion,
    duplicateQuestion,
} from 'src/slices/creatorSlice';

// Component
import {
    Button,
    CoverImage,
    Header,
    PoolAnswer,
    TrueOrFalseAnswer,
} from 'src/components/creator';
import { bgColors, colors } from 'src/styles/color';

const AddQuestion = ({ navigation }) => {
    // State RTK
    const questionList = useSelector(
        (state) => state.creator.quizData.questionList,
    );
    const activeQuestion = useSelector((state) => state.creator.activeQuestion);
    const isSaved = useSelector((state) => state.creator.isSaved);

    const dispatch = useDispatch();

    // Modal Visible State
    const [optionsModalVisible, setOptionsModalVisible] = useState(false);
    const [timeModalVisible, setTimeModalVisible] = useState(false);
    const [questionTypeModalVisible, setQuestionTypeModalVisible] =
        useState(false);
    const [confirmSaveModalVisible, setConfirmSaveModalVisible] =
        useState(false);
    const [
        confirmDeleteQuestionModalVisible,
        setConfirmDeleteQuestionModalVisible,
    ] = useState(false);

    // Handle Function
    const handleOpenOptionsModal = () => {
        setOptionsModalVisible(true);
    };

    const validateQuestion = () => {
        const questionCondition = activeQuestion.question !== '';
        const answerListCondition = activeQuestion.answerList.every(
            (answer) => answer.answer !== '',
        );
        const correctAnswerCondition = activeQuestion.answerList.some(
            (answer) => answer.isCorrect === true,
        );

        if (!questionCondition) {
            alert('Please enter question');
        } else if (!answerListCondition) {
            alert('Please enter all answers');
        } else if (!correctAnswerCondition) {
            alert('Please choose correct answer');
        }

        switch (activeQuestion.type) {
            case 'pool':
                return (
                    questionCondition &&
                    answerListCondition &&
                    correctAnswerCondition
                );
            case 'trueOrFalse':
                return questionCondition && correctAnswerCondition;
            default:
                break;
        }
    };

    const handlePressSaveQuestion = () => {
        if (validateQuestion()) {
            dispatch(changeQuestionInfo(activeQuestion));
        }
    };

    return (
        <MainLayout
            navigation={navigation}
            header={
                <Header
                    title="Add Question"
                    style={styles.header}
                    navigation={navigation}
                    direct="Creator"
                    options={handleOpenOptionsModal}
                    setConfirmSaveModalVisible={setConfirmSaveModalVisible}
                />
            }
        >
            {/* Pagination */}
            <ScrollView
                contentContainerStyle={styles.pagination}
                horizontal={true}
            >
                {questionList.map((question) => (
                    <TouchableOpacity
                        key={question.index}
                        style={{
                            ...styles.questionIndex,
                            backgroundColor:
                                question.index === activeQuestion.index
                                    ? '#000'
                                    : '#fff',
                        }}
                        onPress={() => {
                            if (!isSaved) {
                                setConfirmSaveModalVisible(true);
                            } else {
                                dispatch(
                                    changeActiveQuestionIndex(question.index),
                                );
                            }
                        }}
                    >
                        <Text
                            style={{
                                color:
                                    question.index === activeQuestion.index
                                        ? '#fff'
                                        : '#000',
                            }}
                        >
                            {question.index + 1}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Question */}
            <ScrollView contentContainerStyle={styles.questionContainer}>
                {/* Add Cover Image Question */}
                <CoverImage />

                {/* Question Settings */}
                <View style={styles.settings}>
                    {/* Time Setting Button */}
                    <TouchableOpacity
                        onPress={() => setTimeModalVisible(!timeModalVisible)}
                        style={styles.settingBtn}
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
                            {activeQuestion.timeLimit} Sec
                        </Text>
                    </TouchableOpacity>

                    {/* Add Question Button */}
                    <TouchableOpacity
                        style={{
                            ...styles.settingBtn,
                            borderWidth: 0,
                            backgroundColor: colors.primary,
                        }}
                        onPress={() => {
                            if (!isSaved) {
                                setConfirmSaveModalVisible(true);
                            } else {
                                dispatch(addQuestion());
                            }
                        }}
                    >
                        <MaterialCommunityIcons
                            name="plus"
                            size={25}
                            color="#fff"
                            style={{
                                paddingHorizontal: 10,
                            }}
                        />
                    </TouchableOpacity>

                    {/* Type Question Setting Button */}
                    <TouchableOpacity
                        onPress={() =>
                            setQuestionTypeModalVisible(
                                !questionTypeModalVisible,
                            )
                        }
                        style={styles.settingBtn}
                    >
                        <Text
                            style={{
                                fontWeight: 700,
                            }}
                        >
                            {activeQuestion.type}
                        </Text>
                        <MaterialCommunityIcons
                            name="chevron-down"
                            size={25}
                            color={colors.lightPurple}
                        />
                    </TouchableOpacity>

                    {/* Time Setting Modal */}
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={timeModalVisible}
                        onRequestClose={() => {
                            setTimeModalVisible(!timeModalVisible);
                        }}
                    >
                        <Pressable
                            style={styles.centeredView}
                            onPress={() =>
                                setTimeModalVisible(!timeModalVisible)
                            }
                        >
                            <Pressable style={styles.modalView}>
                                <Text
                                    style={{
                                        fontSize: 30,
                                        fontWeight: 600,
                                    }}
                                >
                                    Time limit
                                </Text>

                                <View style={styles.timeLimitGroup}>
                                    {timeLimit.map((time) => (
                                        <TouchableOpacity
                                            key={time}
                                            style={{
                                                ...styles.timeLimitBtn,
                                                backgroundColor:
                                                    activeQuestion.timeLimit ===
                                                    time
                                                        ? colors.pink
                                                        : bgColors.lightPurple,
                                            }}
                                            onPress={() => {
                                                dispatch(
                                                    changeActiveQuestionInfo({
                                                        type: 'timeLimit',
                                                        value: time,
                                                    }),
                                                );
                                                setTimeModalVisible(
                                                    !timeModalVisible,
                                                );
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    ...styles.timeLimitText,
                                                    color:
                                                        activeQuestion.timeLimit ===
                                                        time
                                                            ? '#fff'
                                                            : '#000',
                                                }}
                                            >
                                                {time} sec
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </Pressable>
                        </Pressable>
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
                        <Pressable
                            style={styles.centeredView}
                            onPress={() =>
                                setQuestionTypeModalVisible(
                                    !questionTypeModalVisible,
                                )
                            }
                        >
                            <Pressable style={styles.modalView}>
                                <Text
                                    style={{
                                        fontSize: 30,
                                        fontWeight: 600,
                                    }}
                                >
                                    Question Type
                                </Text>

                                <View style={styles.timeLimitGroup}>
                                    {questionTypes.map((type) => (
                                        <TouchableOpacity
                                            key={type}
                                            style={{
                                                ...styles.timeLimitBtn,
                                                backgroundColor:
                                                    activeQuestion.type === type
                                                        ? colors.pink
                                                        : bgColors.lightPurple,
                                                width: '45%',
                                            }}
                                            onPress={() => {
                                                dispatch(
                                                    changeActiveQuestionInfo({
                                                        type: 'type',
                                                        value: type,
                                                    }),
                                                    setQuestionTypeModalVisible(
                                                        !questionTypeModalVisible,
                                                    ),
                                                );
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    ...styles.timeLimitText,
                                                    color:
                                                        activeQuestion.type ===
                                                        type
                                                            ? '#fff'
                                                            : '#000',
                                                }}
                                            >
                                                {type}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </Pressable>
                        </Pressable>
                    </Modal>
                </View>

                {/* Question title */}
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={{ ...styles.input, marginTop: 5 }}
                        placeholder="Enter your question"
                        value={activeQuestion.question}
                        onChangeText={(value) => {
                            dispatch(
                                changeActiveQuestionInfo({
                                    type: 'question',
                                    value,
                                }),
                            );
                        }}
                    />
                </View>

                {/* Answer Choices */}
                <View style={{ marginVertical: 10 }}>
                    <Text style={styles.label}>Answers</Text>
                    {/* Pool  */}
                    {activeQuestion.type === 'pool' && <PoolAnswer />}

                    {/* True Or False */}
                    {activeQuestion.type === 'trueOrFalse' && (
                        <TrueOrFalseAnswer />
                    )}
                </View>

                {/* Save Button */}
                <Button
                    title="Save question"
                    handlePress={handlePressSaveQuestion}
                />
            </ScrollView>

            {/* Options Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={optionsModalVisible}
                onRequestClose={() => {
                    setOptionsModalVisible(!optionsModalVisible);
                }}
            >
                <Pressable
                    style={styles.optionsCenteredView}
                    onPress={() => setOptionsModalVisible(!optionsModalVisible)}
                >
                    <Pressable style={styles.optionsModalView}>
                        {/* Duplicate Button */}
                        <TouchableOpacity
                            style={styles.optionsBtn}
                            onPress={() => {
                                if (!isSaved) {
                                    setOptionsModalVisible(
                                        !optionsModalVisible,
                                    );
                                    setConfirmSaveModalVisible(true);
                                } else {
                                    dispatch(duplicateQuestion(activeQuestion));
                                    setOptionsModalVisible(
                                        !optionsModalVisible,
                                    );
                                }
                            }}
                        >
                            <MaterialCommunityIcons
                                name="content-duplicate"
                                size={20}
                            />
                            <Text style={styles.optionsText}>Duplicate</Text>
                        </TouchableOpacity>

                        {/* Delete Button */}
                        <TouchableOpacity
                            style={{ ...styles.optionsBtn, marginTop: 10 }}
                            onPress={() => {
                                setOptionsModalVisible(!optionsModalVisible);
                                setConfirmDeleteQuestionModalVisible(true);
                            }}
                        >
                            <MaterialCommunityIcons
                                name="trash-can-outline"
                                size={20}
                                color="red"
                            />
                            <Text
                                style={{
                                    ...styles.optionsText,
                                    color: 'red',
                                    marginLeft: 10,
                                }}
                            >
                                Delete
                            </Text>
                        </TouchableOpacity>
                    </Pressable>
                </Pressable>
            </Modal>

            {/* Confirm Save Modal*/}
            <Modal
                animationType="fade"
                transparent={true}
                visible={confirmSaveModalVisible}
                onRequestClose={() => {
                    setConfirmSaveModalVisible(!confirmSaveModalVisible);
                }}
            >
                <Pressable
                    style={styles.centeredView}
                    onPress={() =>
                        setConfirmSaveModalVisible(!confirmSaveModalVisible)
                    }
                >
                    <Pressable style={styles.modalView}>
                        <Text
                            style={{
                                width: '100%',
                                fontSize: 28,
                                fontWeight: 700,
                                textAlign: 'left',
                            }}
                        >
                            Save latest changes?
                        </Text>
                        <Text
                            style={{
                                width: '100%',
                                textAlign: 'left',
                                marginTop: 10,
                                fontSize: 18,
                            }}
                        >
                            Hold on - Please save your question before
                            continuing!
                        </Text>
                        <View
                            style={{
                                marginTop: 20,
                                flexDirection: 'row',
                                width: '100%',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Button
                                title="Back to edit"
                                width="48%"
                                backgroundColor={colors.pink}
                                handlePress={() =>
                                    setConfirmSaveModalVisible(false)
                                }
                            />
                            <Button
                                title="Save"
                                width="48%"
                                backgroundColor={bgColors.green}
                                handlePress={() => {
                                    handlePressSaveQuestion();
                                    setConfirmSaveModalVisible(false);
                                }}
                            />
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>

            {/* Confirm Delete Question Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={confirmDeleteQuestionModalVisible}
                onRequestClose={() => {
                    setConfirmDeleteQuestionModalVisible(
                        !confirmDeleteQuestionModalVisible,
                    );
                }}
            >
                <Pressable
                    style={styles.centeredView}
                    onPress={() =>
                        setConfirmDeleteQuestionModalVisible(
                            !confirmDeleteQuestionModalVisible,
                        )
                    }
                >
                    <Pressable style={styles.modalView}>
                        <Text
                            style={{
                                width: '100%',
                                fontSize: 28,
                                fontWeight: 700,
                                textAlign: 'left',
                            }}
                        >
                            Delete question?
                        </Text>
                        <Text
                            style={{
                                width: '100%',
                                textAlign: 'left',
                                marginTop: 10,
                                fontSize: 18,
                            }}
                        >
                            Are you sure you want to delete this question?
                        </Text>
                        <View
                            style={{
                                marginTop: 20,
                                flexDirection: 'row',
                                width: '100%',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Button
                                title="Cancel"
                                width="48%"
                                backgroundColor={colors.pink}
                                handlePress={() =>
                                    setConfirmDeleteQuestionModalVisible(false)
                                }
                            />
                            <Button
                                title="Delete"
                                width="48%"
                                backgroundColor={bgColors.green}
                                handlePress={() => {
                                    dispatch(
                                        deleteQuestion(activeQuestion.index),
                                    );
                                    setConfirmDeleteQuestionModalVisible(false);
                                }}
                            />
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </MainLayout>
    );
};

export default AddQuestion;

const styles = StyleSheet.create({
    pagination: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 17,
        overflow: 'scroll',
        paddingVertical: 6,
    },
    questionIndex: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        width: 30,
        height: 30,
        borderRadius: 999,
    },
    questionContainer: {
        marginTop: 10,
        paddingBottom: 10,
    },
    settings: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    settingBtn: {
        borderWidth: 3,
        borderColor: bgColors.lightPurple,
        borderRadius: 99,
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 5,
    },
    label: {
        fontSize: 20,
        fontWeight: 600,
    },
    input: {
        marginTop: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 18,
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
