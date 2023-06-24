//Library
import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';
import { useEffect, useState } from 'react';

//redux
import { useSelector } from 'react-redux';

//RTKQuery
import { useGetCommunitiesQuery } from 'src/services/communityApi';

export default function QuizCommunity({ navigation }) {
    const userData = useSelector((state) => state.auths?.authData);
    const accessToken = userData?.data?.accessToken;
    const [result, setResult] = useState();
    const { data, isLoading } = useGetCommunitiesQuery(accessToken);
    const quizes = useSelector((state) => state.quizs.allquizes);

    useEffect(() => {
        if (data) {
            const res = data.map((item) => {
                let quizList = [];
                quizes.map(async (quiz) => {
                    if (item.quizzes.includes(quiz._id)) {
                        quizList.push(quiz);
                    }
                });
                return { ...item, quizList };
            });
            setResult(res);
        }
    }, [data]);

    return (
        <View style={styles.viewCommunity}>
            {result &&
                result.map((item, index) => {
                    if (item?.quizList?.length) {
                        return (
                            <View style={{ gap: 10 }} key={index}>
                                <Text>{item.tags}</Text>
                                <QuizLizst
                                    quizList={item.quizList}
                                    navigation={navigation}
                                />
                            </View>
                        );
                    }
                })}
        </View>
    );
}

const QuizLizst = ({ quizList, navigation }) => {
    return (
        <FlatList
            data={quizList}
            horizontal
            renderItem={({ item, index }) => (
                <QuizItem quiz={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
            showsHorizontalScrollIndicator={false}
        />
    );
};

const QuizItem = ({ quiz, navigation }) => {
    const userInfo = useSelector((state) => state.auths?.user);
    // console.log(userInfo.userType);

    const handleOpenQuiz = () => {
        navigation.navigate('DetailQuiz', {
            quizData: quiz,
            mylibrary: false,
            avatar: null,
            userType: userInfo?.userType,
            home: true,
        });
    };
    return (
        <TouchableOpacity style={styles.viewQuizItem} onPress={handleOpenQuiz}>
            <Image
                resizeMode="cover"
                style={styles.viewImage}
                source={{ uri: quiz.backgroundImage }}
            />
            <Text>{quiz.name}</Text>
            <Text>{quiz.questionList.length} * Question</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    viewCommunity: {
        width: '100%',
        height: '100%',
        gap: 30,
    },

    viewQuizItem: {
        width: 170,
        height: 210,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#DDE6ED',
    },
    viewImage: {
        width: '100%',
        height: '70%',
        borderRadius: 10,
    },
});
