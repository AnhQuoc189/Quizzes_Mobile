import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { QuizInfo } from 'src/components';
import { colors } from 'src/styles/color';

const DetailQuiz = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={{ width: '100%' }}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <TouchableOpacity
                    style={{ alignItems: 'center' }}
                    onPress={() => {
                        navigation.navigate('Home');
                    }}
                >
                    <Text>Header</Text>
                </TouchableOpacity>
                <QuizInfo />
            </ScrollView>
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
        paddingVertical: 50,
    },
});
