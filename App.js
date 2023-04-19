import * as React from 'react';
import { ReactDOM } from 'react';
import { Provider } from 'react-redux';
import store from 'src/store';
import RootNavigator from 'src/navigation/RootNavigator';

export default function App(props) {
    return (
        <Provider store={store}>
            <RootNavigator {...props} />
        </Provider>
    );
}
