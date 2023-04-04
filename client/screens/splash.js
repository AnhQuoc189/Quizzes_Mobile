import {
    StyleSheet,
    Text,
    Image,
    ImageBackground,
    SafeAreaView,
} from 'react-native';
import background from '../assets/images/background.png';
import logo from '../assets/images/logo.png';

export default function Splash({ navigation }) {
    
    setTimeout(() => {
        navigation.navigate('Onboard');
    }, 5000);

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
