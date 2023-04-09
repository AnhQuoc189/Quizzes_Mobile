import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BottomNavigator from './BottomNavigator';

const AppStack = createStackNavigator();

export default function AppNavigator(props) {
    return (
        <AppStack.Navigator
            initialRouteName="BottomNavigator"
            screenOptions={{ headerShown: false }}
        >
            <AppStack.Screen
                name="BottomNavigator"
                component={BottomNavigator}
            />
        </AppStack.Navigator>
    );
}
