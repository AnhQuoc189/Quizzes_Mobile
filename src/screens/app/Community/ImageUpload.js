import { StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

//icons
import Ionicons from 'react-native-vector-icons/Ionicons';

//color
import { colors, bgColors } from 'src/styles/color';
import images from 'src/constants/images';

export default function ImageUpload({ picture, setFile }) {
    const [image, setImage] = useState();

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
            setFile(newFile);
            // uploadImage(newFile);
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

    return image ? (
        <TouchableOpacity style={styles.viewImage}>
            <Image
                source={{ uri: image }}
                resizeMode="cover"
                style={styles.image}
            />
        </TouchableOpacity>
    ) : (
        <TouchableOpacity style={styles.viewImage} onPress={chooseImage}>
            <Ionicons
                name="image-outline"
                size={30}
                style={{
                    color: colors.lightPurple,
                }}
            />
            <Text style={styles.textImage}>Image</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    viewImage: {
        width: '30%',
        height: '70%',
        backgroundColor: bgColors.lightPurple,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    textImage: {
        color: colors.lightPurple,
        fontSize: 10,
        marginTop: 5,
        fontWeight: 600,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
});
