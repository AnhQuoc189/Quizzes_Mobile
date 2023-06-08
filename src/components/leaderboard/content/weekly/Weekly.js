// Libraries
import { View } from 'react-native';

// Components, styles
import styles from './weekly.style';
import UserCard from '../../common/usercard/UserCard';

const Weekly = ({ data }) => {
    return (
        <View style={styles.container}>
            {data?.map((item) => (
                <UserCard key={item.rank} user={item} />
            ))}
        </View>
    );
};

export default Weekly;
