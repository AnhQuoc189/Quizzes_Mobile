// Libraries
import { View, ScrollView, RefreshControl } from 'react-native';
import { useState } from 'react';

// Components, styles
import styles from './weekly.style';
import { UserCard } from 'src/components/leaderboard';

const Weekly = ({ data }) => {
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
                {data?.map((item) => (
                    <UserCard key={item.rank} user={item} />
                ))}
            </View>
        </ScrollView>
    );
};

export default Weekly;
