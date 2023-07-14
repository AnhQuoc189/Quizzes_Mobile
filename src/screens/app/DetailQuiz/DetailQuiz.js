//Library
import {
    StyleSheet,
    View,
    SafeAreaView,
    Modal,
    Pressable,
    Alert,
    TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';

//component
import Header from 'src/components/auth/Header';
import HeaderBack from 'src/components/auth/HeaderBack';
import EditOrDelete from './EditOrDelete';
import { QuizInfo } from 'src/components';

//color
import { bgColors, colors } from 'src/styles/color';

//icons
import { SimpleLineIcons } from '@expo/vector-icons';

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
        <View style={styles.container}>
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
            <View style={styles.viewMain}>
                {/* <Header
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
                /> */}
                <View style={styles.viewHeader}>
                    <HeaderBack
                        title="Question"
                        handleBack={() => navigation.goBack()}
                        option={
                            <TouchableOpacity onPress={handleOption}>
                                <SimpleLineIcons
                                    name="options"
                                    size={25}
                                    color="#333"
                                />
                            </TouchableOpacity>
                        }
                    />
                </View>
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
        </View>
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
    viewHeader: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewMain: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        gap: 20,
    },
});
