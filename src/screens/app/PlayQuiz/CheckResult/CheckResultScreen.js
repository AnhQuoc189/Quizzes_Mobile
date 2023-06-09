import React from 'react';

import QuestionScreen from './QuestionScreen';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

export default function CheckResultScreen({
    questionList,
    answer,
    handleBack,
}) {
    const arrayAnswer = answer.map((item) => item.answers);

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
                        result={arrayAnswer[question.questionIndex - 1]}
                        handleBack={handleBack}
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
