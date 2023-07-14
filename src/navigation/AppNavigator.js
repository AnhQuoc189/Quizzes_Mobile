//Library
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//Screen
import { DetailQuiz } from 'src/screens/app/DetailQuiz';
import JoinGame from 'src/screens/app/PlayQuiz/JoinGame';
import PlayerSolo from 'src/screens/app/PlayQuiz/PlayerSolo';
import HostScreen from 'src/screens/app/PlayQuiz/HostScreen';
import PlayerScreen from 'src/screens/app/PlayQuiz/PlayerScreen';

import BottomNavigator from './BottomNavigator/BottomNavigator';

const AppStack = createStackNavigator();

export default function AppNavigator() {
    return (
        <AppStack.Navigator
            initialRouteName="BottomNavigator"
            screenOptions={{ headerShown: false }}
        >
            <AppStack.Screen
                name="BottomNavigator"
                component={BottomNavigator}
            />
            <AppStack.Screen name="JoinGame" component={JoinGame} />
            <AppStack.Screen name="DetailQuiz" component={DetailQuiz} />
            <AppStack.Screen name="HostScreen" component={HostScreen} />
            <AppStack.Screen name="PlayerScreen" component={PlayerScreen} />
            <AppStack.Screen name="PlaySolo" component={PlayerSolo} />
        </AppStack.Navigator>
    );
}
