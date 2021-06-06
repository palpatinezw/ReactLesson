import * as React from 'react';
import { View } from 'react-native';

export default function InnerBox(props){
    return(
        <View style={{
            width: 50,
            height: 50,
            borderRadius: 20,
            backgroundColor: props.color ? props.color : "cyan",
            marginLeft: 10,
            marginRight: 10,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {props.children}
        </View>
    )
}