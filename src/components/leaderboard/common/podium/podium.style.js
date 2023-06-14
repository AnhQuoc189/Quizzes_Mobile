import { StyleSheet } from 'react-native';

import { colors } from 'src/styles/color';

const podiumSpecifications = {
    first: {
        podiumHeight: 140,
        textSize: 90,
    },
    second: {
        podiumHeight: 110,
        textSize: 70,
    },
    third: {
        podiumHeight: 80,
        textSize: 50,
    },
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 21,
        marginTop: 30,
    },
    firstBodyPodiumContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: podiumSpecifications.first.podiumHeight,
    },
    firstPodiumText: {
        fontSize: podiumSpecifications.first.textSize,
        fontWeight: 'bold',
        color: '#fff',
    },
    secondBodyPodiumContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: podiumSpecifications.second.podiumHeight,
        backgroundColor: colors.lightPurple,
    },
    secondPodiumText: {
        fontSize: podiumSpecifications.second.textSize,
        fontWeight: 'bold',
        color: '#fff',
    },
    thirdBodyPodiumContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: podiumSpecifications.third.podiumHeight,
        backgroundColor: colors.lightPurple,
    },
    thirdPodiumText: {
        fontSize: podiumSpecifications.third.textSize,
        fontWeight: 'bold',
        color: '#fff',
    },
    firstTopPodium: {
        width: '100%',
        height: 0,
        borderBottomWidth: 15,
        borderBottomColor: '#cdc9f3',
        borderLeftWidth: 15,
        borderLeftColor: 'transparent',
        borderRightWidth: 15,
        borderRightColor: 'transparent',
        borderStyle: 'solid',
    },
    secondTopPodium: {
        width: '100%',
        height: 0,
        borderBottomWidth: 15,
        borderBottomColor: '#aea7ec',
        borderLeftWidth: 15,
        borderLeftColor: 'transparent',
        borderRightWidth: 0,
        borderRightColor: 'transparent',
        borderStyle: 'solid',
    },
    thirdTopPodium: {
        width: '100%',
        height: 0,
        borderBottomWidth: 15,
        borderBottomColor: '#aea7ec',
        borderLeftWidth: 0,
        borderLeftColor: 'transparent',
        borderRightWidth: 15,
        borderRightColor: 'transparent',
        borderStyle: 'solid',
    },
});

export default styles;
