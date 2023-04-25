import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';

import { colors } from 'src/styles/color';
import logo from 'src/assets/images/logo.png';

export default function WaitingRoom() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewAll}>
                <Text style={styles.viewTitle}>Quiz Title</Text>
                <View style={styles.viewQuiz}>
                    <View style={styles.viewQuizHeader}>
                        <Image style={styles.viewImage} source={logo} />
                        <Text style={{ textAlign: 'center' }}>
                            What will you do when your girlfriend go to hotel
                            with another man
                        </Text>
                    </View>
                    {/* <Divider color="gray"></Divider> */}
                    <View style={styles.viewQuizMore}>
                        <Text>Creator Name</Text>
                        <Text>5 questions</Text>
                    </View>
                </View>
                <View style={styles.viewButton}>
                    <TouchableOpacity>
                        <View
                            style={{
                                ...styles.buttonItem,
                                backgroundColor: '#DFDFDE',
                            }}
                        >
                            <Text>Cancle</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View
                            style={{
                                ...styles.buttonItem,
                                backgroundColor: '#16FF00',
                            }}
                        >
                            <Text>OK,Lets'go</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.lightPurple,
    },

    viewAll: {
        height: '60%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },

    viewTitle: {
        color: '#fff',
        fontSize: 24,
    },

    viewQuiz: {
        height: '40%',
        width: '70%',
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    viewQuizHeader: {
        height: '70%',
        width: '92%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },

    viewImage: {
        height: '50%',
        resizeMode: 'contain',
    },
    viewQuizMore: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    viewButton: {
        width: '70%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    buttonItem: {
        height: 50,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
});
