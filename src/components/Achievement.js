//Library
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Achievement = ({ number, title, isBorder }) => {
    return (
        <View style={styles.achievement}>
            <View
                style={{
                    ...styles.section,
                    borderLeftWidth: isBorder ? 1 : 0,
                    borderRightWidth: isBorder ? 1 : 0,
                }}
            >
                <Text style={styles.textNumber}>{number}</Text>
                <Text style={styles.textTitle}>{title}</Text>
            </View>
        </View>
    );
};

export default Achievement;

const styles = StyleSheet.create({
    achievement: {
        flex: 1,

        paddingVertical: 10,
    },
    textNumber: {
        color: '#3E3D3E',
        fontSize: 18,
        fontWeight: '900',
        marginBottom: 8,
    },
    section: {
        width: '100%',
        borderLeftColor: '#F7F7F8',
        borderRightColor: '#F7F7F8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textTitle: {
        color: '#727173',
        fontWeight: '400',
        fontSize: 14,
    },
});
