//Library
import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

//icons
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function AnswerInput({
    name,
    body,
    isCorrect,
    onChangeText,
    onClick,
}) {
    const [not, setNot] = useState(false);
    return (
        <View
            style={{
                ...styles.viewInput,
                backgroundColor: isCorrect ? '#16FF00' : '#fff',
            }}
        >
            <Text style={{ fontSize: 20 }}>{name}.</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your question"
                value={body}
                onChangeText={(value) => onChangeText(value)}
            />
            <TouchableOpacity onPress={onClick}>
                {!isCorrect ? (
                    <Entypo name="circle" size={34} color="black" />
                ) : (
                    <AntDesign name="checkcircleo" size={34} color="black" />
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    viewInput: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        width: '100%',
    },
    input: {
        width: '70%',
        fontSize: 20,
    },
});
