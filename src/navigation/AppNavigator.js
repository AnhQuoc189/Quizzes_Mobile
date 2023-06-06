import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BottomNavigator from './BottomNavigator';
import Settings from '../screens/auth/Settings';
import { PlayQuiz } from 'src/screens/app/PlayQuiz';
import { DetailQuiz } from 'src/screens/app/DetailQuiz';
import JoinGame from 'src/screens/app/PlayQuiz/JoinGame';
import PlayerSolo from 'src/screens/app/PlayQuiz/PlayerSolo';
import HostScreen from 'src/screens/app/PlayQuiz/HostScreen';
import PlayerScreen from 'src/screens/app/PlayQuiz/PlayerScreen';
import CheckResultScreen from 'src/screens/app/PlayQuiz/CheckResult/CheckResultScreen';

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
            <AppStack.Screen name="Settings" component={Settings} />
            <AppStack.Screen name="PlayQuiz" component={PlayQuiz} />
            <AppStack.Screen name="DetailQuiz" component={DetailQuiz} />
            <AppStack.Screen name="JoinGame" component={JoinGame} />
            <AppStack.Screen name="HostScreen" component={HostScreen} />
            <AppStack.Screen name="PlayerScreen" component={PlayerScreen} />
            <AppStack.Screen name="PlaySolo" component={PlayerSolo} />
            <AppStack.Screen name="CheckResult" component={CheckResultScreen} />
        </AppStack.Navigator>
    );
}
