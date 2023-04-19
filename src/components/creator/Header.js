import { TouchableOpacity, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

const Header = ({
    title,
    style,
    navigation,
    direct,
    options,
    setConfirmSaveModalVisible,
}) => {
    const isSaved = useSelector((state) => state.creator.isSaved);

    return (
        <View style={style}>
            {/* Back button */}
            <TouchableOpacity
                onPress={() => {
                    if (!isSaved) {
                        setConfirmSaveModalVisible(true);
                    } else {
                        navigation.navigate(direct);
                    }
                }}
            >
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
