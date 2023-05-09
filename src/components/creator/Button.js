// Library
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

// Color
import { colors } from 'src/styles/color';

const Button = ({ navigation, ...props }) => {
    // const handleOnPress = () => {
    //     // handlePress && !value && handlePress();
    //     // value && handlePress(value);
    //     // navigation && navigation.navigate(direct, params);
    //     // console.log('cc');
    //     // console.log(direct);
    //     navigation.navigate(direct);
    // };

    return (
        <TouchableOpacity
            style={{
                ...styles.container,
                width: '100%',
                backgroundColor: colors.lightPurple,
            }}
            onPress={props.handleOnPress}
        >
            <Text style={{ ...styles.text, color: '#fff' }}>{props.title}</Text>
        </TouchableOpacity>
    );
};

export default Button;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 14,
        borderRadius: 20,
    },
    text: {
        fontSize: 20,
        fontWeight: '600',
    },
});
