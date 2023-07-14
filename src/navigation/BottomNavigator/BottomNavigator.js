//library
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { Path } from 'react-native-svg';
import { StyleSheet } from 'react-native';

//redux
import { useSelector } from 'react-redux';

//icons
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

//Stack
import HomeNavigator from './HomeNavigator/HomeNavigator';
import Discover from 'src/screens/app/Discover/Discover';
import CreatorNavigator from './CreatorNavigator';
import JoinGameNavigator from './JoinGameNavigator';
import LeaderBoardNavigator from './LeaderBoardNavigator';
import CommunityNavigator from './CommunityNavigator';
import ProfileNavigator from './HomeNavigator/ProfileNavigator';
import QuizNavigator from './HomeNavigator/QuizNavigator';
import JoinGame from 'src/screens/app/PlayQuiz/JoinGame';
import { DetailQuiz } from 'src/screens/app/DetailQuiz';
import HostScreen from 'src/screens/app/PlayQuiz/HostScreen';
import PlayerScreen from 'src/screens/app/PlayQuiz/PlayerScreen';
import PlayerSolo from 'src/screens/app/PlayQuiz/PlayerSolo';
import AddQuestion from 'src/screens/app/Creator/AddQuestion';
import Creator from 'src/screens/app/Creator/Creator';

const Tab = createBottomTabNavigator();

export default function BottomNavigator({ navigation }) {
    const userInfo = useSelector((state) => state.auths?.user);
    return (
        <Tab.Navigator
            initialRouteName="HomeNavigator"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused }) => {
                    switch (route.name) {
                        case 'HomeNavigator':
                            return (
                                <View>
                                    <Entypo
                                        name="home"
                                        size={focused ? 28 : 24}
                                        color={focused ? '#865DFF' : 'gray'}
                                    />
                                    <Path
                                        fill="#604AE6"
                                        d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
                                    />
                                </View>
                            );

                        case 'Discover':
                            return (
                                <View>
                                    <Entypo
                                        name="magnifying-glass"
                                        size={focused ? 28 : 24}
                                        color={focused ? '#865DFF' : 'gray'}
                                    />
                                </View>
                            );

                        case 'Creator':
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('Creator', {
                                            quiz: '',
                                            creator: true,
                                            fresh: true,
                                        });
                                    }}
                                >
                                    <View style={styles.viewCreator}>
                                        <Ionicons
                                            name="add"
                                            size={focused ? 28 : 24}
                                            color="white"
                                        />
                                    </View>
                                </TouchableOpacity>
                            );
                        case 'JoinGameNavigator':
                            return (
                                <View style={styles.viewCreator}>
                                    <FontAwesome
                                        name="th-large"
                                        size={focused ? 28 : 24}
                                        color="white"
                                    />
                                </View>
                            );

                        case 'LeaderBoardNavigator':
                            return (
                                <View>
                                    <MaterialIcons
                                        name="leaderboard"
                                        size={focused ? 28 : 24}
                                        color={focused ? '#865DFF' : 'gray'}
                                    />
                                </View>
                            );

                        case 'CommunityNavigator':
                            return (
                                <View>
                                    <Ionicons
                                        name="library-outline"
                                        size={focused ? 28 : 24}
                                        color={focused ? '#865DFF' : 'gray'}
                                    />
                                </View>
                            );

                        default:
                            break;
                    }
                },
                tabBarStyle: {
                    position: 'absolute',
                    height: '10%',
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                },
            })}
        >
            <Tab.Screen name="HomeNavigator" component={HomeNavigator} />
            <Tab.Screen name="Discover" component={Discover} />
            {userInfo?.userType === 'Teacher' ? (
                <Tab.Screen
                    name="Creator"
                    component={Creator}
                    options={{ tabBarStyle: { display: 'none' } }}
                />
            ) : (
                <Tab.Screen
                    name="JoinGameNavigator"
                    component={JoinGameNavigator}
                    options={{ tabBarStyle: { display: 'none' } }}
                />
            )}
            <Tab.Screen
                name="LeaderBoardNavigator"
                component={LeaderBoardNavigator}
                options={{ tabBarStyle: { display: 'none' } }}
            />
            <Tab.Screen
                name="CommunityNavigator"
                component={CommunityNavigator}
                options={{ tabBarStyle: { display: 'none' } }}
            />
            <Tab.Screen
                name="ProfileNavigator"
                component={ProfileNavigator}
                options={{
                    tabBarStyle: { display: 'none' },
                    tabBarButton: () => null,
                }}
            />
            <Tab.Screen
                name="AddQuestion"
                component={AddQuestion}
                options={() => ({
                    tabBarStyle: {
                        display: 'none',
                    },
                    tabBarButton: () => null,
                })}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    viewCreator: {
        width: 60,
        height: 60,
        backgroundColor: '#865DFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginBottom: 70,
        shadowRadius: 20,
        shadowColor: 'red',
    },
});
