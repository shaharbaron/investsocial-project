import React from 'react';
import { View, StyleSheet, Text, Platform} from 'react-native';

function DownLine({Home, Create, Explore, Profile}) {
    return (
        <View style={styles.container}>
            <Text style={styles.textbottom}>{Home}
            <Text style={styles.textbottom}>  {Create}
            <Text style={styles.textbottom}>  {Explore}
            <Text style={styles.textbottom}>  {Profile}
            </Text></Text></Text></Text>
        </View>
    );
}
const styles= StyleSheet.create({
    container: { 
        flex: 1,
        alignItems: 'center',
    },
    textbottom: {// the options down
        marginTop: Platform.OS ==="android" ? 20 : 40 ,
        fontSize: 25,
        fontWeight: 'bold',
    },
});

export default DownLine;