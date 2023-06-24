//Library
import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';

//component
import LookupItem from 'src/components/auth/LookupItem';
import { AntDesign } from '@expo/vector-icons';

//icons
import { Feather } from '@expo/vector-icons';

//image
import lookup from '../../assets/images/lookup.png';
import students from 'src/assets/images/students.png';
import teacher from 'src/assets/images/teacher.png';

export default function UserType({ navigation }) {
    return (
        <SafeAreaView style={styles.viewSafeArea}>
            <View style={styles.viewHeader}>
                <Text style={styles.textTitle}>Quizzes</Text>
            </View>
            <View style={styles.viewMain}>
                <View style={styles.viewMainHeader}>
                    <View style={styles.viewMainHeaderText}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Lookup')}
                        >
                            <AntDesign
                                name="arrowleft"
                                size={30}
                                color="black"
                            />
                        </TouchableOpacity>
                        <View>
                            <Text>Chào mừng!</Text>
                            <Text style={{ fontSize: 20 }}>
                                Bạn đang sử dụng Quizzes ở đâu?
                            </Text>
                        </View>
                    </View>
                    <Image
                        source={lookup}
                        resizeMode="cover"
                        style={{ height: 150, width: 130 }}
                    />
                </View>
                <View style={styles.viewMainContainer}>
                    <LookupItem
                        icon={<Feather name="user" size={24} color="#865DFF" />}
                        image={students}
                        title="Học sinh"
                        text="Tham gia các hoạt động của cộng đồng vui nhộn"
                        onPress={() =>
                            navigation.navigate('Register', {
                                UserType: 'Student',
                            })
                        }
                    />
                    <LookupItem
                        icon={<Feather name="user" size={24} color="#865DFF" />}
                        image={teacher}
                        title="Giáo viên"
                        text="Tạo , lưu trữ các câu đố, tổ chức cho các bạn học sinh sinh viên các trò chơi"
                        onPress={() =>
                            navigation.navigate('Register', {
                                UserType: 'Teacher',
                            })
                        }
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    viewSafeArea: {
        width: '100%',
        height: '100%',
        backgroundColor: '#40128B',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewHeader: {
        width: '100%',
        height: '14%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
    },
    textTitle: {
        fontSize: 24,
        fontWeight: 600,
        color: '#fff',
    },
    viewMain: {
        width: '100%',
        height: '86%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    viewMainHeader: {
        height: '24%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    viewMainHeaderText: {
        justifyContent: 'space-around',
        left: 20,
        width: '50%',
    },
    viewMainContainer: {
        width: '100%',
        height: '86%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
