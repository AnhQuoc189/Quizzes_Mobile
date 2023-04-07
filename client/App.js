import * as React from 'react';

import RootNavigator from './navigation/RootNavigator';

import BottomNavigator from './navigation/BottomNavigation';
import { NavigationContainer } from '@react-navigation/native';
export default function App(props) {
    // return <RootNavigation />;

    return <RootNavigator {...props} />;

    // return <BottomNavigator {...props} />;
}
