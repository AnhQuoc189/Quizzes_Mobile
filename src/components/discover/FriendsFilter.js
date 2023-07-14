//Library
import {
    SafeAreaView,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    Image,
    Text,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

//redux
import { useDispatch, useSelector } from 'react-redux';

//filter
import filter from 'lodash.filter';

//component
import BoxUser from '../BoxUser';
import { View } from 'react-native';

const FriendsFilter = () => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const [result, setResults] = useState([]);
    const [showData, setShowData] = useState(true);
    const [data, setData] = useState();
    const info = useSelector((state) => state.auths?.user);
    let follow = info?.follow;

    const searchQuery = useSelector((state) => state.searchs.searchQuery);

    // const handleUnfriend = (friendId) => {
    //     const newFriends = result.filter((item) => item._id !== friendId);
    //     setData(newFriends);
    // };

    const users = useSelector((state) => state.users.users);

    useEffect(() => {
        if (info) {
            setShowData(true);
            const arrayFriend = [];
            users.map((user) => {
                if (follow?.includes(user.userName)) {
                    arrayFriend.push(user);
                }
            });
            setData(arrayFriend);
        }
    }, [info]);

    useEffect(() => {
        if (isFocused && data) {
            setShowData(false);
            const contains = ({ userName, mail }, query) => {
                if (
                    userName.toLowerCase().includes(query) ||
                    mail.toLowerCase().includes(query)
                ) {
                    return true;
                }
                return false;
            };
            const fotmatQuery = searchQuery?.toLowerCase();
            const filterData = filter(data, (user) => {
                return contains(user, fotmatQuery);
            });
            setResults(filterData);
        }
    }, [searchQuery]);

    return (
        <SafeAreaView style={styles.container}>
            {!data && <ActivityIndicator size="large" color="#333" />}

            {/* {!result.length && <Text>You no have friends</Text>} */}
            {result.length === 0 && !showData && (
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={{
                            uri: 'https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/a60759ad1dabe909c46a817ecbf71878.png',
                        }}
                        resizeMode="cover"
                        style={{ width: 100, height: 100 }}
                    />
                    <Text style={{ color: '#333' }}>No results found</Text>
                </View>
            )}
            <FlatList
                showsVerticalScrollIndicator={false}
                data={showData ? data : result}
                keyExtractor={(result) => result._id}
                renderItem={({ item }) => (
                    <BoxUser
                        key={item}
                        normal={true}
                        user={item}
                        follow={true}
                        // Unfriend={handleUnfriend}
                    />
                )}
            />
        </SafeAreaView>
    );
};

export default FriendsFilter;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        display: 'flex',
        paddingHorizontal: 16,
        marginBottom: 70,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});
