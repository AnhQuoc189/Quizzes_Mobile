import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Entypo } from '@expo/vector-icons';
import { BoxUser, CategoryCard } from 'src/components';
import { categories } from 'src/constants/category.constant';
import { bgColors, colors } from 'src/styles/color';
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

const rankCate = [
    { name: 'Math', quality: 0 },
    { name: 'Sports', quality: 0 },
    { name: 'Music', quality: 0 },
    { name: 'Science', quality: 0 },
    { name: 'Art', quality: 0 },
    { name: 'Travel', quality: 0 },
    { name: 'History', quality: 0 },
    { name: 'Tech', quality: 0 },
];

const DisplayDiscover = () => {
    const quizes = useSelector((state) => state.quizs.allquizes);

    const [res, setRes] = useState([]);

    // useFocusEffect(
    //     useCallback(() => {
    //         let lc = [];
    //         rankCate.map((cate) => {
    //             let a = 0;
    //             quizes.map((quiz) => {
    //                 if (quiz.tags.includes(cate.name)) {
    //                     a++;
    //                     cate.quality++;
    //                 }
    //             });
    //             lc.push(a);
    //         });
    //         let result = [];
    //         lc.sort().reverse();
    //         rankCate.map((cate) => {
    //             if (cate.quality === lc[0]) {
    //                 result.push(cate);
    //             }
    //         });
    //         setRes(result);
    //     }, []),
    // );

    // useEffect(() => {
    //     let lc = [];
    //     rankCate.map((cate) => {
    //         let a = 0;
    //         quizes.map((quiz) => {
    //             if (quiz.tags.includes(cate.name)) {
    //                 a++;
    //                 cate.quality++;
    //             }
    //         });
    //         lc.push(a);
    //     });

    //     lc.sort().reverse();
    //     let result = [];
    //     rankCate.map((cate) => {
    //         if (cate.quality === lc[0]) {
    //             result.push(cate);
    //         }
    //     });
    //     setRes(result);
    // }, [quizes]);

    return (
        <View
            style={{ width: '100%', height: '100%' }}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.fisrtSection}>
                {/* Top picks */}
                <TouchableOpacity style={styles.boxTopPick}>
                    <View style={styles.box}>
                        <Text style={{ ...styles.textHeader, fontSize: 14 }}>
                            TOP PICKS
                        </Text>
                    </View>

                    <View
                        style={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignSelf: 'baseline',
                        }}
                    >
                        <Text style={styles.textName}>Travel Trivia Quiz</Text>

                        <View
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                marginTop: 7,
                            }}
                        >
                            <MaterialCommunityIcons
                                name="headphones"
                                size={20}
                                color="#660012"
                            />
                            <Text style={styles.textSub}>
                                Music . 5 Quizzes
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            {/* <ScrollView> */}
            <View style={styles.mainContent}>
                <ScrollView
                    style={{ height: 100, marginBottom: 160 }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ flexGrow: 1 }}>
                        <Text style={[styles.textName, styles.textTitle]}>
                            Top categories of the week
                        </Text>

                        {/* <BoxUser number={true} normal={false} /> */}
                        <View
                            style={{
                                backgroundColor: colors.pink,
                                height: '8%',
                                borderRadius: 16,
                                alignItems: 'center',
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                            }}
                        >
                            <Entypo
                                name="graduation-cap"
                                size={30}
                                color="black"
                            />
                            <View style={{ width: '80%' }}>
                                <Text
                                    style={{ fontSize: 20, fontWeight: '800' }}
                                >
                                    {res && res.map((item) => item.name + ' ')}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.categoryContain}>
                            {categories.map((category) => (
                                <CategoryCard
                                    width="46%"
                                    key={category.name}
                                    category={category}
                                    activeCategory={true}
                                />
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </View>
            {/* </ScrollView> */}
        </View>
    );
};

export default DisplayDiscover;

const styles = StyleSheet.create({
    fisrtSection: {
        paddingHorizontal: 20,
        width: '100%',
    },
    textHeader: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        alignItems: 'center',
    },
    boxTopPick: {
        width: '100%',
        height: 180,
        marginTop: 30,
        paddingVertical: 20,
        paddingHorizontal: 30,
        backgroundColor: '#FFE0E6',
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'space-between',
    },
    box: {
        height: 35,
        backgroundColor: colors.pink,
        borderRadius: 10,
        alignItems: 'center',
        padding: 10,
        justifyContent: 'center',
        alignSelf: 'baseline',
    },
    textName: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: 17,
        color: '#660012',
        fontWeight: '900',
    },
    textSub: {
        fontSize: 12,
        color: '#660012',
        fontWeight: '500',
        alignItems: 'center',
        marginLeft: 6,
    },
    mainContent: {
        display: 'flex',
        width: '100%',
        backgroundColor: 'white',
        flex: 1,
        marginTop: 30,
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderRadius: 35,
        paddingBottom: 100,
    },
    textTitle: {
        fontSize: 20,
        color: 'black',
    },
    categoryContain: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 20,
        gap: 20,
        marginBottom: 40,
    },
});
