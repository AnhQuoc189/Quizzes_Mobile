//Library
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

//icons
import { AntDesign } from '@expo/vector-icons';

export default function Answer({ name, body, isCorrect, result }) {
    return (
        <View
            style={{
                ...styles.viewAnswer,
                backgroundColor: isCorrect ? '#16FF00' : '#fff',
                borderColor: isCorrect
                    ? 'transparent'
                    : result.includes(name)
                    ? 'red'
                    : '#333',
            }}
        >
            <View style={styles.viewAnswerDetails}>
                <Text style={{ fontSize: 20, width: '90%' }}>
                    {name}. {body}
                </Text>
                {isCorrect && (
                    <AntDesign name="check" size={30} color="white" />
                )}
                {result.includes(name) && !isCorrect && (
                    <AntDesign name="close" size={30} color="red" />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    viewAnswer: {
        width: '100%',
        height: '14%',
        borderWidth: 2,
        borderColor: '#333',
        flexDirection: 'row',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },

    viewAnswerDetails: {
        width: '90%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
});
