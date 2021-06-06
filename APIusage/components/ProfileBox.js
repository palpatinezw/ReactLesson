import * as React from 'react';
import { View, StyleSheet, Text, Image, ActivityIndicator } from 'react-native';

export default function ProfileBox(props){
    function checkArr(t) {
        if (t <= 0) return "Arrived"
        return t + " mins"
    }
    function checkVld(t1, t2) {
        if (t1 == NaN) {
            return ""
        }
        else if (t2 == NaN) {
            return t1 + " mins"
        }
        else {
            return t1 + " mins - " + t2 + " mins"
        }
    }
    return(
        <View style={styles.bigbox}>
            <Text style={styles.title}>BUS NO {props.title}</Text>
            <Text style={styles.title}>
                {props.load? checkArr(props.time) : <ActivityIndicator size="large" color="darkblue" />}
            </Text>
            <Text style={styles.subtitle}>
                {props.load? checkVld(props.time2, props.time3) : <ActivityIndicator size="large" color="darkblue" />}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    bigbox: {
      backgroundColor: 'cyan',
      borderColor: 'white',
      borderWidth: 10,
      padding: 10,
      paddingBottom: 15,
      borderRadius: 20,
      justifyContent: 'center',
      height: 150,
      width: '100%',
    },
    title: {
      color: 'black',
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    subtitle: {
      color: 'grey',
      fontSize: 16,
      textAlign: 'center',
    },
});