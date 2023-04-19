import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';

export default function Button({ navigation, ...props }) {
    console.log(props.click);
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View
                style={[
                    styles.viewButon,
                    { backgroundColor: props.click ? 'gray' : '#865DFF' },
                ]}
            >
                <Text style={styles.textTitle}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
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
