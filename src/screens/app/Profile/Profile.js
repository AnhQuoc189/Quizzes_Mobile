//Library
import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Image,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

//constant
import { categories } from 'src/constants/category.constant';
const nameCate = categories.map((item) => item.name);

//icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';

//redux
import { useSelector } from 'react-redux';

//Layout
import SubLayout from 'src/layouts/SubLayout';

//color
import { colors } from 'src/styles/color';
// import ProfileNavigator from 'src/navigation/ProfileNavigator';

//chart
import { PieChartCompo, BarChartCompo } from 'src/components/PieChart';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

//RTKQuery
import { API } from 'src/constants/api';
import { useGetTeacherQuizzesQuery } from 'src/services/quizApi';

const InitBar = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
        {
            data: [
                Math.random(),
                Math.random(),
                Math.random(),
                Math.random(),
                Math.random(),
                Math.random(),
            ],
        },
    ],
};

export default function Profile({ navigation, ...props }) {
    // const other = props.route.params.other;
    const [dataBar, setDataBar] = useState(InitBar);
    const focus = useIsFocused();
    const userData = useSelector((state) => state.auths?.authData);
    const accessToken = userData?.data?.accessToken;

    const profilePerson = useSelector((state) => state.auths?.user);
    const profileAnother = props.route.params?.userInfo;

    let userInfo = profileAnother ? profileAnother : profilePerson;
    const teacherId = userInfo?._id;

    useEffect(() => {
        setDataBar({
            ...dataBar,
            datasets: [
                {
                    data: [
                        Math.random(),
                        Math.random(),
                        Math.random(),
                        Math.random(),
                        Math.random(),
                        Math.random(),
                    ],
                },
            ],
        });
    }, [userInfo]);

    const { userName, avatar, point, follow } = userInfo ? userInfo : {};

    const [quality, setQuality] = useState();

    const users = useSelector((state) => state.users.users);

    const [rank, setRank] = useState();

    const quizes = useSelector((state) => state.quizs.quizes);
    const { data, isLoading } = useGetTeacherQuizzesQuery({
        accessToken,
        teacherId,
    });

    useEffect(() => {
        // fetch(`${API}api/quizzes/teacher/${teacherId}`, {
        //     method: 'GET',
        //     headers: new Headers({
        //         Authorization: `Bearer ${accessToken}`,
        //         'user-agent': 'Mozilla/4.0 MDN Example',
        //         'content-type': 'application/json',
        //     }),
        // })
        //     .then((data) => data.json())
        //     .then((json) => {
        //         const arr = [];
        //         json.map((name) => {
        //             let lc = 0;
        //             quizes.map((quiz) => {
        //                 if (quiz.tags.includes(name)) {
        //                     lc++;
        //                 }
        //             });
        //             arr.push(lc);
        //         });
        //         setQuality(arr);
        //     })
        //     .catch((error) => console(error));
        if (data) {
            const arr = [];
            nameCate.map((name) => {
                let lc = 0;
                data.map((quiz) => {
                    if (quiz.tags.includes(name)) {
                        lc++;
                    }
                });
                arr.push(lc);
            });
            setQuality(arr);
        }
    }, [focus]);

    // console.log(data);

    useFocusEffect(
        useCallback(() => {
            if (users) {
                let leader = [...users];
                leader.sort(function (a, b) {
                    return b.point - a.point;
                });
                leader.map((user, index) => {
                    if (user.userName === userName) {
                        setRank(index + 1);
                    }
                });
            }
        }),
    );
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={{ width: '100%' }}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate(
                                    !profileAnother ? 'Home' : 'LeaderBoard',
                                );
                            }}
                        >
                            <Ionicons
                                name="arrow-back"
                                size={28}
                                color="white"
                            />
                        </TouchableOpacity>
                    </TouchableOpacity>
                    {!profileAnother && (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Settings');
                            }}
                        >
                            <Ionicons
                                name="settings-sharp"
                                size={28}
                                color="white"
                            />
                        </TouchableOpacity>
                    )}
                </View>
                {/* Main */}
                <View style={styles.mainSection}>
                    <View style={{ zIndex: 1 }}>
                        <Image
                            style={styles.image}
                            source={{
                                uri: avatar
                                    ? avatar
                                    : 'https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-cute.jpg?ssl\u003d1',
                            }}
                        />
                    </View>
                    <View style={styles.displayContent}>
                        <SubLayout>
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: 'white',
                                    paddingTop: 30,
                                    alignItems: 'center',
                                }}
                            >
                                {/* Name */}
                                <Text style={styles.textHeader}>
                                    {userName && userName}
                                </Text>
                                {/* achievement */}
                                <View style={styles.achieveBox}>
                                    <View style={styles.box}>
                                        <Ionicons
                                            name="md-star-outline"
                                            size={24}
                                            color="white"
                                        />
                                        <Text style={styles.title}>POINTS</Text>
                                        <Text style={styles.score}>
                                            {point && point}
                                        </Text>
                                    </View>
                                    <View style={styles.box}>
                                        <AntDesign
                                            name="Trophy"
                                            size={24}
                                            color="white"
                                        />
                                        <Text style={styles.title}>RANK</Text>
                                        <Text style={styles.score}>{rank}</Text>
                                    </View>
                                    <View style={styles.box}>
                                        <Ionicons
                                            name="person-outline"
                                            size={24}
                                            color="white"
                                        />
                                        <Text style={styles.title}>
                                            Following
                                        </Text>
                                        <Text style={styles.score}>
                                            {follow && follow.length}
                                        </Text>
                                    </View>
                                </View>

                                {/* navigation */}
                                {/* <View
                                    style={{
                                        width: '100%',
                                        flexGrow: 1,
                                    }}
                                >
                                    <ProfileNavigator />
                                </View> */}
                                {dataBar && (
                                    <View style={{ marginTop: 40 }}>
                                        <BarChartCompo data={dataBar} />
                                    </View>
                                )}
                                {userInfo?.userType === 'Teacher' &&
                                    quality && (
                                        <View style={{ marginTop: 40 }}>
                                            <PieChartCompo quality={quality} />
                                        </View>
                                    )}
                            </View>
                        </SubLayout>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        paddingTop: 50,
        paddingHorizontal: 8,
        alignItems: 'center',
    },
    header: {
        alignSelf: 'center',
        width: '90%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 10,
    },
    mainSection: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        marginTop: 30,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        resizeMode: 'cover',
    },
    displayContent: {
        width: '100%',
        height: '100%',
        position: 'relative',
        top: -36,
        bottom: 0,
    },
    textHeader: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    achieveBox: {
        height: 110,
        borderRadius: 20,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: colors.primary,
        paddingHorizontal: 20,
        flexDirection: 'row',
    },
    box: {
        flex: 1,
        margin: 4,
        height: '100%',
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 12,
        fontWeight: '700',
        color: '#B2AAEE',
    },
    score: {
        fontSize: 18,
        fontWeight: '900',
        color: 'white',
    },
});
