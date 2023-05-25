import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Onboard from '../screens/auth/Onboard';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import Reset from '../screens/auth/Reset';
import SendOTP from 'src/screens/auth/SendOTP';
import Newpass from '../screens/auth/Newpass';
import LetterScreen from 'src/screens/auth/LetterScreen';

const AuthStack = createStackNavigator();

export default function AuthNavigator(props) {
    return (
        <AuthStack.Navigator
            initialRouteName="Onboard"
            screenOptions={{ headerShown: false }}
        >
            <AuthStack.Screen name="Onboard" component={Onboard} />
            <AuthStack.Screen name="Login" component={Login} />

            <AuthStack.Screen name="Register" component={Register} />

            <AuthStack.Screen name="SendOTP" component={SendOTP} />
            <AuthStack.Screen name="Reset" component={Reset} />
            <AuthStack.Screen name="Newpass" component={Newpass} />
            <AuthStack.Screen name="LetterScreen" component={LetterScreen} />
        </AuthStack.Navigator>
    );
}
