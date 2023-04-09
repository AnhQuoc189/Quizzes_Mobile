import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function Header({ navigation, ...props }) {
    return (
        <View style={styles.header}>
            <View>
                <Text style={{ ...styles.headerTitle, color: props.color }}>
                    {props.title}
                </Text>
            </View>
            <View style={{ bottom: 33, right: 150 }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate(props.direct)}
                >
                    <AntDesign name="arrowleft" size={30} color={props.color} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 60,
        display: 'flex',
        marginTop: 30,
        alignItems: 'center',
        display: 'flex',
        top: 24,
    },
    headerTitle: {
        fontSize: 28,
        textAlign: 'center',
        fontWeight: 700,
        alignItems: 'center',
    },
});
