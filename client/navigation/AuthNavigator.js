import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Onboard from '../screens/onboard';
import Login from '../screens/login';
import Register from '../screens/register';
import Reset from '../screens/reset';
import Newpass from '../screens/newpass';
import Settings from '../screens/settings';

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
