// Library
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Modal,
    Pressable,
    ToastAndroid,
} from 'react-native';
import { useState, useEffect } from 'react';

//Redux
import { useDispatch, useSelector } from 'react-redux';

//Icon
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';
import ImageUpload from 'src/components/creator/imageUpload';
//constant Modal
import { typeQuiz } from 'src/constants/public.constant';
import { PointsPer } from 'src/constants/pointPerQuestion.constant';
import { categories } from 'src/constants/category.constant';
import { bgColors, colors } from 'src/styles/color';

// Layout
import { MainLayout } from 'src/layouts';

// Actions
import { changeQuizInfo } from 'src/slices/creatorSlice';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

// Component
import { Header, Button, CoverImage } from 'src/components/creator';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { ModalQuiz, ModalQuizArray, ModalNote } from './Modal';

import { useCreateQuizMutation } from 'src/services/quizApi';
import { useUpdateQuizMutation } from 'src/services/quizApi';
import { createQuiz } from 'src/slices/quizSlice';
import { updateQuiz } from 'src/slices/quizSlice';

const categorieArary = categories.map((item) => item.name);
const InitQuizData = {
    name: '',
    backgroundImage: '',
    description: '',
    pointsPerQuestion: 1,
    numberOfQuestions: 0,
    isPublic: true,
    tags: [],
    questionList: [],
};

export default Creator = ({ navigation, ...props }) => {
    const [coverImage, setCoverImage] = useState(null);

    const quiz = props.route.params.quiz;
    const creator = props.route.params.creator;

    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auths?.authData);
    const userName = userData?.data?.user?.userName;
    const accessToken = userData?.data?.accessToken;

    const [quizData, setQuizData] = useState({
        ...InitQuizData,
        creatorName: userName,
    });

    useFocusEffect(
        useCallback(() => {
            if (quiz && !creator) {
                const Quiz = {
                    name: quiz.name,
                    backgroundImage: quiz.backgroundImage || '',
                    description: quiz.description,
                    pointsPerQuestion: quiz.pointsPerQuestion,
                    numberOfQuestions: quiz.numberOfQuestions,
                    isPublic: quiz.isPublic,
                    tags: quiz.tags,
                    questionList: quiz.questionList,
                };
                setQuizData({
                    ...Quiz,
                    _id: quiz._id,
                    creatorName: userName,
                    backgroundImage: quiz.backgroundImage,
                });
            } else {
                setQuizData({
                    ...InitQuizData,
                    creatorName: userName,
                    backgroundColor: '',
                });
            }
        }, [quiz]),
    );

    const {
        name,
        creatorName,
        backgroundImage,
        description,
        pointsPerQuestion,
        numberOfQuestions,
        isPublic,
        tags,
        questionList,
    } = quizData;

    // const { backgroundImage } = creator ? '' : quizData.backgroundImage;

    const quizType = isPublic ? 'Public' : 'Private';

    const [isPublicQuizModal, setIsPublicQuizModal] = useState(false);
    const [isCategoriesModal, setIsCategoriesModal] = useState(false);
    const [pointperQuestionModal, setPointperQuestionModal] = useState(false);
    const [saveQuizModal, setSaveQuizModal] = useState(false);
    const [load, setLoad] = useState(false);

    const [InitQuiz, { isLoading, error }] = useCreateQuizMutation();
    const [InitUpdate] = useUpdateQuizMutation();

    useEffect(() => {
        if (error) {
            console.log(error.data);
            switch (error.data) {
                case 'Quiz already exists':
                    ToastAndroid;
                    setSaveQuizModal(!saveQuizModal);
                    showToasts('error', 'Quiz valid', 'Quiz already exists!');

                    break;
                case 'All fields are mandatory!':
                    setSaveQuizModal(!saveQuizModal);
                    showToasts(
                        'error',
                        'Quiz valid',
                        'Please fill in full infomation',
                    );
                    break;
                default:
                    break;
            }
        }
    }, [error]);

    const handleQuizChange = (key, name) => {
        setQuizData({ ...quizData, [name]: key });
    };

    const showToasts = (status, text1, text2) => {
        Toast.show({
            type: status,
            text1: text1,
            text2: text2,
            visibilityTime: 2500,
            topOffset: 60,
        });
    };

    const handleSaveQuiz = async () => {
        if (creator) {
            const { data } = await InitQuiz({
                accessToken,
                quizData: {
                    ...quizData,
                    backgroundImage: coverImage,
                    creatorName: userName,
                },
            });
            if (data) {
                setSaveQuizModal(!saveQuizModal);
                ToastAndroid.show(
                    'Creat Quiz successfully',
                    ToastAndroid.SHORT,
                );
                dispatch(createQuiz(data));
                setQuizData({
                    ...InitQuizData,
                    creatorName: userName,
                });
                navigation.navigate('AddQuestion', {
                    quiz: data,
                    creator: true,
                });
            }
        } else {
            const { data, isLoading } = await InitUpdate({
                accessToken,
                quizId: quizData._id,
                updateQuiz: { ...quizData, backgroundImage: coverImage },
            });
            if (data) {
                setSaveQuizModal(!saveQuizModal);
                showToasts(
                    'success',
                    'Successfully !',
                    'Save quiz successfully!',
                );
                dispatch(updateQuiz(data));
            }
        }
        // const uploadImage = () => {
        //     if (!coverImage) return alert('file not found!');
        //     // else return console.log(file);
        //     const formData = new FormData();
        //     formData.append('file', `data:image/jpeg;base64,${file}`);
        //     formData.append('upload_preset', 'xs3m3hri');
        //     formData.append('folder', 'examples/test'); // Add this line to specify the folder
        //     fetch(`https://api.cloudinary.com/v1_1/dg4vxltmf/image/upload`, {
        //         method: 'POST',
        //         body: formData,
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //             'X-Requested-With': 'XMLHttpRequest',
        //         },
        //     })
        //         .then((response) => response.json())
        //         .then((data) => {
        //             console.log(data);
        //             setResult(data?.secure_url);
        //         })
        //         .catch((error) => console.error(error));
        // };
        // uploadImage();
    };

    const showQuestionDetail = () => {
        navigation.navigate('AddQuestion', { quiz, creator: false });
        setSaveQuizModal(!saveQuizModal);
    };

    return (
        <>
            <MainLayout
                navigation={navigation}
                header={
                    <Header
                        title={creator ? 'Quiz Creator' : 'Quiz Edit'}
                        style={styles.header}
                        navigation={navigation}
                        direct="Home"
                        options={() => {
                            setSaveQuizModal(!saveQuizModal);
                        }}
                        creator={creator}
                        quiz={quiz}
                    />
                }
            >
                <ScrollView
                    contentContainerStyle={{
                        paddingBottom: 15,
                        width: '80%',
                        height: '140%',
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Add Cover Image Quiz*/}
                    {/* <CoverImage backgroundImage={backgroundImage} /> */}
                    <ImageUpload
                        onChange={setCoverImage}
                        picture={backgroundImage}
                        creator={true}
                    />

                    <View style={styles.settings}>
                        <TouchableOpacity
                            onPress={() =>
                                setIsPublicQuizModal(!isPublicQuizModal)
                            }
                            style={{ ...styles.settingBtn, width: '30%' }}
                        >
                            <MaterialIcons
                                name="public"
                                size={25}
                                color={colors.lightPurple}
                            />
                            <Text
                                style={{
                                    fontWeight: 700,
                                }}
                            >
                                {quizType}
                            </Text>
                        </TouchableOpacity>

                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={isPublicQuizModal}
                            onRequestClose={() => {
                                setIsPublicQuizModal(!isPublicQuizModal);
                            }}
                        >
                            <ModalQuiz
                                title="TypeQuiz"
                                arrayModal={typeQuiz}
                                stateModal={isPublicQuizModal}
                                setStateModal={setIsPublicQuizModal}
                                handleQuizChange={(isPublic) => {
                                    const bol =
                                        isPublic === 'Public' ? true : false;
                                    handleQuizChange(bol, 'isPublic');
                                }}
                                value={quizType}
                            />
                        </Modal>

                        <TouchableOpacity
                            onPress={() =>
                                setPointperQuestionModal(!pointperQuestionModal)
                            }
                            style={{ ...styles.settingBtn, width: '30%' }}
                        >
                            <MaterialIcons
                                name="public"
                                size={25}
                                color={colors.lightPurple}
                            />
                            <Text
                                style={{
                                    fontWeight: 700,
                                }}
                            >
                                {/* {activeQuestion.timeLimit} Sec */}
                                {pointsPerQuestion} Point
                            </Text>
                        </TouchableOpacity>

                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={pointperQuestionModal}
                            onRequestClose={() => {
                                setPointperQuestionModal(
                                    !pointperQuestionModal,
                                );
                            }}
                        >
                            <ModalQuiz
                                title="PointsPerQuestion"
                                arrayModal={PointsPer}
                                stateModal={pointperQuestionModal}
                                setStateModal={setPointperQuestionModal}
                                handleQuizChange={(point) =>
                                    handleQuizChange(point, 'pointsPerQuestion')
                                }
                                value={pointsPerQuestion}
                            />
                        </Modal>

                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={saveQuizModal}
                            onRequestClose={() => {
                                setSaveQuizModal(!saveQuizModal);
                            }}
                        >
                            <ModalNote
                                title="Save Quiz"
                                note="Hold on - Please save your quiz before
                                    continuing!"
                                stateModal={saveQuizModal}
                                setStateModal={setSaveQuizModal}
                                handlePress={() => handleSaveQuiz()}
                                // handleEditQuiz
                                showQuestionDetail={() => showQuestionDetail()}
                                loading={isLoading}
                                creator={creator}
                            />
                        </Modal>
                    </View>

                    {/* Input Title */}
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.label}>Title</Text>
                        <TextInput
                            value={name ? name : ''}
                            style={styles.inputTitle}
                            placeholder="Enter quiz title"
                            onChangeText={(value) =>
                                handleQuizChange(value, 'name')
                            }
                        />
                    </View>

                    {/* Choose Category */}
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.label}>Category</Text>
                        <TouchableOpacity
                            style={styles.chooseCategory}
                            onPress={() => {
                                setIsCategoriesModal(!isCategoriesModal);
                            }}
                        >
                            <View
                                style={{
                                    width: '120%',
                                    justifyContent: 'space-around',
                                    flexDirection: 'row',
                                    paddingHorizontal: 20,
                                    right: 30,
                                }}
                            >
                                <View
                                    style={{
                                        justifyContent: 'flex-start',
                                        width: '70%',
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: 'gray',
                                            fontSize: 18,
                                        }}
                                    >
                                        {tags}
                                        {!tags.length && 'Choose Categories'}
                                    </Text>
                                </View>
                                <View>
                                    <Ionicons
                                        name="chevron-forward"
                                        size={20}
                                        style={{ color: 'gray' }}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={isCategoriesModal}
                        onRequestClose={() => {
                            setIsCategoriesModal(!isCategoriesModal);
                        }}
                    >
                        <ModalQuizArray
                            title="Categories"
                            arrayModal={categorieArary}
                            stateModal={isCategoriesModal}
                            setStateModal={setIsCategoriesModal}
                            handleQuizChange={(category) => {
                                if (!tags.includes(category)) {
                                    setQuizData({
                                        ...quizData,
                                        tags: [...quizData.tags, category],
                                    });
                                } else {
                                    setQuizData({
                                        ...quizData,
                                        tags: quizData.tags.filter(
                                            (item) => item !== category,
                                        ),
                                    });
                                }
                            }}
                            value={tags}
                        />
                    </Modal>

                    {/* Input Description */}
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.label}>Description (optional)</Text>
                        <TextInput
                            value={description}
                            style={styles.inputDesc}
                            placeholder="Enter quiz description"
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={(value) =>
                                handleQuizChange(value, 'description')
                            }
                        />
                    </View>
                </ScrollView>

                {/* <Button
                title="Add question"
                // direct="AddQuestion"
                navigation={navigation}
                handlePress={handleAddQuestion}
            /> */}
            </MainLayout>
            <Toast />
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        fontSize: 20,
        fontWeight: 600,
    },
    inputTitle: {
        marginTop: 5,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 18,
    },
    inputDesc: {
        marginTop: 5,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 15,
        fontSize: 18,
        height: '38%',
        paddingHorizontal: 20,
        // paddingTop: 10,
        // paddingBottom: 40,
    },
    chooseCategory: {
        // marginTop: 5,
        // width: '82%',
        // display: 'flex',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        // borderColor: 'gray',
        // borderWidth: 1,
        // borderRadius: 15,
        // paddingVertical: 10,
        // paddingHorizontal: 20,
        width: '100%',
        flexDirection: 'row',
        marginTop: 5,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 15,
        paddingVertical: 10,
        // paddingHorizontal: 20,
        fontSize: 18,
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
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        width: '31%',
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
