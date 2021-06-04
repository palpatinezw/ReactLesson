import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import Constants from 'expo-constants';
import InnerBox from './components/innerbox'
import ProfileBox from './components/ProfileBox'

const imguri = 'https://static.wikia.nocookie.net/moradaland/images/f/fa/The_skrattain_federation_275108.png/revision/latest?cb=20200927095343'

export default function App() {

  let [count, setCount] = useState(0);

  function addVal(val){
    setCount(count+val);
  }

  return (
    <View style={styles.container}>
      <View style={styles.outerBox}>
        <TouchableOpacity style={styles.innerBox} onPress={() => addVal(1)}>
          <Text style={styles.number}>+1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.innerBox} onPress={() => addVal(-count)}>
          <Text style={styles.number}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.innerBox} onPress={() => addVal(-1)}>
          <Text style={styles.number}>-1</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.outerBox}>
        <InnerBox color="red"></InnerBox>
        <InnerBox></InnerBox>
      </View>
      <View style={styles.box}>
        <ScrollView contentContainerStyl={styles.box}>
          <ProfileBox title="Hello" subtitle="This is a box" count={count} uri={imguri}></ProfileBox>
          <ProfileBox title="Bonjour" subtitle="C'est une boite" count={count} uri={imguri}></ProfileBox>
          <ProfileBox title="Guten Tag" subtitle="Das ist eine Schachtel" count={count} uri={imguri}></ProfileBox>
          <ProfileBox title="Здраствуйте" subtitle="Это - шкатулка" count={count} uri={imguri}></ProfileBox>
        </ScrollView>
      </View>
      <View style={styles.outerBox}>
        <InnerBox color="cyan"></InnerBox>
        <InnerBox color="black"></InnerBox>
        <InnerBox color="white"></InnerBox>
        <InnerBox color="grey"></InnerBox>
      </View>
    </View>
  );
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
});