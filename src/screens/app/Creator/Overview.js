// Library
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Color
import { bgColors, colors } from 'src/styles/color';

// Component
import { Header } from 'src/components/creator';
import { TouchableOpacity } from 'react-native';

// Constant
import { categories } from 'src/constants/category.constant';

const Overview = ({ navigation }) => {
    // State RTK
    const quiz = useSelector((state) => state.creator.quizData);

    const questionList = quiz.questionList;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Header
                    title="Overview"
                    navigation={navigation}
                    direct="Creator"
                />
            </View>

            <ScrollView contentContainerStyle={{}}>
                {/* Quiz */}
                <View style={styles.quizInfo}>
                    {/* Heading */}
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        {/* Quiz Category */}
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                backgroundColor: bgColors.lightPurple,
                                padding: 10,
                                borderRadius: 15,
                            }}
                        >
                            <MaterialCommunityIcons
                                name={
                                    categories.find(
                                        (category) =>
                                            category.name === quiz.category,
                                    ).icon
                                }
                                size={25}
                                color={colors.lightPurple}
                            />
                            <Text
                                style={{
                                    color: colors.lightPurple,
                                    fontSize: 18,
                                    marginLeft: 8,
                                    fontWeight: 600,
                                }}
                            >
                                {quiz.category} - {quiz.numberOfQuestion}{' '}
                                questions
                            </Text>
                        </View>

                        {/* Edit Quiz Info Button */}
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Creator')}
                        >
                            <MaterialCommunityIcons
                                name="pencil-outline"
                                size={30}
                                color="gray"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Title */}
                    <Text
                        style={{
                            marginTop: 10,
                            fontSize: 20,
                            fontWeight: 700,
                        }}
                    >
                        {quiz.title}
                    </Text>

                    {/* Description */}
                    <Text
                        style={{
                            marginTop: 10,
                            fontSize: 18,
                            color: 'gray',
                        }}
                    >
                        {quiz.description || 'No description'}
                    </Text>
                </View>

                {/* Question List */}
                <View style={styles.questionListContainer}>
                    {/* Heading */}
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: 700,
                                }}
                            >
                                Questions
                            </Text>
                            <View
                                style={{
                                    marginLeft: 8,
                                    backgroundColor: colors.primary,
                                    paddingVertical: 6,
                                    paddingHorizontal: 8,
                                    borderRadius: 5,
                                }}
                            >
                                <Text style={{ color: '#fff' }}>
                                    {quiz.numberOfQuestion}
                                </Text>
                            </View>
                        </View>

                        {/* Edit Question Button */}
                        <TouchableOpacity
                            onPress={() => navigation.navigate('AddQuestion')}
                        >
                            <MaterialCommunityIcons
                                name="pencil-outline"
                                size={30}
                                color="gray"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* List */}
                    <View
                        style={{
                            backgroundColor: bgColors.lightPurple,
                            marginTop: 10,
                            paddingTop: 10,
                            paddingHorizontal: 10,
                            borderRadius: 15,
                        }}
                    >
                        {questionList.map((question) => (
                            <View style={styles.question} key={question.index}>
                                {/* Index */}
                                <View
                                    style={{
                                        backgroundColor: '#fff',
                                        width: 30,
                                        height: 30,
                                        borderRadius: 99,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: colors.primary,
                                            fontSize: 16,
                                            fontWeight: 600,
                                        }}
                                    >
                                        {question.index + 1}
                                    </Text>
                                </View>

                                <View>
                                    {/* Question */}
                                    <Text style={{ fontSize: 18, width: 200 }}>
                                        {question.question || 'No Question'}
                                    </Text>

                                    {/* Type */}
                                    <Text
                                        style={{ color: 'gray', marginTop: 5 }}
                                    >
                                        {question.type}
                                    </Text>
                                </View>

                                {/* Cover Image */}
                                <View
                                    style={{
                                        backgroundColor: 'red',
                                        width: 80,
                                        height: 50,
                                        borderRadius: 10,
                                    }}
                                ></View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Overview;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        paddingTop: 16,
        paddingHorizontal: 10,
    },
    header: {
        marginTop: 25,
        paddingHorizontal: 20,
    },
    quizInfo: {
        marginTop: 25,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 15,
    },
    questionListContainer: {
        marginTop: 25,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 15,
    },
    question: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
});
