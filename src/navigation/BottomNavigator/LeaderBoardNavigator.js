//Library
import { createStackNavigator } from '@react-navigation/stack';

//Screen
import LeaderBoard from 'src/screens/app/LeaderBoard/LeaderBoard';
import Profile from 'src/screens/app/Profile/Profile';
import HistoryUser from 'src/screens/app/Profile/HistoryUser';

const LeaderBoardStack = createStackNavigator();

export default function LeaderBoardNavigator() {
    return (
        <LeaderBoardStack.Navigator
            initialRouteName="LeaderBoard"
            screenOptions={{ headerShown: false }}
        >
            <LeaderBoardStack.Screen
                name="LeaderBoard"
                component={LeaderBoard}
            />
            <LeaderBoardStack.Screen name="Profile" component={Profile} />
            <LeaderBoardStack.Screen
                name="HistoryUser"
                component={HistoryUser}
            />
        </LeaderBoardStack.Navigator>
    );
}
