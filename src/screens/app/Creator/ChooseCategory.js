// Library
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// Layout
import { MainLayout } from 'src/layouts';

// Constant
import { categories } from 'src/constants/category.constant';

// Actions
import { changeQuizInfo } from 'src/slices/creatorSlice';

// Component
import { CategoryCard } from 'src/components';
import { Header, Button } from 'src/components/creator';

const ChooseCategory = ({ navigation }) => {
    // const activeCategory = useSelector((state) => state.creator.activeCategory);

    const dispatch = useDispatch();

    // const handlePress = (value) => {
    //     dispatch(changeQuizInfo(value));
    // };

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
                        // activeCategory={category.name === activeCategory}
                        width="47%"
                    />
                ))}
            </ScrollView>

            <View style={{ marginTop: 10 }}>
                <Button
                    title="Next"
                    navigation={navigation}
                    direct="Creator"
                    // handlePress={handlePress}
                    // value={{
                    //     type: 'category',
                    //     value: activeCategory,
                    // }}
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
