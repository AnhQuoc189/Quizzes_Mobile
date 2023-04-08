import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Onboard from '../screens/auth/Onboard';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import Reset from '../screens/auth/Reset';
import Newpass from '../screens/auth/Newpass';
import Settings from '../screens/auth/Settings';
import Home from '../screens/app/Home/Home';

const AuthStack = createStackNavigator();

export default function AuthNavigator(props) {
    return (
        <AuthStack.Navigator
            initialRouteName="Onboard"
            screenOptions={{ headerShown: false }}
        >
            <AuthStack.Screen
                name="Onboard"
                component={Onboard}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="Reset"
                component={Reset}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="Newpass"
                component={Newpass}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="Settings"
                component={Settings}
                options={{ headerShown: false }}
            />
        </AuthStack.Navigator>
    );
}
