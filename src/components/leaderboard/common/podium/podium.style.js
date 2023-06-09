import { StyleSheet } from 'react-native';

import { colors } from 'src/styles/color';

const podiumSpecifications = {
    first: {
        podiumHeight: 150,
        textSize: 100,
    },
    second: {
        podiumHeight: 120,
        textSize: 80,
    },
    third: {
        podiumHeight: 90,
        textSize: 60,
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
    firstPodiumContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: podiumSpecifications.first.podiumHeight,
        backgroundColor: '#c1bcf0',
    },
    firstPodiumText: {
        fontSize: podiumSpecifications.first.textSize,
        fontWeight: 'bold',
        color: '#fff',
    },
    secondPodiumContainer: {
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
    thirdPodiumContainer: {
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
});

export default styles;
