import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../screens/splash';
import Onboard from '../screens/onboard';

const IntroStack = createStackNavigator();

export default function IntroNavigator(props) {
    return (
        <IntroStack.Navigator
            initialRouteName="Splash"
            screenOptions={{ headerShown: false }}
        >
            <IntroStack.Screen
                name="Splash"
                component={Splash}
                options={{ headerShown: false }}
            />
            <IntroStack.Screen
                name="Onboard"
                component={Onboard}
                options={{ headerShown: false }}
            />
        </IntroStack.Navigator>
    );
}
