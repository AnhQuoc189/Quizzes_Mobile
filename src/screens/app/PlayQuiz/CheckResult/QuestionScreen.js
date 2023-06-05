import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
} from 'react-native';
import Question from './Question';

const screenWidth = Dimensions.get('screen').width;

export default function QuestionScreen({ questionData, length, result }) {
    console.log(result);
    const arrayCorrect = questionData.answerList.map((item) => {
        if (item.isCorrect === true) {
            return item.name;
        }
    });
    return (
        <View style={{ ...styles.container, width: screenWidth }}>
            <View
                style={{
                    width: '80%',
                    alignItems: 'center',
                    height: '100%',
                }}
            >
                <View style={styles.viewQuestionTitle}>
                    <Text style={styles.textSub}>
                        Question {questionData?.questionIndex} of {length}
                        {/* Question 1 of 3 */}
                    </Text>
                    <Text style={styles.textSub}>
                        {questionData?.optionQuestion} Choice
                        {/* Single Choice */}
                    </Text>
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={styles?.textTitle}>
                            {questionData?.question}
                        </Text>

                        <Image
                            source={{
                                uri: questionData?.backgroundImage
                                    ? questionData.backgroundImage
                                    : 'https://us.123rf.com/450wm/sn333g/sn333g1608/sn333g160800029/65791205-math-round-bright-symbol-vector-colorful-mathematics-school-subject-bright-sign-in-thin-line-style.jpg?ver=6',
                            }}
                            style={{
                                height: 70,
                                width: '40%',
                                resizeMode: 'cover',
                            }}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 40, width: '100%' }}>
                    <Question
                        questionData={questionData}
                        arrayCorrect={arrayCorrect}
                        result={result}
                        // host={host}
                        // onClick={onClick}
                        // isAnswerSelect={isAnswerSelect}
                        // Correct={
                        //     host
                        //         ? correctAnswer[questionData?.questionIndex - 1]
                        //         : ''
                        // }
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: '100%',
    },

    viewQuestionTitle: {
        width: '100%',
        height: '20%',
        justifyContent: 'center',
        alignContent: 'center',
    },

    textSub: {
        color: 'gray',
        fontSize: 14,
    },

    textTitle: {
        width: '60%',
        color: '#000',
        fontSize: 20,
    },

    viewQuestionAnswer: {
        width: '90%',
    },
});
