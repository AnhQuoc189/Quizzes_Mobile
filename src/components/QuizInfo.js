import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useState } from 'react';

import { colors } from 'src/styles/color';
import { bgColors } from 'src/styles/color';

import BoxQuestion from './BoxQuestion';
import { Button } from './creator';

const QuizInfo = ({
    isMine,
    category,
    numberQuestions,
    title,
    discription,
    isCreator,
}) => {
    return (
        <View style={styles.container}>
            {/* First section */}
            <View style={styles.fisrtSection}>
                <View>
                    {/* category of quiz and number */}
                    <View style={styles.editBox}>
                        <View style={styles.categoryBox}>
                            <MaterialIcons
                                name="category"
                                size={12}
                                color={colors.primary}
                            />
                            <Text style={styles.textCategory}>
                                {category} . {numberQuestions} QUESTIONS
                            </Text>
                        </View>

                        {isMine && (
                            <TouchableOpacity style={{ padding: 5 }}>
                                <Feather name="edit" size={24} color="gray" />
                            </TouchableOpacity>
                        )}
                    </View>
                    {/* Name of quiz */}
                    <Text style={styles.textHeader}>{title}</Text>
                    {/* discription */}
                    <Text style={styles.textDiscription}>{discription}</Text>
                </View>
            </View>

            {/* second section */}
            <View style={styles.secondSection}>
                <View style={styles.editBox}>
                    <View
                        style={{
                            ...styles.categoryBox,
                            backgroundColor: 'transparent',
                        }}
                    >
                        <Text style={styles.textHeader}>Questions</Text>

                        <View style={styles.numberBox}>
                            <Text style={styles.textNumber}>
                                {numberQuestions}
                            </Text>
                        </View>
                    </View>

                    {isMine && (
                        <TouchableOpacity style={{ padding: 5 }}>
                            <Feather name="edit" size={24} color="gray" />
                        </TouchableOpacity>
                    )}
                </View>

                <ScrollView style={styles.questionsBox}>
                    <BoxQuestion
                        title="Which mathematical symbol was the title of Ed Sheeran's
                    first album in 2011"
                        number="1"
                        type="Multiple Choices"
                    />
                </ScrollView>

                <View style={{ marginTop: 20 }}>
                    {isCreator ? (
                        <Button title="Save" />
                    ) : (
                        <Button title="Play" />
                    )}
                </View>
            </View>
        </View>
    );
};

export default QuizInfo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        padding: 10,
    },
    fisrtSection: {
        height: 150,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },

    secondSection: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginTop: 20,
    },
    editBox: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 10,
    },
    textCategory: {
        color: colors.primary,
        fontSize: 11,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    categoryBox: {
        flexDirection: 'row',
        backgroundColor: bgColors.second,
        borderRadius: 6,
        padding: 5,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textHeader: {
        fontSize: 18,
        fontWeight: '900',
    },
    textDiscription: {
        color: 'gray',
        fontWeight: '600',
    },
    numberBox: {
        backgroundColor: colors.primary,
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 2,
        marginLeft: 5,
    },
    textNumber: {
        fontWeight: '900',
        fontSize: 12,
        color: 'white',
    },
    questionsBox: {
        height: '80%',
        borderRadius: 20,
        backgroundColor: bgColors.second,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
});
