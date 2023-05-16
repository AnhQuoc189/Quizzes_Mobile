import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    FlatList,
} from 'react-native';

import { colors } from 'src/styles/color';
import logo from 'src/assets/images/logo.png';

export default function WaitingRoom({ quizData, navigation, onPress }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewAll}>
                <Text style={styles.viewPin}>Show PIN: 1809</Text>
                <View style={styles.viewHeader}>
                    <View style={styles.viewQuiz}>
                        <View style={styles.viewQuizHeader}>
                            <Text style={styles.viewTitle}>
                                {quizData.name}
                            </Text>
                            <Image
                                style={styles.viewImage}
                                source={{
                                    uri: quizData.backgroundImage
                                        ? quizData.backgroundImage
                                        : logo,
                                }}
                            />
                            <Text style={{ textAlign: 'center' }}>
                                What will you do when your girlfriend go to
                                hotel with another man
                            </Text>
                        </View>
                        {/* <Divider color="gray"></Divider> */}
                        <View style={styles.viewQuizMore}>
                            <Text>Creator: {quizData.creatorName}</Text>
                            <Text>
                                {quizData.questionList.length} questions
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.viewPlayer}>
                    <Text style={{ fontSize: 20, textAlign: 'center' }}>
                        Player List
                    </Text>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={[1, 2, 3, 4, 5, 6]}
                        renderItem={({ item }) => (
                            <View style={{ alignItems: 'center' }}>
                                <UserJoin index={item} />
                            </View>
                        )}
                        ItemSeparatorComponent={() => (
                            <View style={{ height: 20 }} />
                        )}
                    />
                </View>

                <View style={styles.viewButton}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('DetailQuiz', quizData);
                        }}
                    >
                        <View
                            style={{
                                ...styles.buttonItem,
                                backgroundColor: '#DFDFDE',
                            }}
                        >
                            <Text>Cancle</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPress}>
                        <View
                            style={{
                                ...styles.buttonItem,
                                backgroundColor: '#16FF00',
                            }}
                        >
                            <Text>OK,Lets'go</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export const UserJoin = ({ index }) => {
    return (
        <View style={styles.viewUser}>
            <View style={styles.viewCount}>
                <View style={styles.viewCountCircle}>
                    <Text style={{ color: '#000' }}>{index}</Text>
                </View>
            </View>
            <View style={styles.viewUserImage}>
                <Image
                    style={styles.imageUser}
                    source={{
                        uri: 'https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-cute.jpg?ssl\u003d1',
                    }}
                />
                <View>
                    <Text>Davis Curtis</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.lightPurple,
    },

    viewAll: {
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },

    viewHeader: {
        width: '100%',
        height: '20%',
        alignItems: 'center',
    },

    viewPin: {
        // marginTop: 10,
        color: '#000',
        fontSize: 24,
    },

    viewTitle: {
        color: '#000',
        fontSize: 22,
        textAlign: 'center',
    },

    viewQuiz: {
        height: '120%',
        width: '70%',
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    viewQuizHeader: {
        height: '80%',
        width: '92%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },

    viewImage: {
        width: '50%',
        height: '40%',
        resizeMode: 'contain',
    },
    viewQuizMore: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    viewPlayer: {
        backgroundColor: '#F1F6F9',
        height: '46%',
        width: '70%',
        marginTop: 20,
        flexDirection: 'column',
        borderRadius: 20,
    },

    viewButton: {
        width: '70%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    buttonItem: {
        height: 50,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },

    viewUser: {
        width: '90%',
        height: 60,
        backgroundColor: '#F48484',
        borderRadius: 10,
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
    },
    viewCount: {
        width: '10%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        left: 10,
    },
    viewCountCircle: {
        width: 30,
        height: 30,
        borderWidth: 2,
        borderColor: '#DBDFEA',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },

    viewUserImage: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        left: 10,
    },

    imageUser: {
        width: 40,
        height: 40,
        borderRadius: 50,
        resizeMode: 'contain',
    },
});
