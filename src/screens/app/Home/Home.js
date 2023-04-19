import React from 'react';
import { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { BoxQuiz } from 'src/components';
import SubLayout from 'src/layouts/SubLayout';

import { colors } from 'src/styles/color';

// import Settings from '../auth/Settings';
// import Profile from './Profile';

export default function Home({ navigation }) {
    let date = new Date().getHours();

    const [weatherState, setWeatherState] = useState({});
    useEffect(() => {
        if (date >= 6 && date < 13) {
            setWeatherState({
                name: 'weather-sunny',
                discript: 'GOOD MORNING',
            });
        } else if (date >= 13 && date < 18) {
            setWeatherState({
                name: 'weather-partly-cloudy',
                discript: 'GOOD AFTERNOON',
            });
        } else if (date >= 18) {
            setWeatherState({
                name: 'weather-night-partly-cloudy',
                discript: 'GOOD EVENING',
            });
        } else if (date >= 0 && date < 6) {
            setWeatherState({
                name: 'weather-night',
                discript: 'GOOD NIGHT',
            });
        }
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={{ width: '100%' }}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={styles.firstSection}>
                    {/* Status User */}
                    <View style={styles.userHeader}>
                        <View
                            style={{
                                justifyContent: 'space-between',
                                paddingVertical: 2,
                            }}
                        >
                            <View style={styles.weather}>
                                <MaterialCommunityIcons
                                    name={weatherState.name}
                                    size={18}
                                    color="#FED7DD"
                                />
                                <Text style={styles.subText}>
                                    {weatherState.discript}
                                </Text>
                            </View>
                            <Text
                                style={{ ...styles.textHeader, color: 'white' }}
                            >
                                Madelyn Dias
                            </Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Profile');
                            }}
                        >
                            <Image
                                style={styles.image}
                                source={{
                                    uri: 'https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-cute.jpg?ssl\u003d1',
                                }}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.recentQuiz}>
                        <View
                            style={{
                                justifyContent: 'space-between',
                            }}
                        >
                            <Text
                                style={{
                                    ...styles.textHeader,
                                    fontSize: 15,
                                    color: '#B76C79',
                                }}
                            >
                                Recent Quiz
                            </Text>
                            <Text style={styles.textTiltle}>
                                A Basic Music Quiz
                            </Text>
                        </View>
                    </View>

                    {/* Status Find Friends */}
                    <View style={styles.boxFindFriend}>
                        <Text
                            style={{
                                ...styles.textHeader,
                                fontSize: 15,
                                color: '#D5D1F5',
                            }}
                        >
                            FEATURED
                        </Text>

                        <Text
                            style={{
                                ...styles.textTiltle,
                                fontSize: 18,
                                width: 250,
                                color: 'white',
                                textAlign: 'center',
                            }}
                        >
                            Take part in challenges with friends or other
                            players
                        </Text>

                        <TouchableOpacity style={styles.btnFindFriends}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <Ionicons
                                    name="people-circle"
                                    size={24}
                                    color={colors.primary}
                                />
                                <Text
                                    style={{
                                        ...styles.textHeader,
                                        fontSize: 15,
                                        marginLeft: 10,
                                        color: colors.primary,
                                    }}
                                >
                                    Find Friends
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Status Find Live Quizzes */}
                <View
                    style={{
                        height: '100%',
                    }}
                >
                    <SubLayout>
                        <View style={styles.headerContainer}>
                            <Text
                                style={{ ...styles.textHeader, fontSize: 18 }}
                            >
                                Live Quizzes
                            </Text>

                            <TouchableOpacity
                                style={{
                                    paddingVertical: 2,
                                    paddingLeft: 3,
                                }}
                            >
                                <Text style={styles.buttonText}>See All</Text>
                            </TouchableOpacity>
                        </View>

                        <BoxQuiz direct="DetailQuiz" navigation={navigation} />
                        <BoxQuiz />
                        <BoxQuiz />
                        <BoxQuiz />
                        <BoxQuiz />
                    </SubLayout>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        paddingVertical: 20,
        alignItems: 'center',
    },
    firstSection: {
        paddingTop: 30,
        paddingBottom: 10,
        paddingHorizontal: 20,
    },
    userHeader: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    weather: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    subText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FED7DD',
        marginLeft: 6,
    },
    textHeader: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    textTiltle: {
        fontSize: 18,
        fontWeight: '900',
        color: '#8B3342',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        resizeMode: 'contain',
    },
    recentQuiz: {
        height: 80,
        marginTop: 30,
        width: '100%',
        backgroundColor: '#FFE0E6',
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        padding: 15,
    },
    boxFindFriend: {
        height: 240,
        width: '100%',
        backgroundColor: '#8F87E5',
        marginVertical: 25,
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'space-between',
        padding: 30,
        alignItems: 'center',
    },
    btnFindFriends: {
        height: 50,
        width: 150,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 20,
    },

    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: colors.primary,
    },
});
