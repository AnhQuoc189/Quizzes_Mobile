// Library
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';

//component
import Header from 'src/components/auth/Header';

//styles
import { colors } from 'src/styles/color';
import { DisplayDiscover, FilterSearch } from 'src/components/discover';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';
export default function Discover({ navigation }) {
    const [isSearch, setIsSearch] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const [inputSearch, setInputSearch] = useState('');

    const handleSearcrBar = (value) => {
        setInputSearch(value);
        setIsSearch(true);
    };

    useEffect(() => {
        const backAction = () => {
            setIsSearch(false);
            // console.log('state', isSearch);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.fisrtSection}>
                    <Header
                        title="Discover"
                        direct={isFocus ? 'Discover' : 'Home'}
                        color="white"
                        navigation={navigation}
                        setFocus={() => setIsFocus(false)}
                    />
                    <View style={styles.searchBar}>
                        <SimpleLineIcons
                            name="magnifier"
                            size={24}
                            color="white"
                        />
                        <TextInput
                            // focusable={(value) => console.log(value)}
                            onFocus={() => {
                                setIsFocus(true);
                            }}
                            placeholderTextColor="gray"
                            textColor="gray"
                            value={inputSearch}
                            onChangeText={(value) => handleSearcrBar(value)}
                            activeUnderlineColor="transparent"
                            underlineColor="transparent"
                            placeholder="Quiz, categories, friends"
                            style={styles.textInput}
                        />
                    </View>
                </View>
                {/* Main Content */}

                {isFocus ? <FilterSearch /> : <DisplayDiscover />}
                {/* {display && <DisplayDiscover />} */}
            </ScrollView>
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
    },
    textInput: {
        width: '100%',
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
