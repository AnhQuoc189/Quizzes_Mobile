// Library
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Layout
import MainLayout from 'src/layouts/MainLayout';

// Color
import { colors, bgColor } from 'src/styles/color';

// Component
import Button from 'src/components/creator/Button';
import Header from 'src/components/creator/Header';

export default function Creator({ navigation }) {
    return (
        <MainLayout
            navigation={navigation}
            header={
                <Header
                    title="Create Quiz"
                    style={styles.header}
                    navigation={navigation}
                    direct="Home"
                />
            }
        >
            <ScrollView contentContainerStyle={{ paddingBottom: 15 }}>
                {/* Add Cover Image */}
                <TouchableOpacity style={styles.coverImage}>
                    <Ionicons
                        name="image-outline"
                        size={50}
                        style={{
                            color: colors.lightPurple,
                        }}
                    />
                    <Text
                        style={{
                            color: colors.lightPurple,
                            fontSize: 20,
                            marginTop: 5,
                            fontWeight: 600,
                        }}
                    >
                        Add Cover Image
                    </Text>
                </TouchableOpacity>

                {/* Input Title */}
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.inputTitle}
                        placeholder="Enter quiz title"
                    />
                </View>

                {/* Choose Category */}
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.label}>Category</Text>
                    <TouchableOpacity
                        style={styles.chooseCategory}
                        onPress={() => navigation.navigate('ChooseCategory')}
                    >
                        <Text
                            style={{
                                color: 'gray',
                                fontSize: 18,
                            }}
                        >
                            Choose category
                        </Text>
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            style={{ color: 'gray' }}
                        />
                    </TouchableOpacity>
                </View>

                {/* Input Description */}
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.label}>Description (optional)</Text>
                    <TextInput
                        style={styles.inputDesc}
                        placeholder="Enter quiz description"
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>
            </ScrollView>

            <Button
                title="Add question"
                navigation={navigation}
                direct="AddQuestion"
            />
        </MainLayout>
    );
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    coverImage: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bgColor.lightPurple,
        paddingVertical: 70,
        borderRadius: 25,
    },
    label: {
        fontSize: 20,
        fontWeight: 600,
    },
    inputTitle: {
        marginTop: 5,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 18,
    },
    inputDesc: {
        marginTop: 5,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 15,
        fontSize: 18,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 40,
    },
    chooseCategory: {
        marginTop: 5,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
});
