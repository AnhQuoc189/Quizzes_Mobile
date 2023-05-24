import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDeleteQuizMutation } from 'src/services/quizApi';
import { useSelector, useDispatch } from 'react-redux';
import { deleteQuiz } from 'src/slices/quizSlice';

export default function EditOrDelete({ onClose, quizData, navigation }) {
    const dispatch = useDispatch();
    const [point, setPoint] = useState();
    const userData = useSelector((state) => state.auths?.authData);
    const accessToken = userData?.data?.accessToken;

    useEffect(() => {
        let Point = 0;
        let pointsPerQuestion = quizData.pointsPerQuestion;
        console.log(pointsPerQuestion);
        quizData.questionList.map((question) => {
            console.log(question?.pointType);
            // if (question?.pointType === 'Standard') {
            //     Point += pointsPerQuestion;
            // }
            switch (question.pointType) {
                case 'Standard':
                    Point += pointsPerQuestion;
                    break;
                case 'Double':
                    Point += pointsPerQuestion * 2;
                    break;
                default:
                    break;
            }
        });
    }, []);

    const [removeQuiz] = useDeleteQuizMutation();

    handleDelete = async () => {
        // console.log({ accessToken, quizId: quizData._id });

        const { data } = await removeQuiz({
            accessToken,
            quizId: quizData._id,
        });
        if (data) {
            onClose();
            dispatch(deleteQuiz(quizData));
            navigation.navigate('Home');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <View>
                    <Text style={{ color: 'gray' }}> SPORTS</Text>
                    <Text style={{ fontWeight: 700, fontSize: 20 }}>
                        {quizData.name}
                    </Text>
                </View>
                <TouchableOpacity onPress={onClose}>
                    <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.questionPoint}>
                <View style={styles.questionPointItem}>
                    <AntDesign
                        name="questioncircle"
                        size={30}
                        color="#865DFF"
                    />
                    <Text>{quizData.questionList.length} question</Text>
                </View>
                <View style={styles.questionPointItem}>
                    <AntDesign name="codepen-circle" size={30} color="black" />
                    <Text>{point} points</Text>
                </View>
            </View>
            <View style={styles.decription}>
                <Text style={{ color: 'gray', fontWeight: 500 }}>
                    DESCRIPTION
                </Text>
                <Text style={{ fontSize: 16 }}>
                    Any time is a good time for a quiz and even better if that
                    happens to be a football themed quiz!
                </Text>
            </View>
            <View style={styles.creator}>
                <View style={styles.infocreator}>
                    <Image
                        style={styles.image}
                        source={{
                            uri: 'https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-cute.jpg?ssl\u003d1',
                        }}
                    />
                    <View>
                        <Text>{quizData.creatorName}</Text>
                        <Text>Creator</Text>
                    </View>
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.editButton}>
                    <View>
                        <Text style={styles.textEdit}>Edit</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={handleDelete}
                >
                    <View>
                        <Text style={styles.textDelete}>Delete</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '60%',
        width: '94%',
        backgroundColor: '#fff',
        borderRadius: 20,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        width: '90%',
        height: '15%',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    questionPoint: {
        width: '90%',
        height: '12%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#E0DEF9',
        borderRadius: 20,
        marginBottom: 20,
    },

    questionPointItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    decription: {
        width: '90%',
        height: '20%',
        gap: 10,
    },

    image: {
        width: 40,
        height: 40,
        borderRadius: 50,
        resizeMode: 'contain',
    },

    creator: {
        width: '90%',
        height: '25%',
        marginTop: 20,
    },

    infocreator: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },

    footer: {
        width: '90%',
        height: '15%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    editButton: {
        width: '40%',
        height: '70%',
        borderRadius: 20,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#00FFCA',
    },

    textEdit: {
        textAlign: 'center',
        color: '#865DFF',
        fontWeight: 500,
    },

    deleteButton: {
        width: '40%',
        height: '70%',
        borderRadius: 20,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#ED2B2A',
    },

    textDelete: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 500,
    },
});
