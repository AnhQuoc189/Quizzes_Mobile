import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from '../screens/auth/Splash';

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
        </IntroStack.Navigator>
    );
}
