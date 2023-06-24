// Libraries
import { View, ScrollView, RefreshControl } from 'react-native';

// Components, styles
import styles from './alltime.style';
import { Podium, UserCard } from 'src/components/leaderboard';

const AllTime = ({ leaderBoard, refreshEvent, navigation }) => {
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
                <Podium
                    firstUser={leaderBoard[0]}
                    secondUser={leaderBoard[1]}
                    thirdUser={leaderBoard[2]}
                    navigation={navigation}
                />

                <View style={styles.userCardContainer}>
                    {leaderBoard?.slice(3)?.map((user, index) => (
                        <UserCard
                            key={index}
                            index={index + 3}
                            user={user}
                            navigation={navigation}
                        />
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

export default AllTime;
