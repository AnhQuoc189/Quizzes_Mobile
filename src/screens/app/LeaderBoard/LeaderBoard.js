// Library
import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Components, colors, constants
// import {
//     Header,
//     DurationTabs,
//     Weekly,
//     AllTime,
// } from 'src/components/leaderboard';
import Header from 'src/components/leaderboard/common/header/Header';
import DurationTabs from 'src/components/leaderboard/common/durationtabs/DurationTabs';
import Weekly from 'src/components/leaderboard/content/weekly/Weekly';
import AllTime from 'src/components/leaderboard/content/alltime/AllTime';

import { colors } from 'src/styles/color';
import { API } from 'src/constants/api';
import { fetchAllUsers } from 'src/slices/usersSlice';
import HeaderBack from 'src/components/auth/HeaderBack';
import { StyleSheet } from 'react-native';

// 2 button Tab thời gian
const durationTabs = ['Weekly', 'All Time'];

export default function LeaderBoard({ navigation }) {
    const dispatch = useDispatch();
    const [leaderBoard, setLeader] = useState([]);

    const userData = useSelector((state) => state.auths?.authData);
    const userId = userData?.data?.user?._id;
    const accessToken = userData?.data?.accessToken;

    const users = useSelector((state) => state.users.users);

    useEffect(() => {
        if (users) {
            let leader = [...users];
            leader.sort(function (a, b) {
                return b.point - a.point;
            });
            setLeader(leader);
        }
    }, [users]);

    const [refreshing, setRefreshing] = useState(false);

    const [activeTab, setActiveTab] = useState(durationTabs[0]);

    useEffect(() => {
        fetch(`${API}api/users`, {
            method: 'GET',
            headers: new Headers({
                Authorization: `Bearer ${accessToken}`,
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json',
            }),
        })
            .then((data) => data.json())
            .then((json) => {
                dispatch(fetchAllUsers(json));
            })
            .catch((error) => console(error));
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetch(`${API}api/users`, {
            method: 'GET',
            headers: new Headers({
                Authorization: `Bearer ${accessToken}`,
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json',
            }),
        })
            .then((data) => data.json())
            .then((json) => {
                json.sort(function (a, b) {
                    return b.point - a.point;
                });
                setLeader(json);
                setRefreshing(false);
            })
            .catch((error) => console(error));
    }, []);

    const refreshEvent = {
        refreshing,
        onRefresh,
    };

    const displayTabContent = () => {
        switch (activeTab) {
            case 'Weekly':
                return (
                    <Weekly
                        leaderBoard={leaderBoard}
                        refreshEvent={refreshEvent}
                        navigation={navigation}
                    />
                );
            case 'All Time':
                return (
                    <AllTime
                        leaderBoard={leaderBoard}
                        refreshEvent={refreshEvent}
                        navigation={navigation}
                    />
                );
            default:
                break;
        }
    };

    return (
        <View style={styles.viewSafeArea}>
            {/* <Header title="Leaderboard" navigation={navigation} direct="Home" /> */}
            <View style={styles.viewHeader}>
                <HeaderBack
                    title="Leaderboard"
                    handleBack={() => navigation.goBack()}
                    color="#fff"
                />
            </View>

            <DurationTabs
                durationTabs={durationTabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {displayTabContent()}
        </View>
    );
}

const styles = StyleSheet.create({
    viewSafeArea: {
        flex: 1,
        backgroundColor: colors.primary,
        // paddingTop: 16,
        paddingHorizontal: 8,
        justifyContent: 'space-around',
        width: '100%',
        gap: 20,
    },
    viewHeader: {
        width: '90%',
        alignSelf: 'center',
    },
});
