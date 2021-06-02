import * as React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

export default function ProfileBox(props){
    return(
        <View style={styles.bigbox}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.subtitle}>{props.subtitle}</Text>
            <Image
                style={styles.profilePic}
                source={{
                uri:
                    props.uri,
                }}
            />
            <Text style={styles.title}>
                {props.count}
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
      height: 300,
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
    profilePic: {
        height: 60,
        width: 60,
        borderRadius: 30,
        alignSelf: 'center',
        marginTop: 10,
        borderColor: 'white',
        borderWidth: 2,
    },
});