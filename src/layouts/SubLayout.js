import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const SubLayout = (props) => {
    return <View style={styles.contain}>{props.children}</View>;
};

export default SubLayout;

const styles = StyleSheet.create({
    contain: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: 35,
        paddingHorizontal: 20,
        paddingBottom: 60,
        paddingTop: 20,
    },
});
