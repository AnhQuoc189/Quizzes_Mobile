// Library
import { StyleSheet, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from 'expo-checkbox';

// Action
import { changeAnswer } from 'src/slices/creatorSlice';
import { useState } from 'react';

const TrueOrFalseAnswer = () => {
    const activeQuestion = useSelector((state) => state.creator.activeQuestion);

    const [isCheck, setIsCheck] = useState(false);

    const dispatch = useDispatch();

    return (
        <>
            {activeQuestion.answerList.map((answer) => (
                <View
                    key={answer.name}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderColor: 'gray',
                        borderWidth: 1,
                        borderRadius: 15,
                        marginTop: 10,
                        backgroundColor: isCheck
                            ? answer.isCorrect
                                ? '#26890c'
                                : '#e21b3c'
                            : '#fff',
                    }}
                >
                    <Text
                        style={{
                            ...styles.text,
                            color: isCheck ? '#fff' : 'gray',
                        }}
                    >
                        {answer.answer}
                    </Text>

                    <Checkbox
                        color={
                            isCheck
                                ? answer.isCorrect
                                    ? '#66bf39'
                                    : '#fff'
                                : '#66bf39'
                        }
                        style={{
                            borderRadius: 999,
                            padding: 10,
                        }}
                        value={answer.isCorrect}
                        onValueChange={(value) => {
                            setIsCheck(true);
                            dispatch(
                                changeAnswer({
                                    name: answer.name,
                                    isCorrect: value,
                                    type: 'trueOfFalse',
                                }),
                            );
                        }}
                    />
                </View>
            ))}
        </>
    );
};

export default TrueOrFalseAnswer;

const styles = StyleSheet.create({
    text: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 18,
        width: '85%',
    },
});
