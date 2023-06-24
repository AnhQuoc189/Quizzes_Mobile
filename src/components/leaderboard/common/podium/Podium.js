// Libraries
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Components, styles
import styles from './podium.style';
import UserBox from '../userbox/UserBox';

// Component thân bục
const BodyPodium = ({ rank, containerStyle, textStyle }) => (
    <>
        {rank === 1 ? (
            <LinearGradient
                colors={['#9087e5', '#c1bcf0']}
                locations={[0.2, 0.8]}
                style={containerStyle}
            >
                <Text style={textStyle} numberOfLines={1}>
                    {rank}
                </Text>
            </LinearGradient>
        ) : (
            <View style={containerStyle}>
                <Text style={textStyle} numberOfLines={1}>
                    {rank}
                </Text>
            </View>
        )}
    </>
);

// Component đỉnh bục
const TopPodium = ({ style }) => <View style={style} />;

const Podium = ({ firstUser, secondUser, thirdUser, navigation }) => {
    return (
        <View style={styles.container}>
            {/* Rank 2 */}
            <View
                style={{
                    flex: 1,
                }}
            >
                {secondUser ? (
                    <UserBox
                        user={secondUser}
                        avatar={secondUser.avatar}
                        name={secondUser.userName}
                        score={secondUser.point}
                        isSecondUser={true}
                        navigation={navigation}
                    />
                ) : null}

                <TopPodium style={styles.secondTopPodium} />

                <BodyPodium
                    rank={2}
                    containerStyle={styles.secondBodyPodiumContainer}
                    textStyle={styles.secondPodiumText}
                />
            </View>

            {/* Rank 1 */}
            <View
                style={{
                    flex: 1,
                }}
            >
                {firstUser ? (
                    <UserBox
                        user={firstUser}
                        avatar={firstUser.avatar}
                        name={firstUser.userName}
                        score={firstUser.point}
                        isFirstUser={true}
                        navigation={navigation}
                    />
                ) : null}

                <TopPodium style={styles.firstTopPodium} />

                <BodyPodium
                    rank={1}
                    containerStyle={styles.firstBodyPodiumContainer}
                    textStyle={styles.firstPodiumText}
                />
            </View>

            {/* Rank 3 */}
            <View
                style={{
                    flex: 1,
                }}
            >
                {thirdUser ? (
                    <UserBox
                        user={thirdUser}
                        avatar={thirdUser.avatar}
                        name={thirdUser.userName}
                        score={thirdUser.point}
                        isThirdUser={true}
                        navigation={navigation}
                    />
                ) : null}

                <TopPodium style={styles.thirdTopPodium} />

                <BodyPodium
                    rank={3}
                    containerStyle={styles.thirdBodyPodiumContainer}
                    textStyle={styles.thirdPodiumText}
                />
            </View>
        </View>
    );
};

export default Podium;
