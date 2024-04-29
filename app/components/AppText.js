import React from 'react';
import {StyleSheet, Platform, Text} from 'react-native';

function AppText({apptext}) {
    return (
        <Text style={styles.apptext}>{apptext}</Text>
    );
}
const styles= StyleSheet.create({
    apptext: {// the settings of the text
        marginTop: Platform.OS ==="android" ? 20 : 40 ,
        fontSize: 25,
        fontWeight: 'bold',
    },
});
export default AppText;