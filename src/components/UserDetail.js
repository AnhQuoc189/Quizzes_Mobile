import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from 'src/styles/color';
import Header from './auth/Header';
import Achievement from './Achievement';
import ProfileNavigator from 'src/navigation/ProfileNavigator';

const UserDetail = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Header
                title=""
                direct="Home"
                color="black"
                navigation={navigation}
            />
            {/* first section */}
            <View style={styles.firstSection}>
                <Image
                    style={styles.image}
                    source={{
                        uri: 'https://cutewallpaper.org/21/anime-scenery-wallpaper-rain/200-Free-Rain-Water-Videos-HD-4K-Clips-Pixabay.jpg',
                    }}
                />

                <View style={styles.infoContainer}>
                    <Image
                        style={styles.avtImage}
                        source={{
                            uri: 'https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-cute.jpg?ssl\u003d1',
                        }}
                    />
                    <View style={styles.info}>
                        <Text style={styles.name}>Tuan Nguyen</Text>
                        <Text style={styles.tagName}>@tuan_nguyen</Text>
                    </View>

                    <TouchableOpacity style={styles.btnAdd}>
                        <Text>Add</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.achievementContainer}>
                    <Achievement
                        number={265}
                        title={'Quizez'}
                        isBorder={false}
                    />
                    <Achievement
                        number={1050}
                        title={'Point'}
                        isBorder={true}
                    />
                    <Achievement
                        number={23}
                        title={'Friends'}
                        isBorder={false}
                    />
                </View>
            </View>
            {/* second section */}
            <View style={{ flex: 1 }}>
                <ProfileNavigator />
            </View>
        </View>
    );
};

export default UserDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    firstSection: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '90%',
        height: 120,
        borderRadius: 25,
        paddingHorizontal: 20,
        resizeMode: 'stretch',
    },

    infoContainer: {
        width: '100%',
        height: 80,
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 18,
    },
    avtImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginLeft: 10,
    },
    name: {
        fontSize: 15,
        fontWeight: '900',
        color: 'black',
        justifyContent: 'space-between',
    },
    tagName: {
        fontSize: 13,
        justifyContent: 'space-between',
        color: 'gray',
    },
    info: {
        justifyContent: 'space-between',
        display: 'flex',
        height: '100%',
        marginLeft: 15,
    },
    btnAdd: {
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.second,
        position: 'absolute',
        right: 20,
    },
    achievementContainer: {
        width: '90%',
        height: 70,
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F7F7F8',
        borderTopWidth: 1,
        borderTopColor: '#F7F7F8',
        flexDirection: 'row',
    },
});
