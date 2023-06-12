import { TouchableOpacity, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './header.style';

const Header = ({ title, navigation, direct }) => {
    return (
        <View style={styles.container}>
            {/* Back button */}
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate(direct);
                }}
                style={styles.backBtnHeader}
            >
                <Ionicons name="arrow-back-outline" color="#fff" size={22} />
            </TouchableOpacity>

            {/* Header Title */}
            <Text style={styles.titleHeader} numberOfLines={1}>
                {title}
            </Text>
        </View>
    );
};

export default Header;
