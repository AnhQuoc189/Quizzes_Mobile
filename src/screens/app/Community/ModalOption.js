//Library
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

//redux
import { useSelector, useDispatch } from 'react-redux';
import { deleteCommunity } from 'src/slices/communitySlice';

//RTKQuery
import { useDeleteCommunityMutation } from 'src/services/communityApi';

import message from 'src/assets/images/messenger.png';

export default function ModalOption({ navigation, quiz, onClose, quizList }) {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auths?.authData);
    const accessToken = userData?.data?.accessToken;

    const userInfo = useSelector((state) => state.auths?.user);

    const [removeCommunity, { isLoading }] = useDeleteCommunityMutation();

    const showConfirmDialog = () => {
        return Alert.alert(
            'Are your sure?',
            'Are you sure you want to remove this community?',
            [
                {
                    text: 'Yes',
                    onPress: async () => {
                        const data = await removeCommunity({
                            accessToken,
                            id: quiz._id,
                        });
                        if (data) {
                            onClose();
                            dispatch(deleteCommunity(quiz));
                            navigation.navigate('Community');
                            if (Platform.OS === 'android') {
                                ToastAndroid.show(
                                    'Delete successfully!',
                                    ToastAndroid.SHORT,
                                );
                            } else {
                                AlertIOS.alert('Delete successfully!');
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

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <View>
                    <Text style={{ color: 'gray', fontSize: 20 }}>
                        {quiz.tags}
                    </Text>
                    <Text style={{ fontWeight: 700, fontSize: 20 }}>
                        {quiz.name}
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
                    <Text>{quiz?.quizList?.length} Quiz</Text>
                </View>
                <View style={styles.questionPointItem}>
                    <AntDesign name="codepen-circle" size={30} color="black" />
                    <Text>{quiz?.users?.length} users</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.decription}>
                <Text style={styles.textChatbox}>Chat box here</Text>
                <Image source={message} style={{ width: 50, height: 50 }} />
            </TouchableOpacity>
            <View style={styles.creator}>
                <View style={styles.infocreator}>
                    <View style={{ flexDirection: 'row', gap: 20 }}>
                        <Image
                            style={styles.image}
                            source={{
                                uri:
                                    quiz?.infoCreator?.avatar ||
                                    'https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-cute.jpg?ssl\u003d1',
                            }}
                        />
                        <View>
                            <Text>{quiz?.creatorName}</Text>
                            <Text>Creator</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => {
                        onClose();
                        navigation.navigate('ShareQuiz', {
                            quizListCommu: quizList,
                            community: quiz,
                            id: quiz._id,
                        });
                    }}
                >
                    <View>
                        {false ? (
                            <ActivityIndicator size="large" color="#fff" />
                        ) : (
                            <Text style={styles.textEdit}>Share Quiz</Text>
                        )}
                    </View>
                </TouchableOpacity>
                {userInfo?.userName === quiz?.creatorName && (
                    <TouchableOpacity
                        style={{
                            ...styles.deleteButton,
                            backgroundColor: '#695AE0',
                        }}
                        onPress={() => showConfirmDialog()}
                    >
                        <View>
                            {isLoading ? (
                                <ActivityIndicator size="large" color="#fff" />
                            ) : (
                                <Text style={styles.textDelete}>Delete</Text>
                            )}
                        </View>
                    </TouchableOpacity>
                )}
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
        height: '18%',
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
        // marginBottom: 20,
        // marginTop: 20,
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
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10,
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
    textChatbox: {
        fontStyle: 'italic',
        fontSize: 20,
        fontWeight: 500,
    },

    textDelete: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 500,
    },
});
