import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { colors } from 'src/styles/color';

const answerConst = ['A', 'B', 'C', 'D'];

const BoxQuestion = ({ number, title, type, questionData, mylibrary }) => {
    return (
        <View style={styles.container}>
            <View style={styles.numberBox}>
                <Text style={styles.textNumber}>
                    {questionData.questionIndex}
                </Text>
            </View>

            <View style={{ width: '65%' }}>
                <Text style={styles.textTitle}>{questionData.question}</Text>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <Text style={styles.textType}>
                        {questionData.optionQuestion
                            ? questionData.optionQuestion + ' Choice'
                            : 'Single Choice'}
                    </Text>
                    <Text style={styles.textType}>
                        Time: {questionData.answerTime} second
                    </Text>
                </View>
                <View>
                    {questionData.answerList.map((answer, index) => (
                        <Text
                            key={index}
                            style={{
                                fontWeight: 500,
                                color:
                                    answer.isCorrect && mylibrary
                                        ? 'red'
                                        : '#333',
                            }}
                        >
                            {answerConst[index]}. {answer.body}
                        </Text>
                    ))}
                </View>
            </View>

            <Image
                style={styles.image}
                source={{
                    uri: questionData.backgroundImage
                        ? questionData.backgroundImage
                        : 'https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-cute.jpg?ssl\u003d1',
                }}
            />
        </View>
    );
};

export default BoxQuestion;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        resizeMode: 'contain',
    },
    numberBox: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textNumber: {
        color: colors.primary,
        fontWeight: '900',
    },
    textTitle: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    textType: {
        fontSize: 12,
        color: 'gray',
        marginTop: 10,
    },
});
