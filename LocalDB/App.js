import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import * as SQLite from "expo-sqlite";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import NoteScreen from './Screens/NoteScreen'
import NewNoteScreen from './Screens/NewNoteScreen';

const db = SQLite.openDatabase("notes.db");

function HomeScreen({navigation, route}) {
  const [notes, setNotes] = useState([])

  function refreshNotes() {
    db.transaction((tx)=> {
      tx.executeSql(
        'SELECT * FROM notes', null, 
        (txObj, {rows: { _array }}) => setNotes(_array), 
        (txObj, error) => console.log("DB error: ", error)
      ) 
    })
  }

  useEffect(() => {
    db.transaction((tx)=> {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, details TEXT, done INT)'
      )
    }, null, refreshNotes)
  })

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Add" onPress={() => navigation.navigate("New Note")} />
      )
    })
  })

  useEffect(() => {
    if (route.params?.text) {
      db.transaction((tx) => {
        tx.executeSql('INSERT INTO notes (done, title, details) VALUES (0, ?, ?)', [
          route.params.title, route.params.text
        ])
      }, null, refreshNotes)
    }
  }, [route.params?.text])

  {/*
  function addNote() {
    setNotes([
      ...notes,
      {title:"Sample Note", details:"This is just a placeholder", done:false, id:notes.length.toString()}
    ])
  }
  */}

  function renderNotes({item}) {
    return (
      <TouchableOpacity onPress={() => {navigation.navigate("Note", {...item})}}>
        <View style={styles.noteBox}>
          <Text style={styles.noteTitle}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList data={notes} renderItem={renderNotes} style={{width: "100%"}} keyExtractor={item => item.id.toString()}/>
    </View>
  )
}

const Stack = createStackNavigator();
const newNoteStack = createStackNavigator();

function NoteStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{headerStyle: {backgroundColor: 'cyan'}}}/>
      <Stack.Screen name="Note" component={NoteScreen} options={{headerStyle: {backgroundColor: 'cyan'}}}/>
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <newNoteStack.Navigator mode="modal" headerMode="none">
        <Stack.Screen name="Notes" component={NoteStack} options={{headerShown:false}}/>
        <Stack.Screen name="New Note" component={NewNoteScreen} />
      </newNoteStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteBox: {
    height: 60,
    borderBottomWidth: 5,
    justifyContent: 'center',
    width: "100%",
  },
  noteTitle: {
    textAlign: 'left',
    padding: 10,
  }
});
