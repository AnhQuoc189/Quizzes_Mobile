import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    TextInput,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    ToastAndroid,
    Platform,
    AlertIOS,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { addQuiz } from 'src/slices/communitySlice';

//component
import Header from 'src/components/auth/Header';

//icons
import { SimpleLineIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

//color
import { bgColors } from 'src/styles/color';

//filter
import filter from 'lodash.filter';

//RTKQuery
import { useAddQuizCommunityMutation } from 'src/services/communityApi';
import HeaderBack from 'src/components/auth/HeaderBack';

export default function ShareQuiz({ navigation, ...props }) {
    const dispatch = useDispatch();
    const focus = useIsFocused();
    const { quizListCommu, id, community } = props.route.params;
    const quizListid = quizListCommu?.map((quiz) => quiz._id);

    const [listId, setlListId] = useState([]);

    const userData = useSelector((state) => state.auths?.authData);
    const accessToken = userData?.data?.accessToken;
    const [handleShare, { error, loading }] = useAddQuizCommunityMutation();

    const quizes = useSelector((state) => state.quizs.quizes);
    const [result, setResults] = useState(quizes);
    const [seacrh, setSearch] = useState();

    useEffect(() => {
        setlListId(quizListid ? quizListid : []);
    }, [focus]);

    const handle = async (quizId) => {
        const { data } = await handleShare({ accessToken, id, quizId });
        if (data) {
            setlListId([...listId, quizId]);
            dispatch(addQuiz({ id, quiz: data }));
            Toast.show({
                type: 'success',
                text1: 'Successfully !',
                text2: 'Share quiz successfully!',
                visibilityTime: 2500,
                topOffset: 60,
            });
        }
    };

    useEffect(() => {
        setResults(quizes);
    }, [quizes]);

    useEffect(() => {
        if (seacrh) {
            const contains = ({ name }, query) => {
                if (name?.toLowerCase().includes(query)) {
                    return true;
                }
                return false;
            };

            const fotmatQuery = seacrh?.toLowerCase();
            const filterData = filter(quizes, (quiz) => {
                return contains(quiz, fotmatQuery);
            });
            setResults(filterData);
        } else {
            setResults(quizes);
        }
    }, [seacrh]);

    const length = result?.length;

    return (
        <View style={styles.viewSafeArea}>
            {/* <Header
                title="Share Quiz"
                direct="Community"
                navigation={navigation}
            /> */}
            <View style={styles.viewHeader}>
                <HeaderBack
                    title="Share Quiz"
                    handleBack={() => navigation.goBack()}
                />
            </View>
            <View style={styles.searchBar}>
                <SimpleLineIcons name="magnifier" size={24} color="white" />
                <TextInput
                    placeholderTextColor="#fff"
                    textColor="#fff"
                    onChangeText={(value) => setSearch(value)}
                    placeholder="Search Quiz"
                    style={styles.textInput}
                />
            </View>
            <View style={styles.viewMain}>
                <View style={{ height: '100%' }}>
                    {quizes && length !== 0 && (
                        <FlatList
                            data={result ? result : quizes}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item, index }) => (
                                <BoxQuiz
                                    key={item._id}
                                    quiz={item}
                                    index={index}
                                    share={listId?.includes(item._id)}
                                    onPress={() => handle(item._id)}
                                />
                            )}
                            ItemSeparatorComponent={() => (
                                <View style={{ height: 10 }} />
                            )}
                            showsVerticalScrollIndicator={false}
                        />
                    )}
                    {length === 0 && (
                        <>
                            <Image
                                source={{
                                    uri: 'https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/a60759ad1dabe909c46a817ecbf71878.png',
                                }}
                                resizeMode="cover"
                                style={{ width: 100, height: 100 }}
                            />
                            <Text style={{ color: '#333' }}>
                                No results found
                            </Text>
                        </>
                    )}
                </View>
            </View>
            <Toast />
        </View>
    );
}

const BoxQuiz = ({ quiz, share, onPress }) => {
    return (
        <View style={styles.container}>
            <Image
                resizeMode="cover"
                style={styles.image}
                source={{
                    uri: quiz?.backgroundImage
                        ? quiz?.backgroundImage
                        : 'https://us.123rf.com/450wm/sn333g/sn333g1608/sn333g160800029/65791205-math-round-bright-symbol-vector-colorful-mathematics-school-subject-bright-sign-in-thin-line-style.jpg?ver=6',
                }}
            />

            <View style={{ ...styles.info, padding: 7 }}>
                <Text style={styles.textHeader}>{quiz.name}</Text>
                <Text style={styles.numberRank}>
                    {quiz.numberOfQuestions} * questions
                </Text>
            </View>
            <TouchableOpacity
                style={{
                    ...styles.viewShare,
                    backgroundColor: share ? '#00FFCA' : '#fff',
                }}
                onPress={share ? () => {} : onPress}
            >
                <Entypo
                    name={share ? 'check' : 'share-alternative'}
                    size={24}
                    color="black"
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    viewSafeArea: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        gap: 20,
    },

    viewHeader: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    viewMain: {
        width: '100%',
        alignItems: 'center',
        gap: 20,
        flex: 1,
    },

    container: {
        width: '100%',
        borderColor: bgColors.lightPurple,
        borderWidth: 2,
        borderRadius: 20,
        height: 85,
        padding: 8,
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'center',
    },

    searchBar: {
        width: '90%',
        marginTop: 20,
        height: 50,
        backgroundColor: '#8F87E5',
        borderRadius: 15,
        paddingHorizontal: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textInput: {
        width: '90%',
        height: '100%',
        backgroundColor: 'transparent',
    },
    image: {
        width: 65,
        height: 65,
        borderRadius: 15,
        justifyContent: 'center',
    },
    info: {
        justifyContent: 'center',
        display: 'flex',
        marginLeft: 10,
        flexDirection: 'column',
        width: '60%',
    },

    textHeader: {
        fontSize: 15,
        fontWeight: '900',
    },
    numberRank: {
        fontSize: 13,
        color: 'gray',
    },
    viewShare: {
        width: '16%',
        height: '70%',
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
    },
});
