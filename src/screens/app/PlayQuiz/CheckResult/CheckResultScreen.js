import React from 'react';

import QuestionScreen from './QuestionScreen';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

export default function CheckResultScreen({ navigation, ...props }) {
    // console.log(props.route.params.quizData.name);

    const questionList = props.route.params.quizData.questionList;
    const result = props.route.params.checkRestult;

    return (
        <SafeAreaView style={styles.viewSafe}>
            <ScrollView
                contentContainerStyle={styles.pagination}
                pagingEnabled={true}
                horizontal={true}
            >
                {questionList.map((question) => (
                    <QuestionScreen
                        key={question.questionIndex}
                        length={questionList.length}
                        questionData={question}
                        result={result[question.questionIndex - 1]}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    viewSafe: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F1FDFF',
    },
    pagination: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'scroll',
        height: '100%',
    },
});
