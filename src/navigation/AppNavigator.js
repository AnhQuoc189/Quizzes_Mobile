import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BottomNavigator from './BottomNavigator';
import { PlayQuiz } from 'src/screens/app/PlayQuiz';
import { DetailQuiz } from 'src/screens/app/DetailQuiz';

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
            <AppStack.Screen name="PlayQuiz" component={PlayQuiz} />
            <AppStack.Screen name="DetailQuiz" component={DetailQuiz} />
        </AppStack.Navigator>
    );
}
