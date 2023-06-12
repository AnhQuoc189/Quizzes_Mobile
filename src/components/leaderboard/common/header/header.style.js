import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginTop: 25,
        marginHorizontal: 20,
    },
    backBtnHeader: {
        position: 'absolute',
        left: 0,
    },
    titleHeader: {
        fontSize: 22,
        color: '#fff',
        fontWeight: '600',
    },
});

export default styles;
