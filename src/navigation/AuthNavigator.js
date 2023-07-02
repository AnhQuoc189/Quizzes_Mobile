import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//Screen
import Onboard from 'src/screens/auth/Onboard';
import Lookup from 'src/screens/auth/Lookup';
import UserType from 'src/screens/auth/UserType';
import Login from 'src/screens/auth/Login';
import Register from 'src/screens/auth/Register';
import Reset from 'src/screens/auth/Reset';
import SendOTP from 'src/screens/auth/SendOTP';
import Newpass from 'src/screens/auth/Newpass';
import LetterScreen from 'src/screens/auth/LetterScreen';

const AuthStack = createStackNavigator();

export default function AuthNavigator(props) {
    return (
        <AuthStack.Navigator
            initialRouteName="Onboard"
            screenOptions={{ headerShown: false }}
        >
            <AuthStack.Screen name="Onboard" component={Onboard} />
            <AuthStack.Screen name="Lookup" component={Lookup} />
            <AuthStack.Screen name="UserType" component={UserType} />
            <AuthStack.Screen name="Login" component={Login} />
            <AuthStack.Screen name="Register" component={Register} />
            <AuthStack.Screen name="SendOTP" component={SendOTP} />
            <AuthStack.Screen name="Reset" component={Reset} />
            <AuthStack.Screen name="Newpass" component={Newpass} />
            <AuthStack.Screen name="LetterScreen" component={LetterScreen} />
        </AuthStack.Navigator>
    );
}
