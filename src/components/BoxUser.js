//Lybrary
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';

//color
import { colors } from 'src/styles/color';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { upDated } from 'src/slices/authSlice';

//RTKQuery
import { useFollowMutation, useUnFollowMutation } from 'src/services/userApi';

//icons
import { SimpleLineIcons } from '@expo/vector-icons';

const BoxUser = ({ normal, user, follows, follow }) => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auths?.authData);
    const accessToken = userData?.data?.accessToken;
    const userName = userData?.data?.user.userName;

    const myId = userData?.data?.user?._id;
    const [Follow] = useFollowMutation();

    const [unFollow] = useUnFollowMutation();

    const handlefollow = async () => {
        const { data } = await Follow({
            accessToken,
            myId,
            friendId: user._id,
        });
        if (data) {
            dispatch(upDated(data));
        }
    };

    const handleUnfollow = async () => {
        const { data } = await unFollow({
            accessToken,
            myId,
            friendId: user._id,
        });
        if (data) {
            dispatch(upDated(data));
        }
    };

    return (
        <TouchableOpacity
            style={{
                ...styles.container,
                backgroundColor: normal ? 'white' : colors.primary,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <View>
                    <Image
                        style={styles.image}
                        source={{
                            uri: user?.avatar
                                ? user.avatar
                                : 'https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-cute.jpg?ssl\u003d1',
                        }}
                    />
                </View>

                <View style={styles.info}>
                    <View
                        style={{
                            flexDirection: 'row',
                            gap: 10,
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                ...styles.name,
                                color: normal ? 'black' : 'white',
                            }}
                        >
                            {user?.userName}
                        </Text>
                        {follow && (
                            <View style={styles.viewPoint}>
                                <Text
                                    style={{
                                        ...styles.name,
                                        color: normal ? 'black' : 'white',
                                    }}
                                >
                                    {user?.point}
                                </Text>
                            </View>
                        )}
                    </View>
                    <Text
                        style={{
                            ...styles.numberRank,
                            color: normal ? 'gray' : '#F5F5FD',
                        }}
                    >
                        {user?.mail}
                    </Text>
                </View>
            </View>
            {follow ? (
                <TouchableOpacity
                    style={styles.follow}
                    onPress={handleUnfollow}
                >
                    <SimpleLineIcons
                        name="user-unfollow"
                        size={24}
                        color="#695AE0"
                    />
                    <Text style={{ color: '#695AE0' }}>unfollow</Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.follow}>
                    {follows.includes(user.userName) ? (
                        <Text style={{ color: '#D21312', width: 70 }}>
                            following
                        </Text>
                    ) : (
                        !(userName === user.userName) && (
                            <TouchableOpacity
                                style={{ ...styles.follow, width: 40 }}
                                onPress={handlefollow}
                            >
                                <View style={{ flexDirection: 'row' }}>
                                    <SimpleLineIcons
                                        name="user-follow"
                                        size={24}
                                        color="black"
                                    />
                                    <Text style={{ color: '#333' }}>
                                        follow
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    )}
                </View>

                // <View>
                //     {follows.includes(user.userName) ? (
                //         <View>
                //             {' '}
                //             <Text style={{ color: '#333' }}>following</Text>
                //         </View>
                //     ) : (
                //         <TouchableOpacity style={styles.follow}>
                //             <View style={{ flexDirection: 'row' }}>
                //                 <SimpleLineIcons
                //                     name="user-follow"
                //                     size={24}
                //                     color="black"
                //                 />
                //                 <Text style={{ color: '#333' }}>follow</Text>
                //             </View>
                //         </TouchableOpacity>
                //     )}
                // </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 80,
        borderRadius: 20,
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 18,
    },
    number: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#B4ACEF',
        alignItems: 'center',
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 25,
        marginLeft: 10,
    },
    name: {
        fontSize: 15,
        fontWeight: '900',
        justifyContent: 'space-between',
    },
    numberRank: {
        fontSize: 13,
        justifyContent: 'space-between',
        color: 'white',
        width: '100%',
    },
    info: {
        justifyContent: 'space-between',
        display: 'flex',
        height: '100%',
        marginLeft: 15,
    },
    follow: {
        alignItems: 'center',
        height: '100%',
        // backgroundColor: '#695AE0',
        width: '24%',
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },

    viewPoint: {
        backgroundColor: '#B4ACEF',
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
});

export default BoxUser;
