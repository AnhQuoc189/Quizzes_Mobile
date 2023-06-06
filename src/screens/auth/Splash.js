import { useEffect } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    ImageBackground,
    SafeAreaView,
} from 'react-native';
import background from 'src/assets/images/background.png';
import logo from 'src/assets/images/logo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { loGin, upDated } from 'src/slices/authSlice';

export default function Splash({ navigation }) {
    const dispatch = useDispatch();

    useEffect(() => {
        getUser = async () => {
            const store = await AsyncStorage.getItem('profile');
            const storeInfo = await AsyncStorage.getItem('info');
            if (store) {
                const data = JSON.parse(store);
                dispatch(loGin(data));

                const dataInfo = JSON.parse(storeInfo);
                dispatch(upDated(dataInfo));

                setTimeout(() => {
                    navigation.navigate('AppNavigator');
                }, 5000);
            } else {
                setTimeout(() => {
                    navigation.navigate('AuthNavigator');
                }, 5000);
            }
        };
        getUser();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={background} style={styles.backgroundImage}>
                <Image source={logo} />
                <Text style={styles.textName}>Quizes</Text>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    textName: {
        fontSize: 40,
        fontWeight: 800,
        color: 'white',
    },
});
