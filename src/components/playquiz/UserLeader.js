import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
export default function UserLeader({ index, playerList, player, leaderboard }) {
    return (
        <View style={styles.viewUser}>
            <View style={styles.viewCount}>
                <View style={styles.viewCountCircle}>
                    <Text style={{ color: 'gray' }}>{index + 1}</Text>
                </View>
            </View>
            <View style={styles.viewUserImage}>
                {playerList &&
                    playerList
                        .filter((item) => item.playerId === player.playerId)
                        .map((player, index) => (
                            <Image
                                key={index}
                                style={styles.imageUser}
                                source={{
                                    uri: player.avatar
                                        ? player.avatar
                                        : 'https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-cute.jpg?ssl\u003d1',
                                }}
                            />
                        ))}
                <View style={{ gap: 10 }}>
                    {playerList &&
                        playerList
                            .filter((item) => item.playerId === player.playerId)
                            .map((player, index) => (
                                <Text
                                    key={index}
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 500,
                                        fontStyle: 'italic',
                                    }}
                                >
                                    {player.userName}
                                </Text>
                            ))}

                    {leaderboard ? (
                        <Text style={{ fontSize: 20, fontWeight: 500 }}>
                            {player.playerCurrentScore} point
                        </Text>
                    ) : (
                        <Text style={{ fontSize: 20, fontWeight: 500 }}>
                            {player.playerPoints} point
                        </Text>
                    )}
                </View>
            </View>
            <View style={styles.rank}>
                {index === 0 && (
                    <FontAwesome5 name="crown" size={24} color="#FFD95A" />
                )}
                {index === 1 && (
                    <FontAwesome5 name="crown" size={24} color="#9BA4B5" />
                )}
                {index === 2 && (
                    <FontAwesome5 name="crown" size={24} color="#F99B7D" />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    viewUser: {
        width: '90%',
        height: 80,
        backgroundColor: '#fff',
        marginTop: 20,
        borderRadius: 10,
        flexDirection: 'row',
        gap: 10,
    },
    viewCount: {
        width: '15%',
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
        gap: 20,
    },

    imageUser: {
        width: 60,
        height: 60,
        borderRadius: 50,
        resizeMode: 'contain',
    },
    rank: {
        justifyContent: 'center',
        left: 20,
    },
});
