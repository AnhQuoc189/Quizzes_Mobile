//Library
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import moment from 'moment/moment';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { setQuizPlay } from 'src/slices/quizSlice';

//icons
import Ionicons from 'react-native-vector-icons/Ionicons';

//color
import { bgColors, colors } from 'src/styles/color';

//RTKQuery
import { useGetUserQuery } from 'src/services/userApi';

const BoxQuiz = ({ navigation, ...props }) => {
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.auths?.authData);
    const accessToken = userData?.data?.accessToken;

    const { data } = useGetUserQuery({
        accessToken,
        userId: props.quizData.creatorId,
    });

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={async () => {
                const quizData = props.quizData;
                await dispatch(setQuizPlay(quizData));
                navigation.navigate(props.direct, {
                    quizData,
                    mylibrary: props.mylibrary,
                    avatar: data.avatar,
                    userType: props.userType,
                });
            }}
        >
            <Image
                resizeMode="cover"
                style={styles.image}
                source={{
                    // uri: 'https://us.123rf.com/450wm/sn333g/sn333g1608/sn333g160800029/65791205-math-round-bright-symbol-vector-colorful-mathematics-school-subject-bright-sign-in-thin-line-style.jpg?ver=6',
                    uri: props.quizData?.backgroundImage
                        ? props.quizData?.backgroundImage
                        : 'https://us.123rf.com/450wm/sn333g/sn333g1608/sn333g160800029/65791205-math-round-bright-symbol-vector-colorful-mathematics-school-subject-bright-sign-in-thin-line-style.jpg?ver=6',
                }}
            />

            <View style={{ ...styles.info, padding: 7 }}>
                <Text style={styles.textHeader}>{props.quizData.name}</Text>
                {props.mylibrary ? (
                    <Text style={styles.numberRank}>
                        {props.quizData.numberOfQuestions} * questions
                    </Text>
                ) : (
                    <>
                        <Text style={styles.numberRank}>
                            {props.quizData.creatorName}
                        </Text>
                        <Text style={styles.numberRank}>
                            {props.quizData.updatedAt
                                ? `UpdatedCreate:${moment(
                                      props.quizData.updatedAt,
                                  ).fromNow()}`
                                : `DateCreate:${moment(
                                      props.quizData.dateCreated,
                                  ).fromNow()}`}
                        </Text>
                    </>
                )}
            </View>
            <Ionicons
                name="chevron-forward"
                style={{
                    color: colors.primary,
                    position: 'absolute',
                    right: 0,
                    right: 10,
                    alignSelf: 'center',
                }}
                size={25}
            />
        </TouchableOpacity>
    );
};

export default BoxQuiz;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderColor: bgColors.lightPurple,
        borderWidth: 2,
        borderRadius: 20,
        height: 85,
        padding: 8,
        flexDirection: 'row',
        marginBottom: 15,
    },
    image: {
        width: 65,
        height: 65,
        borderRadius: 15,
        justifyContent: 'center',
    },
    info: {
        justifyContent: 'center',
        display: 'flex',
        marginLeft: 10,
        flexDirection: 'column',
        width: '70%',
    },

    textHeader: {
        fontSize: 15,
        fontWeight: '900',
    },
    numberRank: {
        fontSize: 13,
        color: 'gray',
    },
});
