//Library
import { createStackNavigator } from '@react-navigation/stack';

//Screen
import Home from 'src/screens/app/Home/Home';

const HomeStack = createStackNavigator();

export default function HomeNavigator() {
    return (
        <HomeStack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
        >
            <HomeStack.Screen name="Home" component={Home} />
        </HomeStack.Navigator>
    );
}
