import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { colors } from 'src/styles/color';

const BoxQuestion = ({ number, title, type }) => {
    return (
        <View style={styles.container}>
            <View style={styles.numberBox}>
                <Text style={styles.textNumber}>{number}</Text>
            </View>

            <View style={{ width: '65%' }}>
                <Text style={styles.textTitle}>{title}</Text>

                <Text style={styles.textType}>{type}</Text>
            </View>

            <Image
                style={styles.image}
                source={{
                    uri: 'https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-cute.jpg?ssl\u003d1',
                }}
            />
        </View>
    );
};

export default BoxQuestion;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        resizeMode: 'contain',
    },
    numberBox: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textNumber: {
        color: colors.primary,
        fontWeight: '900',
    },
    textTitle: {
        fontWeight: 'bold',
    },
    textType: {
        fontSize: 12,
        color: 'gray',
        marginTop: 10,
    },
});
