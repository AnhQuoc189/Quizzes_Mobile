// Library
import { StyleSheet, Text } from 'react-native';

// Layout
import MainLayout from 'src/layouts/MainLayout';

// Component
import Header from 'src/components/creator/Header';

const ChooseCategory = ({ navigation }) => {
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
            <Text>Choose Category</Text>
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
});
export default ChooseCategory;
