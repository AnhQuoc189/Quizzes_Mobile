//Library
import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    Image,
    ActivityIndicator,
    Modal,
    Pressable,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

//redux
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchAllCommunities,
    fetchAllCommunity,
} from 'src/slices/communitySlice';

//icons
import { AntDesign } from '@expo/vector-icons';

//RTLQuery
import { API } from 'src/constants/api';
import { useGetCommunitiesQuery } from 'src/services/communityApi';

//component
import Header from 'src/components/auth/Header';
import ModalAdd from './ModalAdd';
import HeaderBack from 'src/components/auth/HeaderBack';

export default function Community({ navigation }) {
    const dispatch = useDispatch();
    const focus = useIsFocused();
    const userData = useSelector((state) => state.auths?.authData);
    const accessToken = userData?.data?.accessToken;
    // const { data, isLoading } = useGetCommunitiesQuery(accessToken);

    const [modalAdd, setModalAdd] = useState(false);

    // useEffect(() => {
    //     if (data) {
    //         fetchAllCommunities(data);
    //     }
    // }, [data]);

    useEffect(() => {
        fetch(`${API}api/community`, {
            method: 'GET',
            headers: new Headers({
                Authorization: `Bearer ${accessToken}`,
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json',
            }),
        })
            .then((data) => data.json())
            .then((json) => {
                dispatch(fetchAllCommunities(json));
            })
            .catch((error) => console(error));
    }, [focus]);

    const communities = useSelector((state) => state.communities.communities);

    const handleCommunitiDetails = (item) => {
        dispatch(fetchAllCommunity(item));
        navigation.navigate('CommunityDetais', {
            quiz: item,
            id: item._id,
            quizList: item.quizList,
            title: item.tags,
        });
    };

    const addCommunity = () => {
        setModalAdd(true);
    };

    // console.log(communities[0].backgroundImage);

    return (
        <View style={styles.viewSafeArea}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalAdd}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalAdd(!modalAdd);
                }}
            >
                <Pressable
                    onPress={() => setModalAdd(!modalAdd)}
                    style={styles.viewPress}
                >
                    <ModalAdd setModalAdd={setModalAdd} />
                </Pressable>
            </Modal>
            {/* <Header
                title="Comunities"
                direct="Home"
                navigation={navigation}
                community={true}
                addCommunity={addCommunity}
            /> */}
            <View style={styles.viewHeader}>
                <HeaderBack
                    title="Comunities"
                    handleBack={() => navigation.goBack()}
                    option={
                        <TouchableOpacity onPress={addCommunity}>
                            <AntDesign
                                name="plussquareo"
                                size={25}
                                color="#333"
                            />
                        </TouchableOpacity>
                    }
                />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.categoryContain}>
                    {communities ? (
                        communities.map((item, index) => (
                            <TouchableOpacity
                                style={styles.viewItem}
                                key={index}
                                onPress={() => handleCommunitiDetails(item)}
                            >
                                <View style={styles.viewItemImage}>
                                    <Image
                                        style={styles.image}
                                        resizeMode="cover"
                                        source={{
                                            uri: item?.backgroundImage
                                                ? item?.backgroundImage
                                                : 'https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-cute.jpg?ssl\u003d1',
                                        }}
                                    />
                                </View>
                                <Text style={styles.nameCommunity}>
                                    {item?.name}
                                </Text>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <ActivityIndicator size={'large'} color="#333" />
                    )}
                </View>
                {/* {isLoading && <ActivityIndicator size="large" color="#fff" />} */}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    viewSafeArea: {
        width: '100%',
        height: '100%',
        backgroundColor: '#E3DFFD',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
    viewHeader: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryContain: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 20,
        gap: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100,
        height: '90%',
        width: '100%',
        padding: 10,
    },

    viewItem: {
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '40%',
        height: '20%',
        gap: 20,
    },
    viewItemImage: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 140,
        height: 140,
        borderRadius: 70,
        borderWidth: 2,
        borderColor: '#9BA4B5',
    },
    image: {
        height: 130,
        width: 130,
        borderRadius: 65,
    },
    nameCommunity: {
        textAlign: 'center',
        width: '100%',
        height: '30%',
    },

    viewPress: {
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(105,105,105, 0.6)',
    },
});
