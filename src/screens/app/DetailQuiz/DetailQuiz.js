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
            <View style={{ width: '100%', flex: 1 }}>
                <TouchableOpacity
                    style={{ alignItems: 'center' }}
                    onPress={() => {
                        navigation.navigate('Home');
                    }}
                >
                    <Text>Header</Text>
                </TouchableOpacity>
                <QuizInfo
                    isMine={false}
                    category="TECH"
                    numberQuestions="5"
                    title="Remote Work Tool Quiz"
                    discription=" Take this basic remote work tools quiz to test your tech
                    knowledge"
                    isCreator={false}
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
        paddingVertical: 50,
    },
});
