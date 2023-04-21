import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { BoxUser, CategoryCard } from 'src/components';
import { categories } from 'src/constants/category.constant';
import { bgColor, colors } from 'src/styles/color';

const DisplayDiscover = () => {
    return (
        <View>
            <View style={styles.fisrtSection}>
                {/* Top picks */}
                <TouchableOpacity style={styles.boxTopPick}>
                    <View style={styles.box}>
                        <Text style={{ ...styles.textHeader, fontSize: 14 }}>
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
                        <Text style={styles.textName}>Travel Trivia Quiz</Text>

                        <View
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                marginTop: 7,
                            }}
                        >
                            <MaterialCommunityIcons
                                name="headphones"
                                size={20}
                                color="#660012"
                            />
                            <Text style={styles.textSub}>
                                Music . 5 Quizzes
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.mainContent}>
                <Text style={[styles.textName, styles.textTitle]}>
                    Top rank of the week
                </Text>

                <BoxUser number={true} normal={false} />

                <View style={styles.categoryContain}>
                    {categories.map((category) => (
                        <CategoryCard
                            width="46%"
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
        </View>
    );
};

export default DisplayDiscover;

const styles = StyleSheet.create({
    fisrtSection: {
        paddingHorizontal: 20,
        width: '100%',
    },
    textHeader: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        alignItems: 'center',
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
        display: 'flex',
        justifyContent: 'center',
        fontSize: 17,
        color: '#660012',
        fontWeight: '900',
    },
    textSub: {
        fontSize: 12,
        color: '#660012',
        fontWeight: '500',
        alignItems: 'center',
        marginLeft: 6,
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 20,
        gap: 20,
    },
});
