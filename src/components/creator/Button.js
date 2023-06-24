// Library
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

// Color
import { colors } from 'src/styles/color';

const Button = ({ navigation, title, handlePress, loading, width }) => {
    return (
        <TouchableOpacity
            style={{
                ...styles.container,
                width: width,
                backgroundColor: colors.lightPurple,
            }}
            onPress={handlePress}
        >
            {loading ? (
                <ActivityIndicator size="small" color="#fff" />
            ) : (
                <Text style={{ ...styles.text, color: '#fff' }}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

export default Button;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    text: {
        fontSize: 15,
        fontWeight: '600',
    },
});
