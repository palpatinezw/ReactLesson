import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React , { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function Home({navigation}) {
    let [title, onChangeTitle] = useState('')
    let [text, onChangeText] = useState('')

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeTitle}
                value={title}
                placeholder="Insert Title"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Insert Text"
            />
            <Button title="Add" onPress={() => navigation.navigate("main", {title, text})}/>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  input: {
    height: 40,
    width: "90%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
