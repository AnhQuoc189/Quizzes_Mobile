import { TouchableOpacity, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({ title, style, navigation, direct, options }) => {
    return (
        <View style={style}>
            {/* Back button */}
            <TouchableOpacity onPress={() => navigation.navigate(direct)}>
                <Ionicons
                    name="arrow-back-outline"
                    style={{
                        color: '#fff',
                    }}
                    size={25}
                />
            </TouchableOpacity>

            {/* Header Title */}
            <Text
                style={{
                    fontSize: 25,
                    color: '#fff',
                    fontWeight: '600',
                }}
            >
                {title}
            </Text>

            {/* Options */}
            {options ? (
                <TouchableOpacity onPress={options}>
                    <Ionicons
                        name="ellipsis-horizontal"
                        size={25}
                        style={{
                            color: '#fff',
                        }}
                    />
                </TouchableOpacity>
            ) : (
                <View />
            )}
        </View>
    );
};
export default Header;
