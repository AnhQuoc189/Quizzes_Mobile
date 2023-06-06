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
                // height: '0%',
            }}
            onPress={handlePress}
        >
            {loading ? (
                <ActivityIndicator size="large" color="#fff" />
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
        paddingVertical: 14,
        borderRadius: 20,
    },
    text: {
        fontSize: 20,
        fontWeight: '600',
    },
});
