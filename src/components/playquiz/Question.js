import React, { useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Answer from './Answer';

export default function Question({ questionData, host, Correct }) {
    const type = questionData?.questionType;

    return (
        <View style={styles.container}>
            <Answer
                body={questionData?.answerList[0]?.body}
                isCorrect={questionData?.answerList[0]?.isCorrect}
                name="A"
                host={host}
            />
            <Answer
                body={questionData?.answerList[1]?.body}
                isCorrect={questionData?.answerList[1]?.isCorrect}
                name="B"
                host={host}
            />
            {type !== 'True/False' && (
                <>
                    <Answer
                        body={questionData?.answerList[2]?.body}
                        isCorrect={questionData?.answerList[2]?.isCorrect}
                        name="C"
                        host={host}
                    />
                    <Answer
                        body={questionData?.answerList[3]?.body}
                        isCorrect={questionData?.answerList[3]?.isCorrect}
                        name="D"
                        host={host}
                    />
                </>
            )}
            {host && (
                <View>
                    <Text style={styles.textCorrect}>
                        Correct Answer: {Correct}
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        gap: 20,
    },

    textCorrect: {
        fontSize: 20,
        fontWeight: 700,
        color: '#FF6000',
    },
});
