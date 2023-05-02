import { createStackNavigator } from '@react-navigation/stack';

import Creator from 'src/screens/app/Creator/Creator';
import AddQuestion from 'src/screens/app/Creator/AddQuestion';
import ChooseCategory from 'src/screens/app/Creator/ChooseCategory';
import Overview from 'src/screens/app/Creator/Overview';

const CreatorStack = createStackNavigator();

const CreatorNavigator = () => {
    return (
        <CreatorStack.Navigator
            initialRouteName="Creator"
            screenOptions={() => ({ headerShown: false })}
        >
            <CreatorStack.Screen name="Creator" component={Creator} />
            <CreatorStack.Screen name="AddQuestion" component={AddQuestion} />
            <CreatorStack.Screen
                name="ChooseCategory"
                component={ChooseCategory}
            />
            <CreatorStack.Screen name="Overview" component={Overview} />
        </CreatorStack.Navigator>
    );
};
export default CreatorNavigator;
