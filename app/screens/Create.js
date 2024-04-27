import React from 'react';
import { StyleSheet, Image , SafeAreaView, Text, TextInput, TouchableOpacity, handleLogin, Platform} from 'react-native';

function Create(props) {
    return (
        <SafeAreaView style= {styles.container}>
            <Image style={styles.blackup} source={require("../assets/images/blackup.jpg")}/>
            <Image style={styles.logoup} source={require("../assets/images/logoup.png")}/>
            <Text style={styles.textbottom}>Home
            <Text style={styles.textbottom}>  Explore
            <Text style={styles.textbottom}>  Create
            <Text style={styles.textbottom}>  Profile
            </Text></Text></Text></Text>
        </SafeAreaView>  
    );
}

const styles= StyleSheet.create({
    container: { 
        flex: 1,
        alignItems: 'center',
    },
    blackup: {// the black background upside
        flexBasis: 100,
        height: 120,
        position: "absolute",
    },
    logoup: {// the logo - investsocial
        marginTop: Platform.OS ==="android" ? 30 : -5 ,
        flexBasis:65,
        width: '90%',
        resizeMode: 'stretch',
    },
    textbottom: {// the texts down
        marginTop: Platform.OS ==="android" ? 580 : 610 ,
        fontSize: 25,
        fontWeight: 'bold',
    },
});

export default Create;