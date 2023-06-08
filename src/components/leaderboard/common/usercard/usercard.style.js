import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        padding: 16,
        borderRadius: 20,
        backgroundColor: '#FFF',
    },
    rankContainer: {
        width: 28,
        height: 28,
        backgroundColor: '#fff',
        borderRadius: 14,
        borderColor: '#DCDCDC',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    rank: {
        fontWeight: 'bold',
        color: '#808080',
        fontSize: 12,
    },
    avatarContainer: {
        display: 'flex',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 30,
    },
    textContainer: {
        flex: 1,
        marginLeft: 16,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    score: {
        color: '#808080',
        marginTop: 4,
    },
    badgeContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    badge: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
});

export default styles;
