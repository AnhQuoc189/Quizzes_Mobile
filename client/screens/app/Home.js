import React from 'react';
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
    console.log('Anh Quoc');
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
