import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text } from 'react-native';
import { bgColors } from 'src/styles/color';
import { colors } from 'src/styles/color';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
{
    /* <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="black" /> */
}
{
    /* <Ionicons name="ios-checkbox" size={24} color="black" /> */
}

export default function Answer({ name, body, host, isCorrect }) {
    return (
        <TouchableOpacity
            style={{
                ...styles.viewAnswer,
                backgroundColor:
                    isCorrect && host ? '#16FF00' : bgColors.second,
            }}
        >
            <View style={styles.viewAnswerDetails}>
                {!host && (
                    <MaterialCommunityIcons
                        name="checkbox-blank-outline"
                        size={26}
                        color={colors.primary}
                    />
                )}
                <Text
                    style={{
                        width: '90%',
                        color: isCorrect && host ? '#fff' : '#000',
                        fontWeight: 700,
                    }}
                >
                    {name}. {body}
                </Text>
                {isCorrect && host && (
                    <FontAwesome name="check" size={24} color="#fff" />
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    viewAnswer: {
        width: '100%',
        height: 50,
        borderWidth: 2,
        borderColor: 'transparent',
        borderRadius: 14,
        justifyContent: 'center',
    },

    viewAnswerDetails: {
        width: '90%',
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
        left: 20,
    },
});
