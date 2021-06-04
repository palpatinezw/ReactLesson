import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function NoteScreen({route, navigation}) {
    let id = route.params.id
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {route.params.title}
            </Text>
            <Text style={styles.paragraph}>
                {route.params.details}
            </Text>
            <View style={styles.buttonrow}>
                <Button title="DONE" onPress={() => navigation.navigate("Home", {done:true, id})} />
                <Button title="DELETE" onPress={() => navigation.navigate("Home", {del:true, id})} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    paragraph: {
        fontSize: 14,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    buttonrow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent:'center',
        padding: 20,
    },
})