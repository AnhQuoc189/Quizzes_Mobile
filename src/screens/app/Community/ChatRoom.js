//Library
import React, { useState } from 'react';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import {
    View,
    FlatList,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { addMessageChat } from 'src/slices/communitySlice';

//component
import Header from 'src/components/auth/Header';

//RTKQuery
import { useGetCommunityQuery } from 'src/services/communityApi';
import { useAddMessageBoxMutation } from 'src/services/communityApi';

export default function ChatRoom({ navigation, ...props }) {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auths?.authData);
    const userInfo = useSelector((state) => state.auths?.user);

    const accessToken = userData?.data?.accessToken;

    const [messages, setMessages] = useState([]);
    const [infoText, setInfoText] = useState({ user: userInfo, message: '' });

    const { name, quiz, quizList, title } = props.route.params;
    const socket = useSelector((state) => state.sockets.socket);

    const { data } = useGetCommunityQuery({ accessToken, id: quiz._id });
    const [addMessage] = useAddMessageBoxMutation();

    const community = useSelector((state) => state.communities.community);

    const handleAddMessage = () => {
        addMessage({
            accessToken,
            id: quiz._id,
            message: infoText,
        });
    };

    useEffect(() => {
        if (data) {
            setMessages(data.chatBox);
        }
    }, [data]);

    useEffect(() => {
        setMessages(community.chatBox);
    }, [community]);

    const sendMessage = () => {
        if (infoText.message.trim() !== '') {
            dispatch(addMessageChat(infoText));
            socket.emit('send-message', infoText, quiz._id, () => {
                handleAddMessage();
            });
            setMessages((prevMessages) => [...prevMessages, infoText]);
            setInfoText({ ...infoText, message: '' });
        }
    };

    useEffect(() => {
        socket.on('receive-message', (infoText) => {
            dispatch(addMessageChat(infoText));
            setMessages((prevMessages) => [...prevMessages, infoText]);
            //
        });
        return () => {
            socket.off('receive-message');
        };
    }, [socket]);

    const handleOutChat = () => {
        socket.emit('outChat', quiz._id);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ marginBottom: 20 }}>
                <Header
                    title={name}
                    direct="CommunityDetais"
                    navigation={navigation}
                    // commuDetails={true}
                    quizData={quiz}
                    quizList={quizList}
                    titlee={title}
                    chatBox={true}
                    handleOutChat={handleOutChat}
                />
            </View>

            <FlatList
                data={messages}
                renderItem={({ item }) => (
                    <RenderItem item={item} userInfo={userInfo} />
                )}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Type a message..."
                    value={infoText.message}
                    onChangeText={(text) =>
                        setInfoText({
                            ...infoText,
                            message: text,
                            date: new Date().toLocaleString('en-US', {
                                weekday: 'long',
                                timeZone: 'Asia/Ho_Chi_Minh',
                            }),
                        })
                    }
                />
                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={sendMessage}
                >
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const RenderItem = ({ item, userInfo }) => {
    const [showInfo, setShowInfo] = useState(false);
    return (
        <TouchableOpacity
            style={{
                alignItems: 'baseline',

                alignItems:
                    item?.user?.userName === userInfo?.userName
                        ? 'flex-end'
                        : 'flex-start',
            }}
            onPress={() => setShowInfo(!showInfo)}
            activeOpacity={1}
        >
            {showInfo && (
                <>
                    <Text style={{ fontWeight: 600 }}>
                        {item?.user?.userName}
                    </Text>
                    <Text style={{ fontWeight: 600 }}>{item?.date}</Text>
                </>
            )}
            <LinearGradient
                style={styles.messageContainer}
                colors={
                    item?.user?.userName === userInfo?.userName
                        ? ['#8ec5fc', '#e0c3fc']
                        : ['#f08d24', '#eff935']
                }
            >
                <View style={styles.viewMessage}>
                    <Image
                        style={styles.viewImage}
                        source={{ uri: item?.user?.avatar }}
                    />
                    <Text style={styles.messageText}>{item?.message}</Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'flex-end',
        width: '100%',
    },
    messageContainer: {
        flex: 1,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginBottom: 8,
        maxWidth: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    messageText: {
        maxWidth: 200,
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        marginRight: 8,
        paddingHorizontal: 8,
    },
    sendButton: {
        backgroundColor: '#2196f3',
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    sendButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    viewMessage: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    viewImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
});
