//Librari
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

//icons
import { AntDesign } from '@expo/vector-icons';

export default function LookupItem({ navigation, ...props }) {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.viewItem}
            activeOpacity={0.7}
        >
            <View style={styles.viewIcon}>
                <Image source={props.image} style={styles.viewImage} />
            </View>

            <View style={styles.viewText}>
                <Text style={{ fontWeight: 700, fontSize: 16 }}>
                    {props.title}
                </Text>
                <Text style={{ color: 'gray' }}>{props.text}</Text>
            </View>

            <TouchableOpacity onPress={props.onPress}>
                <View style={styles.viewlastIcon}>
                    <AntDesign name="arrowright" size={20} color="black" />
                </View>
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    viewItem: {
        width: '90%',
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 40,
        elevation: 4,
        shadowColor: '#333',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },

    viewIcon: {
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },

    viewImage: {
        width: 40,
        height: 40,
    },

    viewText: {
        width: '70%',
    },

    viewlastIcon: {
        width: 40,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
