import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Header from 'src/components/auth/Header';

import { QuizInfo } from 'src/components';
import { colors } from 'src/styles/color';

const DetailQuiz = ({ navigation, ...props }) => {
    const quizData = props.route.params;
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: '100%', flex: 1 }}>
                <Header
                    title="Question"
                    direct="Home"
                    navigation={navigation}
                />
                <QuizInfo
                    isMine={false}
                    category="TECH"
                    numberQuestions="5"
                    title="Remote Work Tool Quiz"
                    discription=" Take this basic remote work tools quiz to test your tech
                    knowledge"
                    isCreator={false}
                    navigation={navigation}
                    quizData={quizData}
                />
            </View>
        </SafeAreaView>
    );
};

export default DetailQuiz;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
    },
});
