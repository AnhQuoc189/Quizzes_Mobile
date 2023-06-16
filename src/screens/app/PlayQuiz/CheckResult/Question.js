//Library
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

//Screen
import Answer from './Answer';

export default function Question({ questionData, arrayCorrect, result }) {
    const type = questionData?.questionType;

    return (
        <View style={styles.container}>
            <Answer
                body={questionData?.answerList[0]?.body}
                isCorrect={questionData?.answerList[0]?.isCorrect}
                name="A"
                result={result}
            />
            <Answer
                body={questionData?.answerList[1]?.body}
                isCorrect={questionData?.answerList[1]?.isCorrect}
                name="B"
                result={result}
            />

            {type !== 'True/False' && (
                <>
                    <Answer
                        body={questionData?.answerList[2]?.body}
                        isCorrect={questionData?.answerList[2]?.isCorrect}
                        name="C"
                        result={result}
                    />
                    <Answer
                        body={questionData?.answerList[3]?.body}
                        isCorrect={questionData?.answerList[3]?.isCorrect}
                        name="D"
                        result={result}
                    />
                </>
            )}
            {/* <Answer name="C" />
            <Answer name="D" /> */}

            <View>
                <Text style={styles.textCorrect}>
                    Correct Answer: {arrayCorrect}
                </Text>
                <Text style={styles.textCorrect}>Your Answer: {result}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '80%',
        gap: 20,
    },

    textCorrect: {
        fontSize: 20,
        fontWeight: 700,
        color: '#FF6000',
    },
});
