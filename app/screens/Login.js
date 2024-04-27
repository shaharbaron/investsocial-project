import React from 'react';
import { StyleSheet, Image , SafeAreaView, Text, TextInput, TouchableOpacity, handleLogin, Platform} from 'react-native';
import colors from '../config/colors';

function Login(props) {
    return (
    <SafeAreaView style= {styles.container}>
        <Image style={styles.blackup} source={require("../assets/images/blackup.jpg")}/>
        <Image style={styles.logoup} source={require("../assets/images/logoup.png")}/>
        <Text style={styles.headerText1}>Log in to your account</Text>
        <Text style={styles.headerText2}>Welcome back! please enter your details.</Text>
        <Text style={styles.email}>Email</Text>
        <TextInput style={styles.input}></TextInput>
        <Text style={styles.password}>Password</Text>
        <TextInput style={styles.input}></TextInput>
        <TouchableOpacity style={styles.loginbutton} onPress={handleLogin}>
        <Text style={styles.buttonlog}>Log in</Text>
        </TouchableOpacity>
        <Text style={styles.buttonText1}>Don't hava an account?</Text>
        <TouchableOpacity style={styles.signupbutton} onPress={handleLogin}>
        <Text style={styles.buttonText2}>Sign up</Text>
        </TouchableOpacity>
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
    headerText1: {// log in to your account
        marginTop: 60,
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    headerText2: {// welcome back....
        fontSize: 19,
        marginBottom: 10,
    },
    email: {// the email text
        marginTop: 50,
        marginLeft: -280,
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 10,
    },
    input: {// all the text input 
        marginLeft: -42,
        height: 40,
        width: '80%',
        borderWidth: 1,
        padding: 10,
        borderRadius:4,
    },
    password: {// the password text
        marginTop: 50,
        marginLeft: -228,
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 10,
    },
    loginbutton: {// button login
        marginTop: 50,
        height: Platform.OS ==="android" ? 44 : 40 ,
        width: '20%',
        borderWidth: 1,
        padding: 10,
        borderRadius:10,
    },
    buttonlog: {// text login on button
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: "center",
    },
    buttonText1: {// dont have an acount 
        marginTop: 20,
        fontSize: 20,
        textAlign: "center",
    },
    buttonText2: {// sign up
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center",
    },

});
export default Login;