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
import home1 from 'src/assets/images/home1.png';
import home2 from 'src/assets/images/home2.png';
import home3 from 'src/assets/images/home3.png';

export default function Lookup({ navigation }) {
    return (
        <SafeAreaView style={styles.viewSafeArea}>
            <View style={styles.viewHeader}>
                <Text style={styles.textTitle}>Quizzes</Text>
            </View>
            <View style={styles.viewMain}>
                <View style={styles.viewMainHeader}>
                    <View style={styles.viewMainHeaderText}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
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
                        image={home1}
                        title="Trường"
                        text="k-12 đến Đại học"
                        onPress={() => navigation.navigate('UserType')}
                    />
                    <LookupItem
                        icon={<Feather name="user" size={24} color="#865DFF" />}
                        image={home2}
                        title="Công việc"
                        text="Doanh nghiệp hoặc phi lợi nhuận"
                        onPress={() => navigation.navigate('UserType')}
                    />
                    <LookupItem
                        icon={<Feather name="user" size={24} color="#865DFF" />}
                        image={home3}
                        title="Sử dụng cá nhân"
                        text="Những người bạn và gia đình"
                        onPress={() => navigation.navigate('UserType')}
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
    viewBack: {},
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
