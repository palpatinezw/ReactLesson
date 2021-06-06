import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Constants from 'expo-constants';

export default function EditScreen({navigation, route}) {
    const [busStop, setbusStop] = useState((route.params.busStop).toString())

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Set Bus Stop Number
            </Text>
            <TextInput style={styles.TitleInput} value={busStop} onChangeText={(newText) => setbusStop(newText)}/>
            <View style={styles.buttonrow}>
                <Button title="submit" onPress={() => navigation.navigate("Main", {busStop})} />
                <Button title="dismiss" onPress={() => navigation.goBack()} />
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
        textAlign: 'center',
    },
    container: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        justifyContent: 'center'
    },
    buttonrow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent:'center',
        padding: 20,
    },
    TitleInput: {
        borderWidth: 2,
        borderRadius: 10,
        height: 50,
        padding: 10,
        fontWeight: 'bold',
        marginBottom: 10,
    }
})