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
} from 'react-native';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Layout
import { MainLayout } from 'src/layouts';

// Actions
import { changeQuizInfo } from 'src/slices/creatorSlice';

// Component
import { Header, Button, CoverImage } from 'src/components/creator';

const Creator = ({ navigation }) => {
    // State RTK
    const quiz = useSelector((state) => state.creator.quizData);

    const dispatch = useDispatch();

    // Modal State
    const [optionsModalVisible, setOptionsModalVisible] = useState(false);

    const handleChangeQuizInfo = (value) => {
        dispatch(changeQuizInfo(value));
    };

    const validateQuiz = () => {
        if (quiz.title && quiz.category) {
            return true;
        } else if (quiz.title === '') {
            alert('Please enter Quiz title!');
        } else {
            alert('Please choose Quiz category!');
        }
        return false;
    };

    const handlePress = () => {
        if (validateQuiz()) {
            navigation.navigate('AddQuestion');
        }
    };

    return (
        <MainLayout
            header={
                <Header
                    title="Quiz Creator"
                    style={styles.header}
                    navigation={navigation}
                    direct="Home"
                    options={() => setOptionsModalVisible(true)}
                />
            }
        >
            <ScrollView contentContainerStyle={{ paddingBottom: 15 }}>
                {/* Add Cover Image Quiz*/}
                <CoverImage />

                {/* Input Title */}
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.inputTitle}
                        placeholder="Enter quiz title"
                        onChangeText={(value) =>
                            handleChangeQuizInfo({ type: 'title', value })
                        }
                    />
                </View>

                {/* Choose Category */}
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.label}>Category</Text>
                    <TouchableOpacity
                        style={styles.chooseCategory}
                        onPress={() => {
                            navigation.navigate('ChooseCategory');
                        }}
                    >
                        <Text
                            style={{
                                color: 'gray',
                                fontSize: 18,
                            }}
                        >
                            {quiz.category || 'Choose category'}
                        </Text>
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            style={{ color: 'gray' }}
                        />
                    </TouchableOpacity>
                </View>

                {/* Input Description */}
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.label}>Description (optional)</Text>
                    <TextInput
                        style={styles.inputDesc}
                        placeholder="Enter quiz description"
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(value) =>
                            handleChangeQuizInfo({
                                type: 'description',
                                value,
                            })
                        }
                    />
                </View>
            </ScrollView>

            <Button title="Library question" handlePress={handlePress} />

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
                        {/* Overview Button */}
                        <TouchableOpacity
                            style={styles.optionsBtn}
                            onPress={() => {
                                setOptionsModalVisible(false);
                                if (validateQuiz()) {
                                    navigation.navigate('Overview');
                                }
                            }}
                        >
                            <Ionicons name="pie-chart-outline" size={20} />
                            <Text style={styles.optionsText}>Overview</Text>
                        </TouchableOpacity>

                        {/* Delete Button */}
                        <TouchableOpacity
                            style={{ ...styles.optionsBtn, marginTop: 10 }}
                            onPress={() => {
                                setOptionsModalVisible(!optionsModalVisible);
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
        </MainLayout>
    );
};

export default Creator;

const styles = StyleSheet.create({
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
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 40,
    },
    chooseCategory: {
        marginTop: 5,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
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
});
