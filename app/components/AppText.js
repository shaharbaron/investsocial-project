import React from 'react';
import {StyleSheet, View, Platform, Text} from 'react-native';

function AppText({apptext}) {
    return (
        <View style={styles.container}>
            <Text style={styles.apptext}>{apptext}</Text>
        </View>
    );
}
const styles= StyleSheet.create({
    container: { 
        flex: 1,
        alignItems: 'center',
    },
    apptext: {// the settings of the text
        marginTop: Platform.OS ==="android" ? 20 : 40 ,
        fontSize: 25,
        fontWeight: 'bold',
    },
});
export default AppText;