//Librari
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

export default function HeaderBack({ title, handleBack, option, color }) {
    return (
        <View style={styles.header}>
            <View>
                <TouchableOpacity onPress={handleBack}>
                    <AntDesign
                        name="arrowleft"
                        size={30}
                        color={color ? color : '#333'}
                    />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{ ...styles.headerTitle, color: color }}>
                    {title}
                </Text>
            </View>
            {option ? (
                option
            ) : (
                <View>
                    <AntDesign name="arrowleft" size={30} color="transparent" />
                </View>
            )}
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
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontSize: 28,
        textAlign: 'center',
        fontWeight: 700,
        alignItems: 'center',
    },
});
