import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { bgColors, colors } from 'src/styles/color';

3;
const BoxQuiz = ({ navigation, ...props }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                const quizData = props.quizData;
                navigation.navigate(props.direct, quizData);
            }}
        >
            <Image
                style={styles.image}
                source={{
                    // uri: 'https://us.123rf.com/450wm/sn333g/sn333g1608/sn333g160800029/65791205-math-round-bright-symbol-vector-colorful-mathematics-school-subject-bright-sign-in-thin-line-style.jpg?ver=6',
                    uri:
                        props.quizData?.backgroundImage !== undefined
                            ? props.quizData?.backgroundImage
                            : 'https://us.123rf.com/450wm/sn333g/sn333g1608/sn333g160800029/65791205-math-round-bright-symbol-vector-colorful-mathematics-school-subject-bright-sign-in-thin-line-style.jpg?ver=6',
                }}
            />

            <View style={styles.info}>
                <Text style={styles.textHeader}>{props.quizData.name}</Text>
                <Text style={styles.numberRank}>
                    {props.quizData.numberOfQuestions} * questions
                </Text>
            </View>
            <Ionicons
                name="chevron-forward"
                style={{
                    color: colors.primary,
                    position: 'absolute',
                    right: 0,
                    right: 10,
                    alignSelf: 'center',
                }}
                size={25}
            />
        </TouchableOpacity>
    );
};

export default BoxQuiz;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderColor: bgColors.lightPurple,
        borderWidth: 2,
        borderRadius: 20,
        height: 85,
        padding: 8,
        flexDirection: 'row',
        marginBottom: 15,
    },
    image: {
        width: 65,
        height: 65,
        borderRadius: 15,
        justifyContent: 'center',
        resizeMode: 'contain',
    },
    info: {
        justifyContent: 'space-between',
        display: 'flex',
        marginLeft: 10,
        flexDirection: 'column',
        padding: 7,
    },

    textHeader: {
        fontSize: 15,
        fontWeight: '900',
    },
    numberRank: {
        fontSize: 13,
        color: 'gray',
    },
});
