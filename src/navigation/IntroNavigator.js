//Library
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//Screen
import Splash from 'src/screens/auth/Splash';

const IntroStack = createStackNavigator();

export default function IntroNavigator() {
    return (
        <IntroStack.Navigator
            initialRouteName="Splash"
            screenOptions={{ headerShown: false }}
        >
            <IntroStack.Screen name="Splash" component={Splash} />
        </IntroStack.Navigator>
    );
}
