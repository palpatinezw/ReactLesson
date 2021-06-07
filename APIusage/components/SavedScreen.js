import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';
import * as SQLite from "expo-sqlite";
import Constants from 'expo-constants';

import { createStackNavigator } from "@react-navigation/stack";

const db = SQLite.openDatabase("busStops.db");

function SavedListScreen({navigation, route}) {
    const [busStopList, setbusStopList] = useState([])

    function refreshbusStops() {
        db.transaction((tx)=> {
            tx.executeSql(
                'SELECT * FROM busStops ORDER BY id DESC', null, 
                (txObj, {rows: { _array }}) => setbusStopList(_array), 
                (txObj, error) => console.log("DB error: ", error)
            )
        })
    }

    useEffect(() => {
        db.transaction((tx)=> {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS busStops (id INTEGER PRIMARY KEY AUTOINCREMENT, stopNo TEXT)'
            )
        }, null, refreshbusStops)
    }, [])

    useEffect(() => {
        if (route.params?.busStop) {
            db.transaction((tx) => {
                tx.executeSql(`INSERT INTO busStops (stopNo) VALUES (?)`, [
                    route.params.busStop
                ])
            }, null, refreshbusStops)
        }
        navigation.setParams({busStop:null})
    }, [route.params?.busStop])

    useEffect(() => {
        if (route.params?.del) {
            db.transaction((tx) => {
                tx.executeSql(`DELETE FROM busStops WHERE id=?`, [
                    route.params.id,
                ])
            }, null,refreshbusStops)
        }
        navigation.setParams({del:null})
    }, [route.params?.del])

    useEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("New Stop")}>
              <View style={styles.newButton}>
                <Text style={{fontWeight: "bold"}}>+</Text>
              </View>
            </TouchableOpacity>
          )
        })
    })

    function renderNotes({item}) {
        let stopNo = item.stopNo
        return (
        <TouchableOpacity onPress={() => {navigation.navigate("Main", {busStop:stopNo})}}>
            <View style={styles.noteBox}>
            <Text style={styles.noteTitle}>{stopNo}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SavedList", {del:true, id:item.id})}>
                <View style={styles.newButton}>
                <Text style={{fontWeight: "bold"}}>X</Text>
                </View>
            </TouchableOpacity>
            </View>
        </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList data={busStopList} renderItem={renderNotes} style={{width: "100%"}} keyExtractor={item => item.id.toString()}/>
        </View>
    )
}

function NewStopScreen({navigation, route}) {
    const [busStop, setbusStop] = useState("")

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Add New Saved Bus Stop Number
            </Text>
            <TextInput style={styles.TitleInput} value={busStop} onChangeText={(newText) => setbusStop(newText)}/>
            <View style={styles.buttonrow}>
                <Button title="ADD" onPress={() => navigation.navigate("SavedList", {busStop})} />
                <Button title="dismiss" onPress={() => navigation.goBack()} />
            </View>
        </View>
    )
}

const Stack = createStackNavigator();
export default function SavedScreen() {
    return (
        <Stack.Navigator mode="modal">
            <Stack.Screen name="SavedList" component={SavedListScreen}/>
            <Stack.Screen name="New Stop" component={NewStopScreen} />
        </Stack.Navigator>
    );
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
        flex: 1,
        backgroundColor: '#fff',
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
      }
})