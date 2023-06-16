//Librari
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

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
                    onPress={() => {
                        if (props.setFocus) {
                            props.setFocus();
                        }
                        if (props.handleOutGame && props.join) {
                            props.handleOutGame();
                        }

                        navigation.navigate(props.direct);
                    }}
                >
                    <AntDesign name="arrowleft" size={30} color={props.color} />
                </TouchableOpacity>
            </View>

            {props.option && (
                <View style={{ bottom: 60, left: 140 }}>
                    <TouchableOpacity
                        onPress={() => {
                            // if (props.setFocus) {
                            //     props.setFocus();
                            // }
                            if (props.handleOption) props.handleOption();
                        }}
                    >
                        <SimpleLineIcons
                            name="options"
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
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
    },
    headerTitle: {
        fontSize: 28,
        textAlign: 'center',
        fontWeight: 700,
        alignItems: 'center',
    },
});
