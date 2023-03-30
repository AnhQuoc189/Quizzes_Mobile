import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Intro from './screens/Intro';
import TakePart from './screens/takepart';
import Login from './screens/login';
import Register from './screens/register';
import Reset from './screens/reset';
import Newpass from './screens/newpass';

export default function RootNavigation() {
    const Stack = createStackNavigator();
    const screenOptions = {
        headerShown: false,
    };
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Intro"
                screenOptions={screenOptions}
            >
                <Stack.Screen name="Intro" component={Intro} />
                <Stack.Screen name="TakePart" component={TakePart} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Reset" component={Reset} />
                <Stack.Screen name="Newpass" component={Newpass} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
