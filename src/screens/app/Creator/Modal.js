import { useEffect } from 'react';
import {
    Pressable,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { bgColors, colors } from 'src/styles/color';
import Button from 'src/components/creator/Button';

export function ModalQuiz({
    title,
    arrayModal,
    stateModal,
    setStateModal,
    handleQuizChange,
    value,
}) {
    return (
        <Pressable
            style={styles.centeredView}
            onPress={() => setStateModal(!stateModal)}
        >
            <Pressable style={styles.modalView}>
                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: 600,
                    }}
                >
                    {title}
                </Text>

                <View style={styles.timeLimitGroup}>
                    {arrayModal.map((item) => (
                        <TouchableOpacity
                            key={item}
                            style={{
                                ...styles.timeLimitBtn,
                                backgroundColor:
                                    value === item
                                        ? colors.pink
                                        : bgColors.lightPurple,
                            }}
                            onPress={() => handleQuizChange(item)}
                        >
                            <Text
                                style={{
                                    ...styles.timeLimitText,
                                    color: value === item ? '#fff' : '#000',
                                }}
                            >
                                {item}{' '}
                                {title === 'PointsPerQuestion' && 'point'}
                                {title === 'Time limit' && 'sec'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </Pressable>
        </Pressable>
    );
}

export function ModalQuizArray({
    title,
    arrayModal,
    stateModal,
    setStateModal,
    handleQuizChange,
    value,
}) {
    return (
        <Pressable
            style={styles.centeredView}
            onPress={() => setStateModal(!stateModal)}
        >
            <Pressable style={styles.modalView}>
                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: 600,
                    }}
                >
                    {title}
                </Text>

                <View style={styles.timeLimitGroup}>
                    {arrayModal.map((item) => (
                        <TouchableOpacity
                            key={item}
                            style={{
                                ...styles.timeLimitBtn,
                                backgroundColor: value.includes(item)
                                    ? colors.pink
                                    : bgColors.lightPurple,
                            }}
                            onPress={() => handleQuizChange(item)}
                        >
                            <Text
                                style={{
                                    ...styles.timeLimitText,
                                    color: value.includes(item)
                                        ? '#fff'
                                        : '#000',
                                }}
                            >
                                {item}{' '}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </Pressable>
        </Pressable>
    );
}

export function ModalNote({
    creator,
    title,
    note,
    stateModal,
    setStateModal,
    handlePress,
    loading,
    handleImportQuiz,
    showQuestionDetail,
    importQuiz,
}) {
    return (
        <Pressable
            style={styles.centeredView}
            onPress={() => setStateModal(!stateModal)}
        >
            <Pressable style={styles.modalView}>
                {/* <Text
                    style={{
                        width: '100%',
                        fontSize: 28,
                        fontWeight: 700,
                        textAlign: 'left',
                    }}
                >
                    Save latest changes?
                </Text> */}
                <Text
                    style={{
                        width: '100%',
                        textAlign: 'left',
                        marginTop: 10,
                        fontSize: 18,
                    }}
                >
                    {note}
                </Text>
                <View
                    style={{
                        marginTop: 20,
                        flexDirection: 'row',
                        width: '50%',
                        gap: 20,
                        justifyContent: 'flex-start',
                        right: 60,
                    }}
                >
                    {creator && !importQuiz ? (
                        <Button
                            title="Import File"
                            width="90%"
                            backgroundColor={colors.pink}
                            handlePress={handleImportQuiz}
                        />
                    ) : (
                        <Button
                            title="Edit Question"
                            width="90%"
                            backgroundColor={colors.pink}
                            handlePress={showQuestionDetail}
                            loading={loading}
                        />
                    )}
                    <Button
                        title={title}
                        width="80%"
                        backgroundColor={colors.pink}
                        handlePress={handlePress}
                        loading={loading}
                    />
                </View>
            </Pressable>
        </Pressable>
    );
}

export function ModalValid({
    creator,
    title,
    note,
    stateModal,
    setStateModal,
    handlePress,
    loading,
    showQuestionDetail,
}) {
    return (
        <Pressable
            style={styles.centeredView}
            onPress={() => setStateModal(!stateModal)}
        >
            <Pressable style={styles.modalView}>
                {/* <Text
                    style={{
                        width: '100%',
                        fontSize: 28,
                        fontWeight: 700,
                        textAlign: 'left',
                    }}
                >
                    Save latest changes?
                </Text> */}
                <Text
                    style={{
                        width: '100%',
                        textAlign: 'left',
                        // marginTop: 10,
                        fontSize: 18,
                    }}
                >
                    {note}
                </Text>

                <View>
                    {!creator && (
                        <Button
                            title="Edit Question"
                            width="43%"
                            backgroundColor={colors.pink}
                            handlePress={showQuestionDetail}
                            loading={loading}
                        />
                    )}
                    <Button
                        title={title}
                        width="43%"
                        backgroundColor={colors.pink}
                        handlePress={handlePress}
                        loading={loading}
                    />
                </View>
            </Pressable>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc',
        // padding: 10,
    },
    modalView: {
        width: '90%',
        height: '30%',
        margin: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 4,
        elevation: 5,
        borderColor: colors.lightPurple,
        borderWidth: 5,
    },
    timeLimitGroup: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timeLimitBtn: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 10,
    },
    timeLimitText: {
        fontSize: 16,
    },
});
