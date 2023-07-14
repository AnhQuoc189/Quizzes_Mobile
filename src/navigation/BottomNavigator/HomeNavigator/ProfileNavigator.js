//Library
import { createStackNavigator } from '@react-navigation/stack';

//Screen
import Profile from 'src/screens/app/Profile/Profile';
import Settings from 'src/screens/app/Profile/Settings';
import EditProfile from 'src/screens/app/Profile/EditProfile';
import ChangeEmail from 'src/screens/app/Profile/ChangeEmail';
import ChangePass from 'src/screens/app/Profile/ChangePassWord';

const ProfileStack = createStackNavigator();

export default function ProfileNavigator() {
    return (
        <ProfileStack.Navigator
            initialRouteName="Profile"
            screenOptions={{ headerShown: false }}
        >
            <ProfileStack.Screen name="Profile" component={Profile} />
            <ProfileStack.Screen name="Settings" component={Settings} />
            <ProfileStack.Screen name="EditProfile" component={EditProfile} />
            <ProfileStack.Screen name="ChangeEmail" component={ChangeEmail} />
            <ProfileStack.Screen name="ChangePass" component={ChangePass} />
        </ProfileStack.Navigator>
    );
}
