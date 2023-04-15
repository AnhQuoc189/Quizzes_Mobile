// Library
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from 'react-native';
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Layout
import { MainLayout } from 'src/layouts';

// Component
import { Header, Button, CoverImage } from 'src/components/creator';

const intialQuizData = {
    title: '',
    category: '',
    description: '',
    numberOfQuestion: 1,
    isPublic: true,
    questionList: [
        {
            index: 0,
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
        },
    ],
};

export default function Creator({ navigation }) {
    const [quizData, setQuizData] = useState(intialQuizData);

    const handleChangeTitle = (value) => {
        setQuizData((prevState) => ({
            ...prevState,
            title: value,
        }));
    };

    const handleChangeCategory = (category) => {
        setQuizData((prevState) => ({
            ...prevState,
            category: category,
        }));
    };

    const handleChangeDescription = (value) => {
        setQuizData((prevState) => ({
            ...prevState,
            description: value,
        }));
    };

    return (
        <MainLayout
            navigation={navigation}
            header={
                <Header
                    title="Create Quiz"
                    style={styles.header}
                    navigation={navigation}
                    direct="Home"
                    options={() => {}}
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
                        onChangeText={handleChangeTitle}
                    />
                </View>

                {/* Choose Category */}
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.label}>Category</Text>
                    <TouchableOpacity
                        style={styles.chooseCategory}
                        onPress={() => {
                            navigation.navigate('ChooseCategory', {
                                handleChangeCategory,
                                currentCategory: quizData.category,
                            });
                        }}
                    >
                        <Text
                            style={{
                                color: 'gray',
                                fontSize: 18,
                            }}
                        >
                            {quizData.category || 'Choose category'}
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
                        onChangeText={handleChangeDescription}
                    />
                </View>
            </ScrollView>

            <Button
                title="Library question"
                navigation={navigation}
                direct={'AddQuestion'}
                params={{
                    quizDataCreator: quizData,
                    setQuizDataCreator: setQuizData,
                }}
            />
        </MainLayout>
    );
}

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
});
