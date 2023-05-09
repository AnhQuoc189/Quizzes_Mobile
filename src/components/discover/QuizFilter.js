import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import BoxQuiz from '../BoxQuiz';

const QuizFilter = () => {
    // const quizes = useSelector((state) => state.quizs.quizes);
    return (
        <View style={styles.container}>
            {/* <BoxQuiz />
            <BoxQuiz />
            <BoxQuiz />
            <BoxQuiz /> */}
        </View>
    );
};

export default QuizFilter;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        display: 'flex',
        padding: 15,
    },
});
