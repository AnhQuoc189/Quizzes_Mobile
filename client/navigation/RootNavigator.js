import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IntroNavigator from './IntroNavigator';
import AuthNavigator from './AuthNavigator';
const RootStack = createStackNavigator();

export default function RootNavigator(props) {
    return (
        <NavigationContainer>
            <RootStack.Navigator
                initialRouteName="IntroNavigator"
                screenOptions={{ headerShown: false }}
            >
                <RootStack.Screen
                    name="IntroNavigator"
                    component={IntroNavigator}
                />
                <RootStack.Screen
                    name="AuthNavigator"
                    component={AuthNavigator}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    );
}
