//Library
import { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    Modal,
    Pressable,
} from 'react-native';
import moment from 'moment/moment';

//redux
import { useSelector } from 'react-redux';

//component
import Header from 'src/components/auth/Header';
import ModalOption from './ModalOption';

//icons
import Ionicons from 'react-native-vector-icons/Ionicons';

//RKTQuery
import { useGetUserQuery } from 'src/services/userApi';

const ItemSeparator = () => <View style={styles.separator} />;

const QuestionBox = ({ question, index }) => (
    <View style={styles.viewQuestionBox}>
        <View
            style={{
                width: '90%',
                justifyContent: 'space-around',
                height: '100%',
            }}
        >
            <Text>
                {index + 1}. {question.optionQuestion}
            </Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <Image
                    resizeMode="cover"
                    source={{ uri: question.backgroundImage }}
                    style={{ width: 60, height: 60, borderRadius: 10 }}
                />
                <Text style={{ width: '60%' }}>{question.question}</Text>
            </View>
        </View>
    </View>
);

const QuizCommunity = ({ item, handleOpenQuizDetals }) => (
    <View style={styles.container}>
        <View style={styles.viewQuiz}>
            <Image
                source={{ uri: item.backgroundImage }}
                resizeMode="cover"
                style={styles.image}
            />
            <View style={{ width: '70%' }}>
                <Text style={{ fontWeight: 600 }}>{item.name}</Text>
                <Text style={{ fontSize: 12 }}>{item.description}</Text>
                <Text style={{ fontSize: 12 }}>
                    {item.updatedAt
                        ? `UpdatedCreate:${moment(item.updatedAt).fromNow()}`
                        : `DateCreate:${moment(item.dateCreated).fromNow()}`}
                </Text>
            </View>
            <TouchableOpacity onPress={handleOpenQuizDetals}>
                <Ionicons name="chevron-forward" color="#333" size={25} />
            </TouchableOpacity>
        </View>
        <Text>{item.questionList.length} Question</Text>
        <View style={{ width: '100%' }}>
            <FlatList
                data={item?.questionList}
                horizontal
                renderItem={({ item, index }) => (
                    <QuestionBox key={item} question={item} index={index} />
                )}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    </View>
);

export default function CommunityDetais({ navigation, ...props }) {
    const { quiz, quizList, title } = props.route.params;
    const users = useSelector((state) => state.users.users);
    const userInfo = useSelector((state) => state.auths?.user);

    const [modalOption, setModalOption] = useState(false);

    const handleOpenQuizDetals = (item) => {
        const creator = users.filter(
            (user) => user.userName === item.creatorName,
        );

        navigation.navigate('DetailQuiz', {
            quizList,
            title,
            quizData: item,
            mylibrary: false,
            community: true,
            avatar: creator[0]?.avatar,
            userType: userInfo?.userType,
        });
    };

    const handleOpenOption = () => {
        setModalOption(true);
    };

    return (
        <SafeAreaView style={styles.viewSafeArea}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalOption}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalOption(!modalOption);
                }}
            >
                <Pressable
                    onPress={() => setModalOption(!modalOption)}
                    style={{
                        height: '100%',
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        backgroundColor: 'rgba(105,105,105, 0.6)',
                    }}
                >
                    <ModalOption
                        quiz={quiz}
                        onClose={() => setModalOption(false)}
                        navigation={navigation}
                        quizList={quizList}
                        title={title}
                    />
                </Pressable>
            </Modal>
            <Header
                title={title}
                direct="Community"
                navigation={navigation}
                commuDetails={true}
                openOption={handleOpenOption}
            />
            <View style={styles.viewFlatlist}>
                {quizList?.length ? (
                    <FlatList
                        data={quizList}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <QuizCommunity
                                key={item}
                                item={item}
                                handleOpenQuizDetals={() =>
                                    handleOpenQuizDetals(item)
                                }
                            />
                        )}
                        ItemSeparatorComponent={ItemSeparator}
                        showsVerticalScrollIndicator={false}
                    />
                ) : (
                    <Text>No Quiz here</Text>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    viewSafeArea: {
        width: '100%',
        height: '100%',
        backgroundColor: '#E3DFFD',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 50,
    },
    viewFlatlist: {
        width: '100%',
        height: '80%',
        alignItems: 'center',
    },
    separator: {
        height: 1,
        backgroundColor: 'gray',
    },
    container: {
        width: '90%',
        height: 300,
        gap: 10,
    },
    viewQuiz: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 10,
    },
    image: {
        height: 80,
        width: 80,
        borderRadius: 20,
    },
    viewQuestionBox: {
        height: 130,
        width: 200,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
