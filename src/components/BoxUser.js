import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { colors } from 'src/styles/color';
import goldbadge from 'src/assets/images/goldbadge.png';
import { TouchableOpacity } from 'react-native';

const BoxUser = ({ ...props }) => {
    return (
        <TouchableOpacity
            style={{
                ...styles.container,
                backgroundColor: props.normal ? 'white' : colors.primary,
            }}
        >
            {props.number ? (
                <View style={styles.number}>
                    <Text style={{ color: 'white' }}>1</Text>
                </View>
            ) : (
                <View />
            )}

            <View>
                <Image
                    style={styles.image}
                    source={{
                        uri: 'https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-cute.jpg?ssl\u003d1',
                    }}
                />
            </View>

            <View style={styles.info}>
                <Text
                    style={{
                        ...styles.name,
                        color: props.normal ? 'black' : 'white',
                    }}
                >
                    Tuan Nguyen
                </Text>
                <Text
                    style={{
                        ...styles.numberRank,
                        color: props.normal ? 'gray' : '#F5F5FD',
                    }}
                >
                    124 points
                </Text>
            </View>
            <Image
                style={{ ...styles.image, marginLeft: 40 }}
                source={goldbadge}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 80,
        borderRadius: 20,
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 18,
    },
    number: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#B4ACEF',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginLeft: 10,
    },
    name: {
        fontSize: 15,
        fontWeight: '900',
        justifyContent: 'space-between',
    },
    numberRank: {
        fontSize: 13,
        justifyContent: 'space-between',
        color: 'white',
    },
    info: {
        justifyContent: 'space-between',
        display: 'flex',
        height: '100%',
        marginLeft: 15,
    },
});

export default BoxUser;
