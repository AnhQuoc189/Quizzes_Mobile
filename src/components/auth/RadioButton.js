//Librari
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RadioButton({ navigation, ...props }) {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.viewRadio}>
                {props.isSelect ? (
                    <Ionicons
                        name="radio-button-on"
                        size={26}
                        color="#865DFF"
                    />
                ) : (
                    <Ionicons
                        name="radio-button-off"
                        size={26}
                        color="#865DFF"
                    />
                )}
                <Text>{props.lable}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    viewRadio: { flexDirection: 'row', alignItems: 'center' },
});
