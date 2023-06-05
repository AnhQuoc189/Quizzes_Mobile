// Library
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Color
import { bgColors, colors } from 'src/styles/color';

const CoverImage = ({ backgroundImage }) => {
    return backgroundImage ? (
        <Image style={styles.viewImage} source={{ uri: backgroundImage }} />
    ) : (
        <TouchableOpacity style={styles.coverImage}>
            <Ionicons
                name="image-outline"
                size={50}
                style={{
                    color: colors.lightPurple,
                }}
            />
            <Text
                style={{
                    color: colors.lightPurple,
                    fontSize: 20,
                    marginTop: 5,
                    fontWeight: 600,
                }}
            >
                Add Cover Image
            </Text>
        </TouchableOpacity>
    );
};

export default CoverImage;

const styles = StyleSheet.create({
    viewImage: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bgColors.lightPurple,
        paddingVertical: 100,
        borderRadius: 25,
        resizeMode: 'contain',
    },
    coverImage: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bgColors.lightPurple,
        paddingVertical: 70,
        borderRadius: 25,
    },
});
