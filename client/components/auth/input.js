import React, { useState } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet,View,Text,TextInput,TouchableOpacity } from "react-native";
export default function FormTextInput(props){
    const [showPass,setShowPass]=useState(true)
   
    return(
        <View style={styles.formItem}>
            <Text>{props.lable}</Text>
            <View style={styles.viewItem}>
                <View style={styles.viewTextInput}>
                    <MaterialCommunityIcons
                        name="email-outline"
                        size={24}
                        color="#865DFF"
                    />
                    <TextInput
                        style={{ width: (props.eye?'70%':'80%') }}
                        placeholder="Your email address"
                        secureTextEntry={!showPass?true:false}
                />
                {
                    props.eye && <TouchableOpacity
                    onPress={() => setShowPass(!showPass)}
                >
                    <MaterialCommunityIcons
                        name={
                            !showPass
                                ? 'eye-off-outline'
                                : 'eye-outline'
                        }
                        size={24}
                        color="#865DFF"
                    />
                </TouchableOpacity>
                }
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    formItem: {
        flexDirection: 'column',
        gap: 10,
    },
    viewItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewTextInput: {
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
})