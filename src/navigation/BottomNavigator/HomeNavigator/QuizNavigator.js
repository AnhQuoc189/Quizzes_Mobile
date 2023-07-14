//Library
import { createStackNavigator } from '@react-navigation/stack';

//Screen
import { DetailQuiz } from 'src/screens/app/DetailQuiz';
import JoinGame from 'src/screens/app/PlayQuiz/JoinGame';
import HostScreen from 'src/screens/app/PlayQuiz/HostScreen';

const QuizStack = createStackNavigator();

export default function QuizNavigator() {
    return (
        <QuizStack.Navigator
            initialRouteName="DetailQuiz"
            screenOptions={{ headerShown: false }}
        >
            <QuizStack.Screen name="DetailQuiz" component={DetailQuiz} />
            <QuizStack.Screen name="JoinGame" component={JoinGame} />
            <QuizStack.Screen name="HostScreen" component={HostScreen} />
        </QuizStack.Navigator>
    );
}
