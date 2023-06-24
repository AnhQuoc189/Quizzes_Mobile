// Libraries
import { View, Text, Image, TouchableOpacity } from 'react-native';

// Components, images, styles
import styles from './userbox.style';
import images from 'src/constants/images';

// Component huy hiệu
const Badge = ({ badge }) => (
    <View style={styles.badgeContainer}>
        <Image source={badge} style={styles.badge} resizeMode="contain" />
    </View>
);

const UserBox = ({
    user,
    avatar,
    name,
    score,
    isFirstUser,
    isSecondUser,
    isThirdUser,
    navigation,
}) => {
    // Function check URL của hình ảnh có hợp lệ hay ko
    const checkImageURL = (url) => {
        if (!url) return false;
        else {
            const pattern = new RegExp(
                '^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$',
                'i',
            );
            return pattern.test(url);
        }
    };

    const handleShowInformation = () => {
        navigation.navigate('Profile', {
            userInfo: user,
            other: true,
        });
    };

    return (
        <TouchableOpacity
            style={styles.userBox}
            onPress={handleShowInformation}
        >
            {/* avatar */}
            <View style={styles.avatarContainer}>
                {isFirstUser ? <Badge badge={images.goldBadge} /> : null}
                {isSecondUser ? <Badge badge={images.silverBadge} /> : null}
                {isThirdUser ? <Badge badge={images.bronzeBadge} /> : null}

                <Image
                    style={styles.avatar}
                    resizeMode="contain"
                    source={
                        checkImageURL(avatar)
                            ? { uri: avatar }
                            : images.defaultAvatar
                    }
                />
            </View>

            {/* user name */}
            <Text style={styles.name} numberOfLines={2}>
                {name}
            </Text>

            {/* score */}
            <View style={styles.scoreContainer}>
                <Text style={styles.score} numberOfLines={1}>
                    {score}
                </Text>

                <Text style={styles.score} numberOfLines={1}>
                    {' '}
                    QP
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default UserBox;
