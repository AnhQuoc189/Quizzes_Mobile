// Library
import { SafeAreaView, View, StyleSheet, TextInput } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { FilterSearchNavigation } from 'src/navigation/DiscoverNavigator';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllQuizes } from 'src/slices/quizSlice';
import { searchQuery } from 'src/slices/searchSlice';

//component
import Header from 'src/components/auth/Header';
import { API } from 'src/constants/api';

//styles
import { colors } from 'src/styles/color';
import { DisplayDiscover } from 'src/components/discover';
import { fetchAllUsers } from 'src/slices/usersSlice';
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function Discover({ navigation }) {
    const dispatch = useDispatch();
    const [isFocus, setIsFocus] = useState(false);

    const userData = useSelector((state) => state.auths?.authData);
    const accessToken = userData?.data?.accessToken;

    useFocusEffect(
        useCallback(() => {
            if (!isFocus) {
                const handleGetApiUser = () => {
                    fetch(`${API}api/users`, {
                        method: 'GET',
                        headers: new Headers({
                            Authorization: `Bearer ${accessToken}`,
                            'user-agent': 'Mozilla/4.0 MDN Example',
                            'content-type': 'application/json',
                        }),
                    })
                        .then((data) => data.json())
                        .then((json) => {
                            dispatch(fetchAllUsers(json));
                        })
                        .catch((error) => console(error));
                };
                handleGetApiUser();

                const handleGetApiQuizes = () => {
                    fetch(`${API}api/quizzes/public`, {
                        method: 'GET',
                        headers: new Headers({
                            Authorization: `Bearer ${accessToken}`,
                            'user-agent': 'Mozilla/4.0 MDN Example',
                            'content-type': 'application/json',
                        }),
                    })
                        .then((data) => data.json())
                        .then((json) => {
                            dispatch(fetchAllQuizes(json));
                        })
                        .catch((error) => console(error));
                };
                handleGetApiQuizes();
            }
        }, [isFocus]),
    );

    const handleSearcrBar = (value) => {
        dispatch(searchQuery(value));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.fisrtSection}>
                <Header
                    title="Discover"
                    direct={isFocus ? 'Discover' : 'Home'}
                    color="white"
                    navigation={navigation}
                    setFocus={() => setIsFocus(false)}
                />
                <View style={styles.searchBar}>
                    <SimpleLineIcons name="magnifier" size={24} color="white" />
                    <TextInput
                        onFocus={() => {
                            setIsFocus(true);
                        }}
                        placeholderTextColor="gray"
                        textColor="gray"
                        onChangeText={(value) => handleSearcrBar(value)}
                        placeholder="Quiz, categories, friends"
                        style={styles.textInput}
                    />
                </View>
            </View>

            {isFocus ? <FilterSearchNavigation /> : <DisplayDiscover />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    fisrtSection: {
        paddingHorizontal: 20,
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
    },
    textHeader: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        alignItems: 'center',
    },
    searchBar: {
        width: '100%',
        marginTop: 20,
        height: 50,
        backgroundColor: '#5B4EC3',
        borderRadius: 15,
        paddingHorizontal: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textInput: {
        width: '90%',
        height: '100%',
        backgroundColor: 'transparent',
    },
    boxTopPick: {
        width: '100%',
        height: 180,
        marginTop: 30,
        paddingVertical: 20,
        paddingHorizontal: 30,
        backgroundColor: '#FFE0E6',
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'space-between',
    },
    box: {
        height: 35,
        backgroundColor: colors.pink,
        borderRadius: 10,
        alignItems: 'center',
        padding: 10,
        justifyContent: 'center',
        alignSelf: 'baseline',
    },
    textName: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: 17,
        color: '#660012',
        fontWeight: '900',
    },
    textSub: {
        fontSize: 12,
        color: '#660012',
        fontWeight: '500',
        alignItems: 'center',
        marginLeft: 6,
    },
    mainContent: {
        display: 'flex',
        width: '100%',
        backgroundColor: 'white',
        flex: 1,
        marginTop: 30,
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderRadius: 35,
        paddingBottom: 100,
    },
    textTitle: {
        fontSize: 20,
        color: 'black',
    },
    categoryContain: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 20,
        gap: 20,
    },
});
