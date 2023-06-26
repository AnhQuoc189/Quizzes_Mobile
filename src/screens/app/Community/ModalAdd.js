import React, { useEffect } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    TextInput,
    ActivityIndicator,
    Platform,
    ToastAndroid,
    AlertIOS,
} from 'react-native';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { createCommunity } from 'src/slices/communitySlice';

//color
import { colors } from 'src/styles/color';

//component
import ImageUpload from './ImageUpload';
import { useState } from 'react';

//RTKQuery
import { useCreateCommunityMutation } from 'src/services/communityApi';

export default function ModalAdd({ setModalAdd }) {
    const dispatch = useDispatch();
    const [file, setFile] = useState();

    const [InitCommunity, { data, isLoading }] = useCreateCommunityMutation();

    useEffect(() => {
        if (data) {
            dispatch(createCommunity(data));
            setModalAdd(false);
        }
    }, [data]);

    const userData = useSelector((state) => state.auths?.authData);
    const accessToken = userData?.data?.accessToken;

    const userInfo = useSelector((state) => state.auths?.user);

    const [form, setForm] = useState({
        name: '',
        tags: '',
        creatorId: userInfo?._id,
        creatorName: userInfo?.userName,
    });

    const uploadImage = async (newFile) => {
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
                InitCommunity({
                    accessToken,
                    formData: {
                        ...form,
                        backgroundImage: data?.secure_url,
                    },
                });

                if (Platform.OS === 'android') {
                    ToastAndroid.show(
                        'Create successfully!',
                        ToastAndroid.SHORT,
                    );
                } else {
                    AlertIOS.alert('Create successfully!');
                }
            })
            .catch((error) => console.error(error));
    };

    const handleChange = (value, key) => {
        setForm({ ...form, [key]: value });
    };

    const handleAdd = async () => {
        await uploadImage(file);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>Add</Text>
            <View style={styles.main}>
                <ImageUpload setFile={setFile} />

                <View style={styles.viewRight}>
                    <Text>Community Name</Text>
                    <TextInput
                        style={styles.viewTextInput}
                        onChangeText={(value) => handleChange(value, 'name')}
                    />
                    <Text>Field</Text>
                    <TextInput
                        style={styles.viewTextInput}
                        onChangeText={(value) => handleChange(value, 'tags')}
                    />
                </View>
            </View>
            <View style={styles.viewCreate}>
                <TouchableOpacity
                    style={styles.viewTouchCreate}
                    onPress={handleAdd}
                >
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.textCreate}>Create</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 250,
        backgroundColor: 'red',
        backgroundColor: '#fff',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 4,
        elevation: 5,
        borderColor: colors.lightPurple,
        borderWidth: 5,
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 800,
    },
    viewCreate: {
        width: '30%',
        height: '20%',
    },
    viewTouchCreate: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#00FFCA',
    },
    main: {
        flexDirection: 'row',
        width: '100%',
        height: '50%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    viewRight: {
        width: '60%',
        height: '100%',
        justifyContent: 'center',
        // alignItems: 'center',
    },

    viewTextInput: {
        backgroundColor: '#DDE6ED',
        width: '90%',
        height: '40%',
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    textCreate: {
        color: '#fff',
        fontWeight: 600,
    },
});
