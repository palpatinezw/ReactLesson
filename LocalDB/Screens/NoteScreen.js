import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

export default function NoteScreen({route}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {route.params.title}
            </Text>
            <Text style={styles.paragraph}>
                {route.params.details}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    paragraph: {
        fontSize: 14,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
})