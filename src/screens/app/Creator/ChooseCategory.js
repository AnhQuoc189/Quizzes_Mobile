// Library
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LogBox } from 'react-native';

// Layout
import MainLayout from 'src/layouts/MainLayout';

// Constant
import { categories } from 'src/constants/category.constant';

// Component
import Header from 'src/components/creator/Header';
import CategoryCard from 'src/components/creator/CategoryCard';
import Button from 'src/components/creator/Button';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

const ChooseCategory = ({ navigation, route }) => {
    const { handleChangeCategory, currentCategory } = route.params;

    const [activeCategory, setActiveCategory] = useState(currentCategory);

    return (
        <MainLayout
            navigation={navigation}
            header={
                <Header
                    title="Choose Category"
                    style={styles.header}
                    navigation={navigation}
                    direct="Creator"
                />
            }
        >
            <ScrollView contentContainerStyle={styles.categoryList}>
                {categories.map((category) => (
                    <CategoryCard
                        key={category.name}
                        category={category}
                        activeCategory={category.name === activeCategory}
                        setActiveCategory={setActiveCategory}
                    />
                ))}
            </ScrollView>

            <View style={{ marginTop: 10 }}>
                <Button
                    title="Next"
                    navigation={navigation}
                    direct="Creator"
                    handlePress={handleChangeCategory}
                    value={activeCategory}
                />
            </View>
        </MainLayout>
    );
};
const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    categoryList: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 5,
        gap: 15,
    },
});
export default ChooseCategory;
