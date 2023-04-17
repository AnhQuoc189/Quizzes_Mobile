// Library
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

// Color
import { colors } from 'src/styles/color';

const Button = ({
    navigation = null,
    value,
    title,
    handlePress,
    direct,
    params,
}) => {
    const handleOnPress = () => {
        handlePress && !value && handlePress();
        value && handlePress(value);
        navigation && navigation.navigate(direct, params);
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handleOnPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

export default Button;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: colors.lightPurple,
        paddingVertical: 14,
        borderRadius: 20,
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
    },
});
