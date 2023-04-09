// Library
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Color
import { colors, bgColors } from 'src/styles/color';

const CategoryCard = ({ category, activeCategory, setActiveCategory }) => {
    const handlePressCard = (name) => {
        setActiveCategory(name);
    };

    return (
        <TouchableOpacity
            style={{
                ...styles.container,
                backgroundColor: activeCategory
                    ? colors.pink
                    : bgColors.lightPurple,
            }}
            onPress={() => handlePressCard(category.name)}
        >
            <View
                style={{
                    backgroundColor: activeCategory ? 'pink' : '#fff',
                    padding: 10,
                    borderRadius: 20,
                }}
            >
                <MaterialCommunityIcons
                    name={category.icon}
                    size={40}
                    color={activeCategory ? '#fff' : '#000'}
                />
            </View>
            <Text
                style={{
                    ...styles.label,
                    color: activeCategory ? '#fff' : colors.lightPurple,
                }}
            >
                {category.name}
            </Text>
            <Text
                style={{
                    ...styles.quizQuantity,
                    color: activeCategory ? '#fff' : colors.lightPurple,
                }}
            >
                21 Quizzes
            </Text>
        </TouchableOpacity>
    );
};

export default CategoryCard;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: bgColors.lightPurple,
        paddingVertical: 24,
        paddingHorizontal: 50,
        borderRadius: 20,
    },
    label: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 700,
    },
    quizQuantity: {
        marginTop: 10,
    },
});
