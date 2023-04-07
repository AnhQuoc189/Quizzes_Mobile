import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
} from 'react-native';
import Header from '../../components/auth/Header';
import Item from '../../components/auth/Item';

import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Switch } from 'react-native-paper';

export default function Settings({ navigation }) {
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView
                style={{ width: '90%' }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.viewAll}>
                    <Header
                        title="Settings"
                        direct="Onboard"
                        navigation={navigation}
                    />
                    <View style={styles.viewAccountAndOther}>
                        <Text style={styles.textAccount}>ACCOUNT</Text>
                        <Item
                            icon={
                                <Feather
                                    name="user"
                                    size={24}
                                    color="#865DFF"
                                />
                            }
                            title="Update Profile"
                            text="Update username,country,etc"
                        />

                        <Item
                            icon={
                                <MaterialCommunityIcons
                                    name="email-outline"
                                    size={24}
                                    color="#865DFF"
                                />
                            }
                            title="Change Email Address"
                            text="binbin18092003@gmail.com"
                        />
                        <Item
                            icon={
                                <MaterialIcons
                                    name="lock-outline"
                                    size={24}
                                    color="#865DFF"
                                />
                            }
                            title="Change Password"
                            text="Last change 1 year ago"
                        />
                    </View>

                    <View style={styles.viewAccountAndOther}>
                        <Text style={styles.textAccount}>OTHER</Text>
                        <View style={styles.viewNotification}>
                            <Text style={{ fontWeight: 900, fontSize: 16 }}>
                                Notification
                            </Text>
                            <Switch
                                style={{
                                    transform: [
                                        { scaleX: 1.2 },
                                        { scaleY: 1.2 },
                                    ],
                                }}
                            />
                        </View>

                        <Item
                            icon={
                                <MaterialCommunityIcons
                                    name="umbrella-beach-outline"
                                    size={24}
                                    color="#865DFF"
                                />
                            }
                            title="Change Difficulty"
                            text="Easy, normal, hard"
                        />
                        <Item
                            icon={
                                <AntDesign
                                    name="question"
                                    size={24}
                                    color="#865DFF"
                                />
                            }
                            title="FAQ"
                            text="Most frequently asked question"
                        />
                    </View>
                    <TouchableOpacity>
                        <View style={styles.viewLogout}>
                            <Text style={styles.textLogout}>Logout</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: '#fff',
        display: 'flex',
        width: '100%',
        height: '100%',
        gap: 10,
        alignItems: 'center',
    },
    viewAll: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    viewAccountAndOther: {
        marginTop: 20,
        width: '100%',
        flexDirection: 'column',
        gap: 20,
    },

    textAccount: {
        fontWeight: 700,
        color: 'gray',
    },

    viewOthers: {
        marginTop: 20,
        flexDirection: 'column',
    },
    viewNotification: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    viewLogout: {
        marginTop: 20,
    },

    textLogout: {
        color: '#FF8400',
        fontWeight: 700,
    },
});
