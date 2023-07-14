import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, Text, View } from 'react-native';
import {
    CatogoriesFilter,
    FriendsFilter,
    QuizFilter,
    UsersFilter,
} from 'src/components/discover';

const Tab = createMaterialTopTabNavigator();

const FilterSearchNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName="Users"
            style={{
                display: 'flex',
                paddingTop: 20,
                height: 1000,
            }}
            screenOptions={{
                swipeEnabled: false,
                tabBarStyle: {
                    borderTopRightRadius: 30,
                    borderTopLeftRadius: 30,
                    paddingTop: 20,
                    shadowColor: 'transparent',
                },
                tabBarIndicator: () => <View></View>,
            }}
        >
            <Tab.Screen
                name="Users"
                component={UsersFilter}
                options={{
                    title: ({ color, focused }) => (
                        <View style={styles.container}>
                            <Text
                                style={{
                                    ...styles.text,
                                    color: focused ? 'blue' : 'gray',
                                }}
                            >
                                Users
                            </Text>
                            <Text
                                style={{
                                    ...styles.dot,

                                    color: focused ? 'blue' : 'black',
                                    display: focused ? 'flex' : 'none',
                                }}
                            >
                                .
                            </Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Quizzes"
                component={QuizFilter}
                options={{
                    title: ({ color, focused }) => (
                        <View style={styles.container}>
                            <Text
                                style={{
                                    ...styles.text,
                                    color: focused ? 'blue' : 'gray',
                                }}
                            >
                                Quizzes
                            </Text>
                            <Text
                                style={{
                                    ...styles.dot,
                                    color: focused ? 'blue' : 'black',
                                    display: focused ? 'flex' : 'none',
                                }}
                            >
                                .
                            </Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Categories"
                component={CatogoriesFilter}
                options={{
                    title: ({ color, focused }) => (
                        <View style={styles.container}>
                            <Text
                                style={{
                                    ...styles.text,
                                    color: focused ? 'blue' : 'gray',
                                }}
                            >
                                Categories
                            </Text>
                            <Text
                                style={{
                                    ...styles.dot,
                                    color: focused ? 'blue' : 'black',
                                    display: focused ? 'flex' : 'none',
                                }}
                            >
                                .
                            </Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Friends"
                component={FriendsFilter}
                options={{
                    title: ({ color, focused }) => (
                        <View style={styles.container}>
                            <Text
                                style={{
                                    ...styles.text,
                                    color: focused ? 'blue' : 'gray',
                                }}
                            >
                                Follows
                            </Text>
                            <Text
                                style={{
                                    ...styles.dot,
                                    color: focused ? 'blue' : 'black',
                                    display: focused ? 'flex' : 'none',
                                }}
                            >
                                .
                            </Text>
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 90,
    },
    text: {
        fontSize: 12,
        justifyContent: 'center',
        position: 'absolute',
        fontWeight: '800',
        bottom: 5,
    },
    dot: {
        fontSize: 20,
        fontWeight: '900',
        justifyContent: 'center',
        position: 'absolute',
        top: -8,
    },
});

export default FilterSearchNavigation;
