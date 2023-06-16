//Library
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

//icons
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

//color
import { colors } from 'src/styles/color';

export default function Answer({
    name,
    body,
    host,
    isCorrect,
    onClick,
    isAnswerSelect,
}) {
    return (
        <TouchableOpacity
            style={{
                ...styles.viewAnswer,
                backgroundColor:
                    // isCorrect && host ? '#16FF00' : bgColors.second,
                    host
                        ? isCorrect
                            ? '#16FF00'
                            : '#fff'
                        : isAnswerSelect
                        ? '#E0DEF9'
                        : '#fff',
                borderColor: !isAnswerSelect ? '#EEEEEE' : 'transparent',
            }}
            onPress={!host ? onClick : () => {}}
        >
            <View style={styles.viewAnswerDetails}>
                {!host &&
                    (!isAnswerSelect ? (
                        <MaterialCommunityIcons
                            name="checkbox-blank-outline"
                            size={26}
                            color={colors.primary}
                        />
                    ) : (
                        <Ionicons
                            name="checkbox-outline"
                            size={24}
                            color={colors.primary}
                        />
                    ))}
                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <Text
                        style={{
                            width: '80%',
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
