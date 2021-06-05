import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default function SettingsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.paragraph}>Settings Screen</Text>
        </View>
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
    paragraph: {
        textAlign: 'center',
        fontSize: 20,
    }
});
  