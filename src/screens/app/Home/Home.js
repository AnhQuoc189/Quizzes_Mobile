import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Touchable,
    TouchableOpacity,
} from 'react-native';

// import Settings from '../auth/Settings';
// import Profile from './Profile';

export default function Home({ navigation }) {
    useEffect(() => {
        const getUser = async () => {
            const AuthStore = await AsyncStorage.getItem('profile');
            const AuthStoreJS = JSON.parse(AuthStore);
            console.log(AuthStoreJS?.data.user.userName);
        };
        getUser();
    }, []);
    return (
        <SafeAreaView>
            <View
                style={{
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Profile');
                    }}
                >
                    <View>
                        <Text>Avata</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
