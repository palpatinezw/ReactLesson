import React from "react"
import {View} from "react-native"

export default function ColorBlock(props) {
  return (
    <View style={{
      width:"100%", 
      height: props.height,
      backgroundColor: `rgb(${props.red}, ${props.green}, ${props.blue})`, 
      borderRadius: 15,
    }}>
      {props.children}
    </View>
  );
}