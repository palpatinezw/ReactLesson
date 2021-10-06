import { StatusBar } from 'expo-status-bar';
import React , { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack'
import { FlatList } from 'react-native-gesture-handler';

import editNote from './editNote'
import details from './details'
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

function mainScreen({navigation, route}) {
    let [notes, setNotes] = useState([{title:"HI", text:"This is a note"}])

    useEffect(() => {
        if (route.params?.title) {
            setNotes([
                ...notes,
                {title:route.params.title, text:route.params.text}
            ])
        }
    }, [route.params?.title])

    function renderNotes({item}) {
        return (
            <View style={styles.noteBox}>
                <Text style={styles.noteTitle}>{item.text}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList data={notes} renderItem={renderNotes} style={{width: "100%"}}/>
            <Button title="New Note" onPress={() => navigation.navigate("editNote")}/>
        </View>
    )
}

export default function Notes() {
  return (
    <Stack.Navigator headerMode="None">
        <Stack.Screen name="main" component={mainScreen} />
        <Stack.Screen name="editNote" component={editNote} />
        <Stack.Screen name="details" component={details}/>
    </Stack.Navigator>
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
  noteTitle: {
    textAlign: 'left',
    padding: 10,
  },
});
