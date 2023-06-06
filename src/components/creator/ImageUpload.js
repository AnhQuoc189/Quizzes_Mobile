import {
    Button,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, bgColors } from 'src/styles/color';

import * as ImagePicker from 'expo-image-picker';

import { useState } from 'react';
import { useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

function ImageUpload({ creator, onChange, picture }) {
    const [image, setImage] = useState();

    useFocusEffect(
        useCallback(() => {
            setImage(picture);
        }, [picture]),
    );

    const chooseImage = async () => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            allowsMultipleSelection: false,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });
        if (pickerResult.canceled === true) {
            console.log('Canceled!');
            return;
        }
        // console.log(pickerResult.assets[0]);
        setImage(`data:image/jpeg;base64,${pickerResult.assets[0].base64}`);
        onChange(`data:image/jpeg;base64,${pickerResult.assets[0].base64}`);
        // setFile(pickerResult.assets[0].base64);
    };

    return !image ? (
        <TouchableOpacity
            style={{ ...styles.coverImage, height: creator ? '26%' : '16%' }}
            // style={styles.coverImage}
            onPress={chooseImage}
        >
            <Ionicons
                name="image-outline"
                size={50}
                style={{
                    color: colors.lightPurple,
                }}
            />
            <Text
                style={{
                    color: colors.lightPurple,
                    fontSize: 20,
                    marginTop: 5,
                    fontWeight: 600,
                }}
            >
                Add Cover Image
            </Text>
        </TouchableOpacity>
    ) : (
        <TouchableOpacity
            style={{ ...styles.coverImage, height: creator ? '26%' : '16%' }}
            onPress={chooseImage}
        >
            <Image
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 20,
                    resizeMode: 'cover',
                }}
                // resizeMode="cover"
                source={{
                    uri: `${
                        image
                            ? image
                            : 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
                    }`,
                }}
            />
        </TouchableOpacity>
    );
}

export default ImageUpload;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EFEEFC',
        paddingVertical: 70,
        borderRadius: 25,
        // backgroundColor: 'red',
        width: '20%',
    },

    viewImage: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bgColors.lightPurple,
        paddingVertical: 100,
        borderRadius: 25,
        resizeMode: 'contain',
    },
    coverImage: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bgColors.lightPurple,
        // paddingVertical: 70,
        borderRadius: 25,
    },
});
