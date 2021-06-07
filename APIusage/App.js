import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import Constants from 'expo-constants';
import InnerBox from './components/innerbox'
import ProfileBox from './components/ProfileBox'
import EditScreen from './components/EditScreen'
import SavedScreen from './components/SavedScreen'

const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id="

function MainScreen({navigation, route}) {
  let [loaded, setloaded] = useState(0)
  let [bus, setBus] = useState([])
  let [busStop, setbusStop] = useState(0)

  function loadBusData(busStopno) {
    setloaded(0)

    fetch(BUSSTOP_URL+busStopno).then((response) => {
      return response.json()  
    }).then((responseData) => {
      var buses = responseData.services
      buses.sort((a, b) => (a.no > b.no)?1:-1)
      setBus(buses)
      setloaded(1)
    })
  }

  useEffect(() => {
    loadBusData(busStop)
  }, [])

  useEffect(() => {
    if (route.params?.busStop && route.params.busStop != busStop) {
      setbusStop(Number(route.params.busStop))
      loadBusData(route.params.busStop)
    }
  }, [route.params?.busStop])

  function ftd(time) {
    var now = new Date()
    var t = new Date(time)
    return Math.round((t-now)/(1000*60))
  }

  function renderItem({item}) {
    return (<ProfileBox 
      title={item.no} 
      subtitle="INFO" 
      load={loaded} 
      time={ftd(item.next.time)} 
      time2={ftd(item.next2.time)}
      time3={ftd(item.next3.time)}
      keyExtractor={(item, index) => index.toString()} 
      
    ></ProfileBox>)
  }

  if (bus.length==0) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.outerBox} onPress={()=>navigation.navigate("Edit", {busStop})}>
          <Text style={styles.title}>{(busStop==0 ? "Click here (or S) to set bus stop" : "Invalid bus stop number! Click here (or S) to change it!")}</Text>
        </TouchableOpacity>

        <View style={styles.box}>
        </View>
        <View style={styles.outerBox}>
          <TouchableOpacity onPress={() => loadBusData(busStop)}>
            <InnerBox color="cyan">
              <Text style={styles.refrsh}>⟳</Text>
            </InnerBox>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate("Saved", {busStop})}>
            <InnerBox color="cyan">
              <Text style={styles.refrsh}>S</Text>
            </InnerBox>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.outerBox} onPress={()=>navigation.navigate("Edit", {busStop})}>
        <Text style={styles.title}>BUS STOP {busStop}</Text>
      </TouchableOpacity>

      <View style={styles.box}>
        <FlatList data={bus} renderItem={renderItem}/>
      </View>
      <View style={styles.outerBox}>
        <TouchableOpacity onPress={() => loadBusData(busStop)}>
          <InnerBox color="cyan">
            <Text style={styles.refrsh}>⟳</Text>
          </InnerBox>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Saved", {busStop})}>
          <InnerBox color="cyan">
            <Text style={styles.refrsh}>S</Text>
          </InnerBox>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Stack = createStackNavigator()
export default function App() {
  return (<NavigationContainer>
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Edit" component={EditScreen} />
      <Stack.Screen name="Saved" component={SavedScreen} />
    </Stack.Navigator>
  </NavigationContainer>)
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'teal',
    padding: 8,
  },
  box: {
    backgroundColor: '#333333',
    padding: 10,
    paddingBottom: 15,
    borderRadius: 20,
    justifyContent: 'center',
    flex: 10,
  },
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
  outerBox: {
    backgroundColor: '#444',
    width: '100%',
    flex: 2,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row', //indicates that stuff inside are arranged along a row
    justifyContent: 'center',
    borderRadius: 20,
    alignItems: 'center',
  },
  innerBox: {
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: 'cyan',
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: 'lightblue',
    fontSize: 16,
    textAlign: 'center',
  },
  number: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center'
  },
  refrsh: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  }
});