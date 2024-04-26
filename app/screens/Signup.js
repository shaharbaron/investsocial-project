import React from 'react';
import { ImageBackground, StyleSheet, Image , View, resizeMode, Text, TextInput, Button, TouchableOpacity, handleLogin} from 'react-native';

function Signup(props){
    return(
    <View style= {styles.container}>
        <Image style={styles.blackup} source={require("../assets/images/blackup.jpg")}/>
        <Image style={styles.logoup} source={require("../assets/images/logoup.png")}/>
    </View>    
    );
}

export default Signup;