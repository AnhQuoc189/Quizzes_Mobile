import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';

export default function Profile({ navigation }) {
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
                        navigation.navigate('Settings');
                    }}
                >
                    <View>
                        <Text>Settings</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
