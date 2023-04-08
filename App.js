import * as React from 'react';

import RootNavigator from 'src/navigation/RootNavigator';

import { NavigationContainer } from '@react-navigation/native';

export default function App(props) {
    // return <RootNavigation />;

    return <RootNavigator {...props} />;

    // return <BottomNavigator {...props} />;
}
