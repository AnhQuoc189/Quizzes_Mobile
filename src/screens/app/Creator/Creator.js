// Library
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Layout
import { MainLayout } from 'src/layouts';

// Actions
import { changeQuizInfo } from 'src/slices/creatorSlice';

// Component
import { Header, Button, CoverImage } from 'src/components/creator';
import ImageUpload from 'src/components/creator/ImageUpload';
import { useState } from 'react';

export default Creator = ({ navigation }) => {
    const [coverImage, setCoverImage] = useState(null);
    const [result, setResult] = useState(''); // result is the url when upload is successful
    //only call when submit quiz or question
    const uploadImage = () => {
        if (!coverImage) return alert('file not found!');
        // else return console.log(file);
        const formData = new FormData();
        formData.append('file', `data:image/jpeg;base64,${file}`);
        formData.append('upload_preset', 'xs3m3hri');
        formData.append('folder', 'examples/test'); // Add this line to specify the folder
        fetch(`https://api.cloudinary.com/v1_1/dg4vxltmf/image/upload`, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setResult(data?.secure_url);
            })
            .catch((error) => console.error(error));
    };
    // const quiz = useSelector((state) => state.creator.quizData);

    // const dispatch = useDispatch();

    // const handleChangeQuizInfo = (value) => {
    //     dispatch(changeQuizInfo(value));
    // };

    // const validateQuiz = () => {
    //     if (quiz.title && quiz.category) {
    //         return true;
    //     } else if (quiz.title === '') {
    //         alert('Please enter Quiz title!');
    //     } else {
    //         alert('Please choose Quiz category!');
    //     }
    //     return false;
    // };

    // const handlePress = () => {
    //     if (validateQuiz()) {
    //         navigation.navigate('AddQuestion');
    //     }
    // };

    return (
        <MainLayout
            navigation={navigation}
            header={
                <Header
                    title="Quiz Creator"
                    style={styles.header}
                    navigation={navigation}
                    direct="Home"
                    options={() => {}}
                />
            }
        >
            <ScrollView
                contentContainerStyle={{ paddingBottom: 15 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Add Cover Image Quiz*/}

                <ImageUpload onChange={setCoverImage} />

                {/* Input Title */}
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.inputTitle}
                        placeholder="Enter quiz title"
                        // onChangeText={(value) =>
                        //     handleChangeQuizInfo({ type: 'title', value })
                        // }
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
                            {/* {quiz.category || 'Choose category'} */}
                            Choose category
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
                        // onChangeText={(value) =>
                        //     handleChangeDescription({
                        //         type: 'description',
                        //         value,
                        //     })
                        // }
                    />
                </View>
            </ScrollView>

            <Button
                title="Library question"
                direct="AddQuestion"
                navigation={navigation}
            />
        </MainLayout>
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
