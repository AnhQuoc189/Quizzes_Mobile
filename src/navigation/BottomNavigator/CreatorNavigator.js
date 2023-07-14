//Library
import { createStackNavigator } from '@react-navigation/stack';
//Screen
import Creator from 'src/screens/app/Creator/Creator';
import AddQuestion from 'src/screens/app/Creator/AddQuestion';

const CreatorStack = createStackNavigator();

export default function CreatorNavigator() {
    return (
        <CreatorStack.Navigator
            initialRouteName="Creator"
            screenOptions={{ headerShown: false }}
        >
            <CreatorStack.Screen name="Creator" component={Creator} />
            <CreatorStack.Screen name="AddQuestion" component={AddQuestion} />
        </CreatorStack.Navigator>
    );
}
