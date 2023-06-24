//Library
import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    Image,
    ActivityIndicator,
} from 'react-native';

//redux
import { useSelector } from 'react-redux';

//RTLQuery
import { useGetCommunitiesQuery } from 'src/services/communityApi';

//component
import Header from 'src/components/auth/Header';

export default function Community({ navigation }) {
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

    const handleCommunitiDetails = (item) => {
        navigation.navigate('CommunityDetais', {
            quizList: item.quizList,
            title: item.tags,
        });
    };

    return (
        <SafeAreaView style={styles.viewSafeArea}>
            <Header title="Comunities" direct="Home" navigation={navigation} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.viewScroll}
            >
                <View style={styles.categoryContain}>
                    {result &&
                        result.map((item, index) => (
                            <TouchableOpacity
                                style={styles.viewItem}
                                key={index}
                                onPress={() => handleCommunitiDetails(item)}
                            >
                                <View style={styles.viewItemImage}>
                                    <Image
                                        style={styles.image}
                                        resizeMode="cover"
                                        source={{
                                            uri: item.backgroundImage
                                                ? item.backgroundImage
                                                : 'https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-cute.jpg?ssl\u003d1',
                                        }}
                                    />
                                </View>
                                <Text style={styles.nameCommunity}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                </View>
                {isLoading && <ActivityIndicator size="large" color="#fff" />}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    viewSafeArea: {
        width: '100%',
        height: '100%',
        backgroundColor: '#E3DFFD',
        flex: 1,
    },
    categoryContain: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 20,
        gap: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100,
        height: '100%',
    },

    viewItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewItemImage: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 2,
        borderColor: '#9BA4B5',
    },
    image: {
        height: 130,
        width: 130,
        borderRadius: 65,
    },
    nameCommunity: {
        textAlign: 'center',
        width: '80%',
    },
});
