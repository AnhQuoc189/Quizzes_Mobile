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

                        // if(props.quizList){
                        //     navigation.navigate(props.direct,{quizList});
                        // }
                        if (props.direct === 'CommunityDetais') {
                            navigation.navigate(props.direct, {
                                quiz: props.quizData,
                                quizList: props.quizList,
                                title: props.titlee,
                            });
                        } else {
                            navigation.navigate(props.direct);
                        }
                        // navigation.navigate(props.direct);
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
            {props.community && (
                <View style={{ bottom: 70, left: 140 }}>
                    <TouchableOpacity onPress={props.addCommunity}>
                        <AntDesign name="plussquareo" size={25} color="#333" />
                    </TouchableOpacity>
                </View>
            )}
            {props.commuDetails && (
                <View style={{ bottom: 70, left: 140 }}>
                    <TouchableOpacity onPress={props.openOption}>
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
