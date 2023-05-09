import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import { colors } from 'src/styles/color';
import BoxQuiz from '../BoxQuiz';
import BoxUser from '../BoxUser';

const TopFilter = () => {
    return (
        <ScrollView style={styles.container}>
            {/* Quiz */}
            <View style={styles.headerContainer}>
                <Text style={styles.textHeader}>Quizzes</Text>

                <TouchableOpacity
                    style={{
                        paddingVertical: 2,
                        paddingLeft: 3,
                    }}
                >
                    <Text style={styles.buttonText}>See All</Text>
                </TouchableOpacity>
            </View>
            {/* 
            <BoxQuiz />
            <BoxQuiz /> */}

            {/* Friends */}
            <View style={styles.headerContainer}>
                <Text style={styles.textHeader}>Friends</Text>

                <TouchableOpacity
                    style={{
                        paddingVertical: 2,
                        paddingLeft: 3,
                    }}
                >
                    <Text style={styles.buttonText}>See All</Text>
                </TouchableOpacity>
            </View>

            <BoxUser normal={true} />
            <BoxUser normal={true} />
            <BoxUser normal={true} />
            <BoxUser normal={true} />
        </ScrollView>
    );
};

export default TopFilter;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        display: 'flex',
        padding: 15,
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 20,
    },
    textHeader: {
        fontSize: 16,
        fontWeight: '900',
    },
    buttonText: {
        fontWeight: 'bold',
        color: colors.primary,
    },
});
