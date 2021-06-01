import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Constants from 'expo-constants';

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
        <View style={styles.innerBox}></View>
        <View style={styles.innerBox}></View>
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>TESTING</Text>
        <Text style={styles.subtitle}>My name is lol</Text>
        <Image
          style={styles.profilePic}
          source={{
            uri:
              'data:image/jpeg;base64,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',
          }}
        />
        <Text style={styles.title}>
          {count}
        </Text>
      </View>
      <View style={styles.outerBox}>
        <View style={styles.innerBox}></View>
        <View style={styles.innerBox}></View>
        <View style={styles.innerBox}></View>
        <View style={styles.innerBox}></View>
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
  profilePic: {
    height: 60,
    width: 60,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 10,
    borderColor: 'white',
    borderWidth: 2,
  },
});