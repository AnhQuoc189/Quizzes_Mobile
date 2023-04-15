// Library
import { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    LogBox,
    Modal,
    TextInput,
    Pressable,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Layout
import { MainLayout } from 'src/layouts';

// Constant
import { timeLimit } from 'src/constants/time.constant';

// Component
import { Button, CoverImage, Header } from 'src/components/creator';
import { bgColors, colors } from 'src/styles/color';
import { questionTypes } from 'src/constants/questionTypes.constant';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

const AddQuestion = ({ navigation, route }) => {
    const { quizDataCreator, setQuizDataCreator } = route.params;

    const [quizData, setQuizData] = useState(quizDataCreator);

    const [activeQuestion, setActiveQuestion] = useState(
        quizData.questionList[0],
    );

    const [activeTimeLimit, setActiveTimeLimit] = useState(
        activeQuestion.timeLimit,
    );

    const [activeType, setActiveType] = useState(activeQuestion.type);

    // Modal Visible State
    const [optionsModalVisible, setOptionsModalVisible] = useState(false);
    const [timeModalVisible, setTimeModalVisible] = useState(false);
    const [questionTypeModalVisible, setQuestionTypeModalVisible] =
        useState(false);

    // Handle Function
    const handleOpenOptionsModal = () => {
        setOptionsModalVisible(true);
    };

    const handlePressQuestionIndex = (question) => {
        setActiveQuestion(question);
        setActiveTimeLimit(question.timeLimit);
        setActiveType(question.type);
    };

    const handlePressSaveQuestion = (activeQuestion) => {
        setQuizData((prevState) => ({
            ...prevState,
            questionList: [
                ...prevState.questionList.slice(0, activeQuestion.index),
                activeQuestion,
                ...prevState.questionList.slice(
                    activeQuestion.index + 1,
                    prevState.questionList.length,
                ),
            ],
        }));

        setQuizDataCreator((prevState) => ({
            ...prevState,
            questionList: [
                ...prevState.questionList.slice(0, activeQuestion.index),
                activeQuestion,
                ...prevState.questionList.slice(
                    activeQuestion.index + 1,
                    prevState.questionList.length,
                ),
            ],
        }));

        alert('Save successfully!');
    };

    const handlePressAddQuestion = () => {
        const newQuestion = {
            index: quizData.numberOfQuestion,
            question: '',
            type: 'pool',
            timeLimit: 5,
            answerList: [
                {
                    answer: '',
                    isCorrect: false,
                },
                {
                    answer: '',
                    isCorrect: false,
                },
                {
                    answer: '',
                    isCorrect: false,
                },
                {
                    answer: '',
                    isCorrect: false,
                },
            ],
        };

        setQuizData((prevState) => ({
            ...prevState,
            questionList: [...prevState.questionList, newQuestion],
            numberOfQuestion: prevState.numberOfQuestion + 1,
        }));

        setQuizDataCreator((prevState) => ({
            ...prevState,
            questionList: [...prevState.questionList, newQuestion],
            numberOfQuestion: prevState.numberOfQuestion + 1,
        }));

        setActiveQuestion(newQuestion);

        alert('Add successfully!');
    };

    const handlePressDeleteQuestion = () => {
        // Prevent empty quiz
        if (quizData.numberOfQuestion === 1) {
            alert('Quiz can not be empty!');
            setOptionsModalVisible(false);
            return;
        }

        setQuizData((prevState) => ({
            ...prevState,
            questionList: prevState.questionList
                .filter((question) => question.index !== activeQuestion.index)
                .map((question, index) => ({
                    ...question,
                    index: index,
                })),
            numberOfQuestion: prevState.numberOfQuestion - 1,
        }));

        setQuizDataCreator((prevState) => ({
            ...prevState,
            questionList: prevState.questionList
                .filter((question) => question.index !== activeQuestion.index)
                .map((question, index) => ({
                    ...question,
                    index: index,
                })),
            numberOfQuestion: prevState.numberOfQuestion - 1,
        }));

        // Reset
        if (activeQuestion.index === quizData.numberOfQuestion - 1) {
            handlePressQuestionIndex(
                quizData.questionList[activeQuestion.index - 1],
            );
        } else {
            // Bug không update lại state ***
            handlePressQuestionIndex(
                quizData.questionList[activeQuestion.index],
            );
        }

        setOptionsModalVisible(false);
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
                />
            }
        >
            {/* Pagination */}
            <ScrollView
                contentContainerStyle={styles.pagination}
                horizontal={true}
            >
                {quizData.questionList.map((question) => (
                    <TouchableOpacity
                        key={question.index}
                        style={{
                            ...styles.questionIndex,
                            backgroundColor:
                                question.index === activeQuestion.index
                                    ? '#000'
                                    : '#fff',
                        }}
                        onPress={() => handlePressQuestionIndex(question)}
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
                        onPress={handlePressAddQuestion}
                    >
                        <MaterialCommunityIcons
                            name="plus"
                            size={25}
                            color="#fff"
                            style={{
                                paddingHorizontal: 10,
                            }}
                        />
                        {/* <Text
                            style={{
                                color: '#fff',
                                fontWeight: 700,
                            }}
                        >
                            Add
                        </Text> */}
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
                                                    activeTimeLimit === time
                                                        ? colors.pink
                                                        : bgColors.lightPurple,
                                            }}
                                            onPress={() =>
                                                setActiveTimeLimit(time)
                                            }
                                        >
                                            <Text
                                                style={{
                                                    ...styles.timeLimitText,
                                                    color:
                                                        activeTimeLimit === time
                                                            ? '#fff'
                                                            : '#000',
                                                }}
                                            >
                                                {time} sec
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>

                                <View style={{ width: '80%', marginTop: 20 }}>
                                    <Button
                                        title="Done"
                                        handlePress={() => {
                                            setTimeModalVisible(
                                                !timeModalVisible,
                                            );
                                            setActiveQuestion((prevState) => ({
                                                ...prevState,
                                                timeLimit: activeTimeLimit,
                                            }));
                                        }}
                                    />
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
                                                    activeType === type
                                                        ? colors.pink
                                                        : bgColors.lightPurple,
                                                width: '45%',
                                            }}
                                            onPress={() => setActiveType(type)}
                                        >
                                            <Text
                                                style={{
                                                    ...styles.timeLimitText,
                                                    color:
                                                        activeType === type
                                                            ? '#fff'
                                                            : '#000',
                                                }}
                                            >
                                                {type}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>

                                <View style={{ width: '80%', marginTop: 20 }}>
                                    <Button
                                        title="Done"
                                        handlePress={() => {
                                            setQuestionTypeModalVisible(
                                                !questionTypeModalVisible,
                                            );
                                            setActiveQuestion((prevState) => ({
                                                ...prevState,
                                                type: activeType,
                                            }));
                                        }}
                                    />
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
                    />
                </View>

                {/* Answer Choices */}
                <View style={{ marginVertical: 10 }}>
                    <Text style={styles.label}>Answers</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter choice answer 1"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter choice answer 2"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter choice answer 3"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter choice answer 4"
                    />
                </View>

                {/* Save Button */}
                <Button
                    title="Save question"
                    handlePress={handlePressSaveQuestion}
                    value={activeQuestion}
                />
            </ScrollView>

            {/* Options modal */}
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
                        <TouchableOpacity style={styles.optionsBtn}>
                            <MaterialCommunityIcons
                                name="content-duplicate"
                                size={20}
                            />
                            <Text style={styles.optionsText}>Duplicate</Text>
                        </TouchableOpacity>

                        {/* Delete Button */}
                        <TouchableOpacity
                            style={{ ...styles.optionsBtn, marginTop: 10 }}
                            onPress={handlePressDeleteQuestion}
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
        </MainLayout>
    );
};

export default AddQuestion;

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
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

    // Options modal
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
