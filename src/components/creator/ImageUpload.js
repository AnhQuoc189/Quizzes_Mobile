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

function ImageUpload({ creator, picture, setFile }) {
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
            aspect: [5, 4],
            quality: 1,
            base64: true,
        });
        if (pickerResult.canceled === true) {
            return;
        } else {
            let newFile = {
                uri: pickerResult.assets[0].uri,
                type: `test/${pickerResult.assets[0].uri.split('.')[1]}`,
                name: `test/${pickerResult.assets[0].uri.split('.')[1]}`,
            };
            uploadImage(newFile);
            setImage(`data:image/jpeg;base64,${pickerResult.assets[0].base64}`);
        }
    };

    const uploadImage = (newFile) => {
        const formData = new FormData();
        formData.append('file', newFile);
        formData.append('upload_preset', 'imagequizapp');
        formData.append('cloud_name', 'dfl3qnj7z');
        fetch(`https://api.cloudinary.com/v1_1/dfl3qnj7z/image/upload`, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setFile(data?.secure_url);
            })
            .catch((error) => console.error(error));
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
