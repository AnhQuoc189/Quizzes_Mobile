// Library
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

//component
import Header from 'src/components/auth/Header';
import { BoxUser, CategoryCard } from 'src/components';

//styles
import { bgColor, colors } from 'src/styles/color';
import { categories } from 'src/constants/category.constant';
import { FlatList } from 'react-native';

export default function Discover({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.fisrtSection}>
                    <Header
                        title="Discover"
                        direct="Home"
                        color="white"
                        navigation={navigation}
                    />
                    <View style={styles.searchBar}>
                        <SimpleLineIcons
                            name="magnifier"
                            size={24}
                            color="white"
                        />
                        <TextInput
                            placeholderTextColor="gray"
                            textColor="gray"
                            activeUnderlineColor="transparent"
                            underlineColor="transparent"
                            placeholder="Quiz, categories, friends"
                            style={styles.textInput}
                        />
                    </View>
                    {/* Top picks */}
                    <TouchableOpacity style={styles.boxTopPick}>
                        <View style={styles.box}>
                            <Text
                                style={{ ...styles.textHeader, fontSize: 14 }}
                            >
                                TOP PICKS
                            </Text>
                        </View>

                        <View
                            style={{
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignSelf: 'baseline',
                            }}
                        >
                            <Text style={styles.textName}>
                                Travel Trivia Quiz
                            </Text>
                            <Text style={styles.textSub}>
                                Music . 5 Quizzes
                            </Text>
                        </View>
                    </TouchableOpacity>
                    {/* Main Content */}
                </View>
                <View style={styles.mainContent}>
                    <Text style={[styles.textName, styles.textTitle]}>
                        Top rank of the week
                    </Text>

                    <BoxUser number={true} />

                    <View style={styles.categoryContain}>
                        {categories.map((category) => (
                            <CategoryCard
                                width="45%"
                                key={category.name}
                                category={category}
                                activeCategory={true}
                                setActiveCategory={() => {
                                    console.log('math');
                                }}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: colors.primary,
    },
    fisrtSection: {
        paddingHorizontal: 20,
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
    },
    textHeader: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        alignItems: 'center',
    },
    searchBar: {
        width: '100%',
        marginTop: 20,
        height: 50,
        backgroundColor: '#5B4EC3',
        borderRadius: 15,
        paddingHorizontal: 15,
        alignItems: 'center',
        flexDirection: 'row',
    },
    textInput: {
        width: '100%',
        backgroundColor: 'transparent',
    },
    boxTopPick: {
        width: '100%',
        height: 180,
        marginTop: 30,
        paddingVertical: 20,
        paddingHorizontal: 30,
        backgroundColor: '#FFE0E6',
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'space-between',
    },
    box: {
        height: 35,
        backgroundColor: colors.pink,
        borderRadius: 10,
        alignItems: 'center',
        padding: 10,
        justifyContent: 'center',
        alignSelf: 'baseline',
    },
    textName: {
        fontSize: 17,
        color: '#660012',
        fontWeight: '900',
        alignItems: 'center',
    },
    textSub: {
        fontSize: 12,
        color: '#660012',
        fontWeight: '500',
        alignItems: 'center',
    },
    mainContent: {
        display: 'flex',
        width: '100%',
        backgroundColor: 'white',
        flex: 1,
        marginTop: 30,
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderRadius: 35,
        paddingBottom: 100,
    },
    textTitle: {
        fontSize: 20,
        color: 'black',
    },
    categoryContain: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 20,
        gap: 15,
    },
});
