//Library
import {
    SafeAreaView,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

//redux
import { useDispatch, useSelector } from 'react-redux';

//filter
import filter from 'lodash.filter';

//component
import BoxUser from '../BoxUser';

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
        paddingHorizontal: 15,
        marginBottom: 80,
    },
});
