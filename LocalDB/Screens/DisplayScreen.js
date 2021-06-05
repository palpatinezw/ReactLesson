import * as React from 'react';
import { Text, View, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import ColorBlock from '../components/ColorBlock'

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StackRouter } from 'react-navigation';

function RandomNo(min, max) {
    return Math.random() * (max - min) + min;
}

function DisplayStack({navigation}) {
    const [colors, setColors] = React.useState([])

    function addColour() {
        setColors(
            [{red:RandomNo(0, 255), green:RandomNo(0, 255), blue:RandomNo(0, 255), height:RandomNo(30, 60)}, ...colors,]
        )
    }

    function resetColor() {
        setColors([])
    }

    function renderColors({item}) {
        return (
            <TouchableOpacity onPress={() => navigation.navigate("Colour Info", { ...item })}>
                <ColorBlock red={item.red} blue={item.blue} green={item.green} height={item.height}>
                    <Text style={styles.paragraph}>HI</Text>
                </ColorBlock>
            </TouchableOpacity>
            
        )
    }

    function separator() {
        return (<View style={{height:10, width:1}}></View>)
    }

    return (
        <View style={styles.container}>
            <View style={styles.uppercontainer}>
                <Button title="Add Colour" onPress={addColour}/>
                <Button title="Remove Colours" onPress={resetColor}/>
            </View>
            <View style={styles.lowercontainer}>
                <FlatList 
                    data={colors}
                    renderItem={renderColors}
                    ItemSeparatorComponent={separator}
                    keyExtractor={(item, index) => index.toString()}
                />
                {/* Key extractor bit is to avoid warnings, not adding it seems to be ok as well */}
            </View>
            
        </View>
    )
}

function ColourInfoStack({route}) {
    let {red, green, blue} = route.params
      
    return (
        <View style={styles.container}>
            <Text style = {styles.title}>Bienvenue, tu m'as trouvé</Text>
            <Text style = {styles.para}>Ce sont mes couleurs</Text>
            <Text style = {styles.para}>Red: {red}</Text>
            <Text style = {styles.para}>Green: {green}</Text>
            <Text style = {styles.para}>Blue: {blue}</Text>
        </View>
    )
}

const Stack = createStackNavigator();

export default function DisplayScreen() {
    return (
        // Navigation container is not necessary here as it is already rendered within one from App.js
        <Stack.Navigator>
            <Stack.Screen name="Display" component={DisplayStack} />
            <Stack.Screen name="Colour Info" component={ColourInfoStack} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop: Constants.statusBarHeight,
      justifyContent: 'center',
      padding: 20,
    },
    uppercontainer: {
        backgroundColor: 'cyan',
        flex: 1,
        borderWidth: 5,
        borderRadius: 10,
        width: '100%',
        padding: 30,
        marginBottom: -5,
        justifyContent: 'center',
    },
    lowercontainer: {
        flex:9,
        borderWidth: 5,
        borderRadius: 10,
        width: '100%',
        padding: 30,
    },
    paragraph: {
        textAlign: 'center',
        fontSize: 20,
    }
});
  