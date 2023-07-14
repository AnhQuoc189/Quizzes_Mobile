//Library
import { createStackNavigator } from '@react-navigation/stack';

//Screen
import Community from 'src/screens/app/Community/Community';
import CommunityDetais from 'src/screens/app/Community/CommunityDetais';
import { DetailQuiz } from 'src/screens/app/DetailQuiz';
import PlayerSolo from 'src/screens/app/PlayQuiz/PlayerSolo';
import ShareQuiz from 'src/screens/app/Community/ShareQuiz';
import ChatRoom from 'src/screens/app/Community/ChatRoom';

const CommunityStack = createStackNavigator();

export default function CommunityNavigator() {
    return (
        <CommunityStack.Navigator
            initialRouteName="Community"
            screenOptions={{ headerShown: false }}
        >
            <CommunityStack.Screen name="Community" component={Community} />
            <CommunityStack.Screen
                name="CommunityDetais"
                component={CommunityDetais}
            />
            <CommunityStack.Screen name="DetailQuiz" component={DetailQuiz} />
            <CommunityStack.Screen name="PlayerSolo" component={PlayerSolo} />
            <CommunityStack.Screen name="ShareQuiz" component={ShareQuiz} />
            <CommunityStack.Screen name="ChatRoom" component={ChatRoom} />
        </CommunityStack.Navigator>
    );
}
