import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native';
import * as SQLite from "expo-sqlite";
import { FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import NoteScreen from './Screens/NoteScreen'
import NewNoteScreen from './Screens/NewNoteScreen';
import MainScreen from './Screens/MainScreen';
import SettingsScreen from './Screens/SettingsScreen';

const db = SQLite.openDatabase("notes.db");

function HomeScreen({navigation, route}) {
  const [notes, setNotes] = useState([])
  const [modalVisible, setModalVisible] = useState(false);

  function refreshNotes() {
    db.transaction((tx)=> {
      tx.executeSql(
        'SELECT * FROM notes ORDER BY done ASC, id DESC', null, 
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
  }, [])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.newButton}>
            <Text style={{fontWeight: "bold"}}>+</Text>
          </View>
        </TouchableOpacity>
      )
    })

  })

  useEffect(() => {
    if (route.params?.text) {
      db.transaction((tx) => {
        tx.executeSql(`INSERT INTO notes (done, title, details) VALUES (0, ?, ?)`, [
          route.params.title, route.params.text
        ])
      }, null, refreshNotes)
    }
    navigation.setParams({text:null})
  }, [route.params?.text])

  function addNewNote(nTitle, nText) {
    db.transaction((tx) => {
      tx.executeSql(`INSERT INTO notes (done, title, details) VALUES (0, ?, ?)`, [
        nTitle, nText
      ])
    }, null, refreshNotes)
    setModalVisible(false)
  }

  useEffect(() => {
    if (route.params?.del) {
      db.transaction((tx) => {
        tx.executeSql(`DELETE FROM notes WHERE id=?`, [
          route.params.id,
        ])
      }, null,refreshNotes)
    }
    navigation.setParams({del:null})
  }, [route.params?.del])

  useEffect(() => {
    if (route.params?.done) {
      db.transaction((tx) => {
        tx.executeSql(`UPDATE notes SET done=1 WHERE id=?`, [
          route.params.id,
        ])
      }, null,refreshNotes)
    }
    navigation.setParams({done:null})
  }, [route.params?.done])

  function renderNotes({item}) {
    if (item.done) {
      return (
        <TouchableOpacity onPress={() => {navigation.navigate("Note", {...item})}}>
          <View style={styles.donenoteBox}>
            <Text style={styles.donenoteTitle}>{item.title}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Home", {del:true, id:item.id})}>
              <View style={styles.newButton}>
                <Text style={{fontWeight: "bold"}}>X</Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity onPress={() => {navigation.navigate("Note", {...item})}}>
          <View style={styles.noteBox}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Home", {done:true, id:item.id})}>
              <View style={styles.newButton}>
                <Text style={{fontWeight: "bold"}}>✓</Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )
    }
  }

  const [text, setText] = useState('Type your note here.')
  const [title, setTitle] = useState('Title of your note')

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.newnotecontainer}>
            <Text style={styles.title}>
                Add a note!
            </Text>
            <TextInput style={styles.TitleInput} value={title} onChangeText={(newText) => setTitle(newText)}/>
            <TextInput style={styles.TextInput} value={text} onChangeText={(newText) => setText(newText)}/>
            <View style={styles.buttonrow}>
                <Button title="submit" onPress={() => addNewNote(title, text)} />
            </View>
        </View>
      </Modal>
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

function DisplayScreen() {
  return (
      <newNoteStack.Navigator mode="modal" headerMode="none">
        <Stack.Screen name="Notes" component={NoteStack} options={{headerShown:false}}/>
        <Stack.Screen name="New Note" component={NewNoteScreen} />
      </newNoteStack.Navigator>
  );
}

const Tab = createBottomTabNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Main') { 
            iconName = 'home';
          } else if (route.name === 'Notes') {
            iconName = focused ? 'building' : 'building-o';
          } else if (route.name === 'Settings') {
            iconName = 'gears';
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        })}
          tabBarOptions={{
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
          }}
      >
        <Tab.Screen name="Main" component={MainScreen}/>
        <Tab.Screen name="Notes" component={DisplayScreen}/>
        <Tab.Screen name="Settings" component={SettingsScreen}/>
      </Tab.Navigator>
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
    height: 50,
    borderBottomWidth: 5,
    justifyContent: 'center',
    width: "100%",
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
  },
  donenoteBox: {
    height: 50,
    borderBottomWidth: 5,
    justifyContent: 'center',
    width: "100%",
    backgroundColor: 'grey',
    flexDirection: 'row',
    justifyContent:'space-between',
    textDecorationLine: 'line-through', textDecorationStyle: 'solid',
    alignItems: 'center',
  },
  noteTitle: {
    textAlign: 'left',
    padding: 10,
  },
  donenoteTitle: {
    textAlign: 'left',
    padding: 10,
    textDecorationLine: 'line-through', textDecorationStyle: 'solid',
  },
  newButton: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
  },
  newnotecontainer: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'center'
  },
});
