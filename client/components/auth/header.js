import React from 'react'
import { View,TouchableOpacity,Text,StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

export default function Header({navigation,...props}) {

  return (
    <View style={styles.header}>
    
            <View >
                <Text style={styles.headerTitle}>{props.title}</Text>
            </View>
            <View style={{bottom:36,right:144}}>
                <TouchableOpacity
                        onPress={() => navigation.navigate(props.direct)}
                    >
                    <AntDesign
                        name="arrowleft"
                        size={30}
                        color="black"
                    />
                </TouchableOpacity>
            </View>
      
     </View>
     
  )
}

const styles=StyleSheet.create({
    header: {
        width:'100%',
        height:60,
        display:'flex',
        marginTop: 30,
        alignItems:'center', 
        display:'flex',
        top:24
    },
    headerTitle: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 700,
        alignItems:'center'
    },
})
