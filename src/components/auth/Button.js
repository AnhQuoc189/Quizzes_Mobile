import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { ActivityIndicator } from 'react-native';

export default function Button({ navigation, ...props }) {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View
                style={[
                    styles.viewButon,
                    { backgroundColor: props.click ? 'gray' : '#865DFF' },
                ]}
            >
                {props.loading ? (
                    <View style={styles.viewLoading}>
                        <ActivityIndicator size="large" color="#fff" />
                    </View>
                ) : (
                    <Text style={styles.textTitle}>{props.title}</Text>
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    viewLoading: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewButon: {
        width: 310,
        height: 50,

        borderRadius: 20,
        justifyContent: 'center',
    },

    textTitle: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 600,
    },
});
