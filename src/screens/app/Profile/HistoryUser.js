import React, { useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    FlatList,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

//redux
import { useSelector } from 'react-redux';

//API
import { API } from 'src/constants/api';

//component
import HeaderBack from 'src/components/auth/HeaderBack';
import { useState } from 'react';

//constant
import images from 'src/constants/images';

export default function HistoryUser({ navigation, ...props }) {
    const focus = useIsFocused();
    const { userInfo } = props.route.params;

    const [history, setHistory] = useState();
    const [show, setShow] = useState(false);
    const [leaderboard, setLeaderboard] = useState();

    const users = useSelector((state) => state.users.users);

    useEffect(() => {
        if (focus) {
            fetch(`${API}api/leaderboard/history/${userInfo?._id}`, {
                method: 'GET',
            })
                .then((data) => data.json())
                .then((json) => {
                    const data = json.filter((item) =>
                        item.game[0].playerList.includes(userInfo?._id),
                    );
                    setHistory(data.reverse());
                })
                .catch((error) => console(error));
        }
    }, [focus]);

    const handleLeaderboard = (item) => {
        setShow(true);
        const playerList =
            item?.currentLeaderboard[item?.currentLeaderboard.length - 1]
                ?.leaderboardList;
        setLeaderboard(playerList);
    };

    return (
        <View style={styles.viewSafeArea}>
            <View style={styles.viewHeader}>
                <HeaderBack
                    title="History"
                    handleBack={() => navigation.goBack()}
                />
            </View>
            {!show ? (
                <View style={styles.viewList}>
                    {history ? (
                        <FlatList
                            data={history}
                            renderItem={({ item, index }) => (
                                <HistoryItem
                                    item={item}
                                    userInfo={userInfo ? userInfo : {}}
                                    index={index}
                                    onPress={() => handleLeaderboard(item)}
                                />
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={() => (
                                <View style={{ height: 20 }} />
                            )}
                        />
                    ) : (
                        <ActivityIndicator size="large" color="#333" />
                    )}
                </View>
            ) : (
                <View style={styles.viewList}>
                    <View
                        onPress={() => setShow(false)}
                        style={styles.viewBackAll}
                    >
                        <TouchableOpacity
                            style={styles.viewBack}
                            onPress={() => setShow(false)}
                        >
                            <Text style={{ color: 'white' }}>Back</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={leaderboard}
                        renderItem={({ item, index }) => (
                            <LeaderboardItem
                                item={item}
                                onPress={() => setShow(false)}
                                index={index}
                                userInfo={userInfo}
                                users={users}
                            />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => (
                            <View style={{ height: 20 }} />
                        )}
                    />
                </View>
            )}
        </View>
    );
}

const HistoryItem = ({ item, onPress, index }) => {
    return (
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={onPress}>
            <LinearGradient
                style={styles.container}
                colors={['rgba(85,125,254,.549) ', 'rgba(101,53,185,.541)']}
            >
                <View style={styles.rankContainer}>
                    <Text style={styles.rank}>{index + 1}</Text>
                </View>

                <View style={styles.avatarContainer}>
                    <Image
                        resizeMode="cover"
                        style={styles.avatar}
                        source={{ uri: item?.quiz[0]?.backgroundImage }}
                    />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.name} numberOfLines={1}>
                        {item?.quiz[0]?.name || 'Đang cập nhập...'}
                    </Text>
                    <Text style={styles.score} numberOfLines={1}>
                        {item?.game[0]?.playerList?.length} player
                    </Text>
                </View>

                {/* {index < 3 && displayBadge()} */}
                <View>
                    <Text>{item?.pin}</Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const LeaderboardItem = ({ item, index, users }) => {
    const currentUser = users.filter((user) => user._id === item.playerId);

    const Badge = ({ badge }) => (
        <View style={styles.badgeContainer}>
            <Image source={badge} style={styles.badge} resizeMode="contain" />
        </View>
    );

    const displayBadge = () => {
        switch (index) {
            case 0:
                return <Badge badge={images.goldBadge} />;
            case 1:
                return <Badge badge={images.silverBadge} />;
            case 2:
                return <Badge badge={images.bronzeBadge} />;
            default:
                break;
        }
    };
    return (
        <View
            style={{
                alignItems: 'center',
                width: '100%',
            }}
        >
            <LinearGradient
                style={styles.container}
                colors={['rgba(254,143,85,.42) ', 'rgba(185,53,53,.42)']}
            >
                <View style={styles.rankContainer}>
                    <Text style={styles.rank}>{index + 1}</Text>
                </View>

                <View style={styles.avatarContainer}>
                    <Image
                        resizeMode="cover"
                        style={styles.avatar}
                        source={{ uri: currentUser[0]?.avatar }}
                    />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.name} numberOfLines={1}>
                        {currentUser[0]?.userName}
                    </Text>
                    <Text style={styles.score} numberOfLines={1}>
                        {item?.playerCurrentScore} point
                    </Text>
                </View>

                {index < 3 && displayBadge()}
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    viewSafeArea: {
        width: '100%',
        height: '100%',
        backgroundColor: '#8F87E5',
        alignItems: 'center',
        gap: 30,
    },
    viewHeader: {
        width: '90%',
        alignSelf: 'center',
    },
    viewList: {
        backgroundColor: '#fff',
        height: '80%',
        width: '90%',
        borderRadius: 30,
        // alignItems: 'center',
        paddingVertical: 20,
        // paddingHorizontal: 20,
        // justifyContent: 'center',
    },
    container: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
        padding: 16,
        borderRadius: 20,
    },
    rankContainer: {
        width: 24,
        height: 24,
        backgroundColor: '#fff',
        borderRadius: 14,
        borderColor: '#DCDCDC',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    rank: {
        fontWeight: 'bold',
        color: '#808080',
        fontSize: 12,
    },
    avatarContainer: {
        display: 'flex',
        width: 50,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 30,
    },
    textContainer: {
        flex: 1,
        marginLeft: 16,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    score: {
        color: '#808080',
        marginTop: 4,
    },
    badgeContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    badge: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    viewBackAll: {
        width: '90%',
        alignSelf: 'center',
    },
    viewBack: {
        width: '20%',
        backgroundColor: '#8F87E5',
        marginBottom: 15,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

// background: linear-gradient(150deg,rgba(85,125,254,.549) 24%,rgba(101,53,185,.541) 91%)
