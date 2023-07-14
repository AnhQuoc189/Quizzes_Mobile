//Library
import { createStackNavigator } from '@react-navigation/stack';

//Screen
import JoinGame from 'src/screens/app/PlayQuiz/JoinGame';
import PlayerScreen from 'src/screens/app/PlayQuiz/PlayerScreen';

const JoinGameStack = createStackNavigator();

export default function JoinGameNavigator() {
    return (
        <JoinGameStack.Navigator
            initialRouteName="JoinGame"
            screenOptions={{ headerShown: false }}
        >
            <JoinGameStack.Screen name="JoinGame" component={JoinGame} />
            <JoinGameStack.Screen
                name="PlayerScreen"
                component={PlayerScreen}
            />
        </JoinGameStack.Navigator>
    );
}
