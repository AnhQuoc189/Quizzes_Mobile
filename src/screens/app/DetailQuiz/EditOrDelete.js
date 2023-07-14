import React, { useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
    ActivityIndicator,
    ToastAndroid,
    Platform,
    AlertIOS,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDeleteQuizMutation } from 'src/services/quizApi';
import { useImportQuizMutation } from 'src/services/quizApi';
import { useDeleteQuizCommunityMutation } from 'src/services/communityApi';
import { useSelector, useDispatch } from 'react-redux';
import { deleteQuiz, addLibrayQuiz, createQuiz } from 'src/slices/quizSlice';
import { setQuizPlay } from 'src/slices/quizSlice';
import { useFocusEffect } from '@react-navigation/native';
import { removeQuiz } from 'src/slices/communitySlice';

export default function EditOrDelete({
    quizList,
    title,
    avatar,
    onClose,
    quizData,
    navigation,
    mylibrary,
    userType,
    community,
    discover,
}) {
    const dispatch = useDispatch();
    const [point, setPoint] = useState();
    const userData = useSelector((state) => state.auths?.authData);
    const accessToken = userData?.data?.accessToken;
    const userName = userData?.data?.user?.userName;
    const userId = userData?.data?.user?._id;

    const communityCurrent = useSelector(
        (state) => state.communities.community,
    );

    const [loadingImport, setLoadingImport] = useState(false);

    const [removeQuizz, { isLoading }] = useDeleteQuizMutation();
    const [importQuiz, { error }] = useImportQuizMutation();
    const [removeQuizCommunity] = useDeleteQuizCommunityMutation();

    useEffect(() => {
        if (error) {
            switch (error.data) {
                case 'Quiz already exists':
                    if (Platform.OS === 'android') {
                        ToastAndroid.show(
                            'Quiz already exist in your library',
                            ToastAndroid.SHORT,
                        );
                    }
                    break;
                default:
                    break;
            }
        }
    }, [error]);

    const showConfirmDialog = () => {
        return Alert.alert(
            'Are your sure?',
            'Are you sure you want to remove this quiz box?',
            [
                {
                    text: 'Yes',
                    onPress: async () => {
                        const { data } = await removeQuizz({
                            accessToken,
                            quizId: quizData._id,
                            userId,
                        });
                        if (data) {
                            onClose();
                            dispatch(deleteQuiz(quizData));
                            navigation.goBack();
                            if (Platform.OS === 'android') {
                                ToastAndroid.show(
                                    'Delete successfully!',
                                    ToastAndroid.SHORT,
                                );
                            }
                        }
                    },
                },
                {
                    text: 'No',
                },
            ],
        );
    };

    const showImportDialog = () => {
        return Alert.alert(
            'Are your sure?',
            'Are you sure you want to import this quiz ?',
            [
                {
                    text: 'Yes',
                    onPress: async () => {
                        const { data, isLoading } = await importQuiz({
                            accessToken,
                            quizData,
                            userId,
                        });
                        if (isLoading) {
                            setLoadingImport(true);
                        }
                        if (data) {
                            onClose();
                            dispatch(addLibrayQuiz(data));
                            if (Platform.OS === 'android') {
                                ToastAndroid.show(
                                    'Import successfully!',
                                    ToastAndroid.SHORT,
                                );
                            }
                        }
                    },
                },
                {
                    text: 'No',
                },
            ],
        );
    };

    const showRemoveQuiz = () => {
        return Alert.alert(
            'Are your sure?',
            'Are you sure you want to remove this quiz ?',
            [
                {
                    text: 'Yes',
                    onPress: async () => {
                        const { data } = await removeQuizCommunity({
                            accessToken,
                            id: communityCurrent._id,
                            quizId: quizData._id,
                        });

                        if (data) {
                            onClose();
                            // dispatch(addLibrayQuiz(data));
                            dispatch(
                                removeQuiz({
                                    id: communityCurrent._id,
                                    quiz: data,
                                }),
                            );
                            if (Platform.OS === 'android') {
                                ToastAndroid.show(
                                    'Delete successfully!',
                                    ToastAndroid.SHORT,
                                );
                            }
                            navigation.goBack();
                        }
                    },
                },
                {
                    text: 'No',
                },
            ],
        );
    };

    useFocusEffect(
        useCallback(() => {
            let Point = 0;
            let pointsPerQuestion = quizData.pointsPerQuestion;

            quizData.questionList.map((question) => {
                switch (question.pointType) {
                    case 'Standard':
                        Point += pointsPerQuestion;
                        break;
                    case 'Double':
                        Point += pointsPerQuestion * 2;
                        break;
                    case 'OnTime':
                        Point += pointsPerQuestion * question.answerTime;
                    default:
                        break;
                }
            });
            setPoint(Point);
        }, []),
    );

    const handleDelete = () => {
        showConfirmDialog();
    };

    const handleEdit = () => {
        onClose();
        navigation.navigate('Creator', {
            quiz: quizData,
            creator: false,
        });
    };

    const handleRemoveQuiz = () => {
        // console.log(accessToken, communityCurrent?._id, quizData._id);
        showRemoveQuiz();
    };

    const handleSolo = () => {
        dispatch(setQuizPlay(quizData));
        onClose();
        navigation.navigate('PlaySolo', {
            quizList,
            title,
            userType,
            community,
        });
    };

    const handleImport = () => {
        showImportDialog();
    };

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <View>
                    <Text
                        style={{ color: 'gray', fontSize: 20, fontWeight: 500 }}
                    >
                        {quizData.tags[0]}
                    </Text>
                    <Text style={{ fontWeight: 700, fontSize: 20 }}>
                        {quizData.name}
                    </Text>
                </View>
                <TouchableOpacity onPress={onClose}>
                    <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={{ width: '90%', height: '14%' }}>
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
                        <AntDesign
                            name="codepen-circle"
                            size={30}
                            color="black"
                        />
                        <Text>{point} points</Text>
                    </View>
                </View>
            </View>
            <View style={styles.decription}>
                <Text style={{ color: 'gray', fontWeight: 500 }}>
                    DESCRIPTION
                </Text>
                <Text style={{ fontSize: 16 }}>{quizData.description}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'gray', fontWeight: 500 }}>
                        pointsPerQuestion :{' '}
                    </Text>
                    <Text style={{ fontSize: 16 }}>
                        {quizData.pointsPerQuestion}
                    </Text>
                </View>
            </View>
            <View style={styles.creator}>
                <View style={styles.infocreator}>
                    <View style={{ flexDirection: 'row', gap: 20 }}>
                        <Image
                            style={styles.image}
                            source={{
                                uri: avatar
                                    ? avatar
                                    : 'https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-cute.jpg?ssl\u003d1',
                            }}
                        />
                        <View>
                            <Text>{quizData.creatorName}</Text>
                            <Text>Creator</Text>
                        </View>
                    </View>
                    {quizData.sourceCreator && (
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 500 }}>Source: </Text>
                            <Text>{quizData.sourceCreator}</Text>
                        </View>
                    )}
                </View>
            </View>
            {mylibrary ? (
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={handleEdit}
                    >
                        <View>
                            <Text style={styles.textEdit}>Edit</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={handleDelete}
                    >
                        <View>
                            {isLoading ? (
                                <ActivityIndicator size="large" color="#fff" />
                            ) : (
                                <Text style={styles.textDelete}>Delete</Text>
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.footer}>
                    {userName !== quizData.creatorName &&
                        userName !== quizData.sourceCreator &&
                        userType === 'Teacher' && (
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={handleImport}
                            >
                                <View>
                                    {loadingImport ? (
                                        <ActivityIndicator
                                            size="large"
                                            color="#fff"
                                        />
                                    ) : (
                                        <Text style={styles.textEdit}>
                                            Import
                                        </Text>
                                    )}
                                </View>
                            </TouchableOpacity>
                        )}
                    {userType === 'Teacher' &&
                        !discover &&
                        userName === quizData.creatorName && (
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={handleRemoveQuiz}
                            >
                                <View>
                                    {false ? (
                                        <ActivityIndicator
                                            size="large"
                                            color="#fff"
                                        />
                                    ) : (
                                        <Text style={styles.textDelete}>
                                            Remove
                                        </Text>
                                    )}
                                </View>
                            </TouchableOpacity>
                        )}
                    <TouchableOpacity
                        style={{
                            ...styles.deleteButton,
                            backgroundColor: '#695AE0',
                        }}
                        onPress={handleSolo}
                    >
                        <View>
                            {isLoading ? (
                                <ActivityIndicator size="large" color="#fff" />
                            ) : (
                                <Text style={styles.textDelete}>Play Solo</Text>
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
            )}
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
        gap: 10,
    },
    title: {
        width: '90%',
        // height: '16%',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    questionPoint: {
        width: '100%',
        height: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#E0DEF9',
        borderRadius: 20,
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
        resizeMode: 'cover',
    },

    creator: {
        width: '90%',
        height: '25%',
        marginTop: 20,
    },

    infocreator: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
