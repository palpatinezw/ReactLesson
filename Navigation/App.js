import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './Screens/HomeScreen'
import DisplayScreen from './Screens/DisplayScreen'
import SettingsScreen from './Screens/SettingsScreen'

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') { 
            iconName = 'home';
          } else if (route.name === 'Display') {
            iconName = focused ? 'building' : 'building-o';
          } else if (route.name === 'Settings') {
            iconName = 'gears';
          }

            // You can return any component that you like here!
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        })}
          tabBarOptions={{
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
          }}
      >
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Display" component={DisplayScreen}/>
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
});
