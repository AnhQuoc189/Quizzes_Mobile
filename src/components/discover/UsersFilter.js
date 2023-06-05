import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import BoxUser from '../BoxUser';
import { SafeAreaView } from 'react-native';
// import { useFocusEffect } from '@react-navigation/native';
// import { useCallback } from 'react';
import { useGetAllUsersQuery } from 'src/services/userApi';
import { fetchAllUsers } from 'src/slices/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import filter from 'lodash.filter';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { users } from 'src/constants/user.constant';
import { API } from 'src/constants/api';
import { upDated } from 'src/slices/authSlice';

const UsersFilter = () => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const [data, setData] = useState();
    const [follow, setFollow] = useState([]);
    const [result, setResults] = useState([]);
    const [showData, setShowData] = useState(true);

    const info = useSelector((state) => state.auths?.user);
    let follows = info.follow;
    const searchQuery = useSelector((state) => state.searchs.searchQuery);
    const users = useSelector((state) => state.users.users);

    // const followUser = (newInfo) => {
    //     dispatch(upDated(newInfo));
    // };

    // console.log('Cac');

    useEffect(() => {
        if (users) {
            setData(users);
        }
    }, [users]);

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
            const fotmatQuery = searchQuery.toLowerCase();
            const filterData = filter(data, (user) => {
                return contains(user, fotmatQuery);
            });
            setResults(filterData);
        }
    }, [searchQuery]);

    return (
        <SafeAreaView style={styles.container}>
            {!data && <ActivityIndicator size="large" color="#333" />}
            {/* {!result.length && !data && (
                <Text style={{ fontSize: 20, textAlign: 'center' }}>
                    No users here
                </Text>
            )} */}
            <FlatList
                showsVerticalScrollIndicator={false}
                // data={result ? result : data}
                data={showData ? data : result}
                keyExtractor={(result) => result._id}
                renderItem={({ item }) => (
                    <BoxUser
                        key={item}
                        normal={true}
                        user={item}
                        follows={follows}
                        // handleFollow={followUser}
                    />
                )}
            />
        </SafeAreaView>
    );
};

export default UsersFilter;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        display: 'flex',
        paddingHorizontal: 15,
    },
});
