//Library
import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { useEffect, useState } from 'react';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllCommunities } from 'src/slices/communitySlice';

//RTKQuery
import { useGetCommunitiesQuery } from 'src/services/communityApi';

export default function QuizCommunity({ navigation }) {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auths?.authData);
    const accessToken = userData?.data?.accessToken;
    const { data, isLoading } = useGetCommunitiesQuery(accessToken);

    useEffect(() => {
        dispatch(fetchAllCommunities(data));
    }, [data]);

    const communities = useSelector((state) => state.communities.communities);

    return (
        <View style={styles.viewCommunity}>
            {isLoading && <ActivityIndicator color="#333" size="large" />}
            {communities &&
                communities.map((item) => {
                    if (item?.quizList?.length) {
                        return (
                            <View style={{ gap: 10 }} key={item._id}>
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
            renderItem={({ item }) => (
                <View key={item.id}>
                    <QuizItem quiz={item} navigation={navigation} />
                </View>
            )}
            keyExtractor={(item) => item._id}
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
            showsHorizontalScrollIndicator={false}
        />
    );
};

const QuizItem = ({ quiz, navigation }) => {
    const userInfo = useSelector((state) => state.auths?.user);

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
