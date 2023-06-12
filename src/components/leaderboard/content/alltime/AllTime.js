// Libraries
import { View, ScrollView, RefreshControl } from 'react-native';
import { useState } from 'react';

// Components, styles
import styles from './alltime.style';
import { Podium, UserCard } from 'src/components/leaderboard';

const AllTime = ({ data }) => {
    // Value refreshing sẽ đi với prop RefreshControl của ScrollView
    // phía dưới để khi đang ở vị trí trên cùng của ScrollView
    // mà mình kéo xuống thì sẽ load lại Api mới nhất (có thể xài hoặc bỏ đi)
    const [refreshing, setRefreshing] = useState(false);

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: 10,
            }}
            refreshControl={<RefreshControl refreshing={refreshing} />}
        >
            <View style={styles.container}>
                <Podium
                    firstUser={data[0]}
                    secondUser={data[1]}
                    thirdUser={data[2]}
                />

                <View style={styles.userCardContainer}>
                    {data?.slice(3)?.map((item) => (
                        <UserCard user={item} key={item.rank} />
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

export default AllTime;
