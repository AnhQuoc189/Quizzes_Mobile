import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import BoxUser from '../BoxUser';

const FriendsFilter = () => {
    return (
        <View style={styles.container}>
            <BoxUser normal={true} />
            <BoxUser normal={true} />
            <BoxUser normal={true} />
            <BoxUser normal={true} />
            <BoxUser normal={true} />
        </View>
    );
};

export default FriendsFilter;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        display: 'flex',
        paddingHorizontal: 15,
    },
});
