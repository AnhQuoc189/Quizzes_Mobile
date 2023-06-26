//Library
import {
    StyleSheet,
    View,
    SafeAreaView,
    Modal,
    Pressable,
    Alert,
} from 'react-native';
import React, { useState } from 'react';

//component
import Header from 'src/components/auth/Header';
import EditOrDelete from './EditOrDelete';
import { QuizInfo } from 'src/components';

//color
import { bgColors, colors } from 'src/styles/color';

const DetailQuiz = ({ navigation, ...props }) => {
    const {
        quizList,
        title,
        quizData,
        mylibrary,
        avatar,
        community,
        userType,
        home,
        discover,
    } = props.route.params;

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
                <Pressable
                    onPress={() => setModalOption(!modalOption)}
                    style={{
                        height: '100%',
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        backgroundColor: 'rgba(105,105,105, 0.6)',
                    }}
                >
                    <EditOrDelete
                        onClose={() => setModalOption(false)}
                        quizData={quizData}
                        navigation={navigation}
                        mylibrary={mylibrary}
                        avatar={avatar}
                        quizList={quizList}
                        title={title}
                        userType={userType}
                        community={community}
                        discover={discover}
                    />
                </Pressable>
            </Modal>
            <View style={{ width: '100%', flex: 1 }}>
                <Header
                    title="Question"
                    direct={
                        mylibrary
                            ? 'Home'
                            : community
                            ? 'CommunityDetais'
                            : userType === 'Student' && home
                            ? 'Home'
                            : 'Discover'
                    }
                    quizData={quizData}
                    quizList={quizList}
                    titlee={title}
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
                    mylibrary={mylibrary}
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
