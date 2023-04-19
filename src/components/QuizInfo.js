import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import { colors } from 'src/styles/color';
import { bgColors } from 'src/styles/color';

const QuizInfo = () => {
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
                                TECH . 5 QUESTIONS
                            </Text>
                        </View>

                        <TouchableOpacity style={{ padding: 5 }}>
                            <Feather name="edit" size={24} color="gray" />
                        </TouchableOpacity>
                    </View>
                    {/* Name of quiz */}
                    <Text style={styles.textHeader}>Remote Work Tool Quiz</Text>
                    {/* discription */}
                    <Text style={styles.textDiscription}>
                        Take this basic remote work tools quiz to test your tech
                        knowledge
                    </Text>
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
                            <Text style={styles.textNumber}>5</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={{ padding: 5 }}>
                        <Feather name="edit" size={24} color="gray" />
                    </TouchableOpacity>
                </View>

                <View></View>
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
});
