import { createStackNavigator } from '@react-navigation/stack';

import Creator from 'src/screens/app/Creator/Creator';
import AddQuestion from 'src/screens/app/Creator/AddQuestion';
import ChooseCategory from 'src/screens/app/Creator/ChooseCategory';

const CreatorStack = createStackNavigator();

const CreatorNavigator = (parentProps) => {
    // console.log(parentProps.route.params);

    const quizData = parentProps.route.params.quizData;
    // console.log(quizData);
    const creator = parentProps.route.params.creator;

    return (
        <CreatorStack.Navigator
            initialRouteName="Creator"
            screenOptions={() => ({ headerShown: false })}
        >
            <CreatorStack.Screen name="Creator">
                {(props) => (
                    <Creator
                        navigation={props.navigation}
                        quiz={!creator ? quizData : ''}
                        // creator={parentProps.route.params.creator}
                    />
                )}
            </CreatorStack.Screen>
            {/* <CreatorStack.Screen name="Creator" component={Creator} /> */}

            <CreatorStack.Screen name="AddQuestion" component={AddQuestion} />
        </CreatorStack.Navigator>
    );
};
export default CreatorNavigator;
