import React from 'react';
import {
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

export default function Register({ navigation }) {
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView
                style={{ width: '90%' }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.viewContainer}>
                    <View style={styles.header}>
                        <View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('TakePart')}
                            >
                                <AntDesign
                                    name="arrowleft"
                                    size={30}
                                    color="black"
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.headerRegister}>Register</Text>
                    </View>

                    <View style={styles.formItem}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <View style={styles.viewItem}>
                                <View style={styles.viewTextSmall}>
                                    <Feather
                                        name="user"
                                        size={24}
                                        color="#865DFF"
                                    />
                                    <TextInput
                                        style={{ width: '60%' }}
                                        placeholder="FirstName"
                                    />
                                </View>
                            </View>
                            <View style={styles.viewItem}>
                                <View style={styles.viewTextSmall}>
                                    <Feather
                                        name="user"
                                        size={24}
                                        color="#865DFF"
                                    />
                                    <TextInput
                                        style={{ width: '60%' }}
                                        placeholder="LastName"
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.viewItem}>
                            <Text style>UserType</Text>

                            <View style={styles.viewTextInput}>
                                <Ionicons
                                    name="ios-options"
                                    size={24}
                                    color="#865DFF"
                                />
                                <TextInput
                                    style={{ width: '80%' }}
                                    placeholder="Your password"
                                />
                            </View>
                        </View>
                        <View style={styles.viewItem}>
                            <Text style>UserName</Text>

                            <View style={styles.viewTextInput}>
                                <Feather
                                    name="user"
                                    size={24}
                                    color="#865DFF"
                                />
                                <TextInput
                                    style={{ width: '80%' }}
                                    placeholder="UserName"
                                />
                            </View>
                        </View>
                        <View style={styles.viewItem}>
                            <Text style>Email</Text>

                            <View style={styles.viewTextInput}>
                                <MaterialCommunityIcons
                                    name="email-outline"
                                    size={24}
                                    color="#865DFF"
                                />
                                <TextInput
                                    style={{ width: '80%' }}
                                    placeholder="Your Email"
                                />
                            </View>
                        </View>
                        <View style={styles.viewItem}>
                            <Text style>Password</Text>

                            <View style={styles.viewTextInput}>
                                <MaterialIcons
                                    name="lock-outline"
                                    size={24}
                                    color="#865DFF"
                                />
                                <TextInput
                                    style={{ width: '70%' }}
                                    placeholder="Your password"
                                    secureTextEntry={true}
                                />
                                <TouchableOpacity>
                                    <MaterialCommunityIcons
                                        name="eye-off-outline"
                                        size={24}
                                        color="#865DFF"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.viewItem}>
                            <Text style>Confirm Password</Text>
                            <View style={styles.viewTextInput}>
                                <MaterialIcons
                                    name="lock-outline"
                                    size={24}
                                    color="#865DFF"
                                />
                                <TextInput
                                    style={{ width: '70%' }}
                                    placeholder="Confirm Password"
                                    secureTextEntry={true}
                                />
                                <TouchableOpacity>
                                    <MaterialCommunityIcons
                                        name="eye-off-outline"
                                        size={24}
                                        color="#865DFF"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity>
                            <View style={styles.viewRegister}>
                                <Text style={styles.textRegister}>
                                    Register
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: '#E3DFFD',
        display: 'flex',
        // flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    viewContainer: {
        width: '100%',
        // justifyContent: 'space-around',
        alignItems: 'center',
        gap: 10,
    },

    header: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 60,
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 80,
        marginBottom: 20,
    },

    headerRegister: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 700,
    },
    formItem: {
        flexDirection: 'column',
        gap: 20,
    },

    viewItem: {
        display: 'flex',
        justifyContent: 'center',
    },

    viewTextInput: {
        width: 310,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },

    viewTextSmall: {
        width: 140,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },

    viewRegister: {
        backgroundColor: '#865DFF',
        width: '100%',
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },

    textRegister: {
        color: 'white',
        fontWeight: 800,
    },
});
