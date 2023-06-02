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

import * as ImagePicker from 'expo-image-picker';

import { useState } from 'react';

function ImageUpload({ style, onChange, width = 360, height = 270 }) {
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

    return (
        <TouchableOpacity
            style={[
                style || styles.container,
                //height width to customize size of image
                width && height && { width: width, height: height },
            ]}
            onPress={chooseImage}
        >
            {!image ? (
                <>
                    <Ionicons
                        name="image-outline"
                        size={50}
                        style={{
                            color: '#8F87E5',
                        }}
                    />
                    <Text
                        style={{
                            color: '#8F87E5',
                            fontSize: 20,
                            marginTop: 5,
                            fontWeight: 600,
                        }}
                    >
                        Add Cover Image
                    </Text>
                </>
            ) : (
                <Image
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 20,
                    }}
                    resizeMode="cover"
                    source={{
                        uri: `${
                            image
                                ? image
                                : 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
                        }`,
                    }}
                />
            )}
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
        // paddingVertical: 70,
        borderRadius: 25,
    },
});
