import { TouchableOpacity, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({ title, style, navigation, direct }) => {
    return (
        <View style={style}>
            <TouchableOpacity onPress={() => navigation.navigate(direct)}>
                <Ionicons
                    name="arrow-back-outline"
                    style={{
                        color: '#fff',
                    }}
                    size={25}
                />
            </TouchableOpacity>

            <Text
                style={{
                    fontSize: 25,
                    color: '#fff',
                    fontWeight: '600',
                }}
            >
                {title}
            </Text>

            <TouchableOpacity>
                <Ionicons
                    name="ellipsis-horizontal"
                    size={25}
                    style={{
                        color: '#fff',
                    }}
                />
            </TouchableOpacity>
        </View>
    );
};
export default Header;
