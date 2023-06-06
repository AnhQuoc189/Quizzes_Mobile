import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const Header = ({
    quiz,
    title,
    style,
    navigation,
    direct,
    options,
    setConfirmSaveModalVisible,
    creator,
    addQuestion,
    loading,
}) => {
    // const isSaved = useSelector((state) => state.creator.isSaved);

    return (
        <View style={style}>
            {/* Back button */}
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate(direct, { quiz, creator: false });
                }}
            >
                <AntDesign name="arrowleft" size={25} color="#fff" />
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
            {!options && !loading && (
                <TouchableOpacity onPress={addQuestion}>
                    <AntDesign name="plussquareo" size={25} color="#FFF" />
                </TouchableOpacity>
            )}

            {/* Options */}
            {options ? (
                <TouchableOpacity onPress={options}>
                    <SimpleLineIcons name="options" size={24} color="#fff" />
                </TouchableOpacity>
            ) : (
                <View />
            )}
        </View>
    );
};
export default Header;
