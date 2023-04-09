// Library
import { StyleSheet, Text, View } from 'react-native';

// Layout
import MainLayout from 'src/layouts/MainLayout';

// Component
import Header from 'src/components/creator/Header';

const AddQuestion = ({ navigation }) => {
    return (
        <MainLayout
            navigation={navigation}
            header={
                <Header
                    title="Add Question"
                    style={styles.header}
                    navigation={navigation}
                    direct="Creator"
                />
            }
        >
            <Text>Add Question</Text>
        </MainLayout>
    );
};

export default AddQuestion;

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
