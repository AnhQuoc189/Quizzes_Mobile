import { StyleSheet } from 'react-native';

import { colors } from 'src/styles/color';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 16,
        marginHorizontal: 14,
        backgroundColor: colors.darkSlateBlue,
        borderRadius: 20,
        elevation: 5,
    },
    btn: (name, activeTab) => ({
        width: '45%',
        alignItems: 'center',
        backgroundColor: name === activeTab ? colors.lightPurple : null,
        margin: 4,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 16,
        opacity: name === activeTab ? 1 : 0.7,
    }),
    btnText: (name, activeTab) => ({
        fontSize: 14,
        color: '#fff',
        fontWeight: name === activeTab ? 'bold' : 'normal',
    }),
});

export default styles;
