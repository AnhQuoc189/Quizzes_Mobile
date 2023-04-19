// Library
import { StyleSheet, View, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from 'expo-checkbox';

// Action
import { changeAnswer } from 'src/slices/creatorSlice';

const PoolAnswer = () => {
    const activeQuestion = useSelector((state) => state.creator.activeQuestion);

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
                        backgroundColor: answer.answer
                            ? answer.isCorrect
                                ? '#26890c'
                                : '#e21b3c'
                            : '#fff',
                    }}
                >
                    <TextInput
                        style={{
                            ...styles.input,
                            color: answer.answer !== '' && '#fff',
                        }}
                        placeholder={'Enter choice answer ' + answer.name}
                        value={answer.answer}
                        onChangeText={(value) => {
                            dispatch(
                                changeAnswer({
                                    name: answer.name,
                                    isCorrect: answer.isCorrect,
                                    type: 'pool',
                                    answer: value,
                                }),
                            );
                        }}
                    />

                    {answer.answer !== '' && (
                        <Checkbox
                            color={answer.isCorrect ? '#66bf39' : '#fff'}
                            style={{
                                borderRadius: 999,
                                padding: 10,
                            }}
                            value={answer.isCorrect}
                            onValueChange={(value) =>
                                dispatch(
                                    changeAnswer({
                                        name: answer.name,
                                        isCorrect: value,
                                        type: 'pool',
                                        answer: answer.answer,
                                    }),
                                )
                            }
                        />
                    )}
                </View>
            ))}
        </>
    );
};

export default PoolAnswer;

const styles = StyleSheet.create({
    input: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 18,
        width: '85%',
    },
});
