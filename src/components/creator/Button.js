import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from 'src/styles/color';
const Button = (props) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => props.navigation.navigate(props.direct)}
        >
            <Text style={styles.text}>{props.title}</Text>
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
        paddingVertical: 10,
        borderRadius: 20,
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
    },
});
