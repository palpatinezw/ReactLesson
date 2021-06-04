import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Constants from 'expo-constants';

export default function NewNoteScreen({navigation}) {
    const [text, setText] = useState('Type your note here.')
    const [title, setTitle] = useState('Title of your note')

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Add a note!
            </Text>
            <TextInput style={styles.TitleInput} value={title} onChangeText={(newText) => setTitle(newText)}/>
            <TextInput style={styles.TextInput} value={text} onChangeText={(newText) => setText(newText)}/>
            <View style={styles.buttonrow}>
                <Button title="submit" onPress={() => navigation.navigate("Home", {title, text})} />
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
    TextInput: {
        borderWidth: 2,
        borderRadius: 10,
        height: 500,
        padding: 10,
        flex: 5,
    },
    TitleInput: {
        borderWidth: 2,
        borderRadius: 10,
        height: 50,
        padding: 10,
        fontWeight: 'bold',
        marginBottom: 10,
        flex: 1,
    }
})