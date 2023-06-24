// Libraries
import { View, ScrollView, RefreshControl } from 'react-native';
import { useState } from 'react';

// Components, styles
import styles from './weekly.style';
import { UserCard } from 'src/components/leaderboard';

const Weekly = ({ leaderBoard, refreshEvent, navigation }) => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: 10,
            }}
            refreshControl={
                <RefreshControl
                    refreshing={refreshEvent.refreshing}
                    onRefresh={refreshEvent.onRefresh}
                />
            }
        >
            <View style={styles.container}>
                {leaderBoard &&
                    leaderBoard?.map((user, index) => (
                        <UserCard
                            key={index}
                            index={index}
                            user={user}
                            navigation={navigation}
                        />
                    ))}
            </View>
        </ScrollView>
    );
};

export default Weekly;
