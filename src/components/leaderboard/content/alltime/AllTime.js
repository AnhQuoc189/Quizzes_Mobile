// Libraries
import { View } from 'react-native';

// Components, styles
import styles from './alltime.style';
import Podium from '../../common/podium/Podium';
import UserCard from '../../common/usercard/UserCard';

const AllTime = ({ data }) => {
    return (
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
    );
};

export default AllTime;
