import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    Modal,
} from 'react-native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Header from 'src/components/auth/Header';
import EditOrDelete from './EditOrDelete';

import { BlurView } from 'expo-blur';

import { QuizInfo } from 'src/components';
import { colors } from 'src/styles/color';

const DetailQuiz = ({ navigation, ...props }) => {
    const quizData = props.route.params;

    const [modalOption, setModalOption] = useState(false);

    const handleOption = () => {
        setModalOption(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalOption}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalOption(!modalOption);
                }}
            >
                <View
                    style={{
                        height: '100%',
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        backgroundColor: 'rgba(105,105,105, 0.6)',
                    }}
                    onPress={() => {
                        console.log('AAA');
                    }}
                >
                    <EditOrDelete
                        onClose={() => setModalOption(false)}
                        quizData={quizData}
                        navigation={navigation}
                    />
                </View>
            </Modal>
            <View style={{ width: '100%', flex: 1 }}>
                <Header
                    title="Question"
                    direct="Home"
                    navigation={navigation}
                    option={true}
                    handleOption={handleOption}
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
