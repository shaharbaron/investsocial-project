import React from 'react';
import { StyleSheet, Image , View, Text, TextInput, TouchableOpacity, handleLogin} from 'react-native';

function Login(props) {
    return (
    <View style= {styles.container}>
        <Image style={styles.blackup} source={require("../assets/images/blackup.jpg")}/>
        <Image style={styles.logoup} source={require("../assets/images/logoup.png")}/>
        <Text style={styles.headerText1}>Log in to your account</Text>
        <Text style={styles.headerText2}>Welcome back! please enter your details.</Text>
        <Text style={styles.email}>Email</Text>
        <TextInput style={styles.inputemail}></TextInput>
        <Text style={styles.password}>Password</Text>
        <TextInput style={styles.inputpassword}></TextInput>
        <TouchableOpacity style={styles.loginbutton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
        <Text style={styles.buttonText1}>Don't hava an account?</Text>
        <TouchableOpacity style={styles.signupbutton} onPress={handleLogin}>
        <Text style={styles.buttonText2}>Sign up</Text>
        </TouchableOpacity>
    </View>    
    );
}

const styles= StyleSheet.create({
    container: { 
        flex: 1,
        alignItems: 'center',
    },
    blackup: {
        width: 500,
        height: 140,
        position: "absolute",
    },
    logoup: {
        width: '90%',
        height: 65,
        marginTop: 35,
        resizeMode: 'stretch'
    },
    headerText1: {
        marginTop: 60,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    headerText2: {
        fontSize: 19,
        marginBottom: 10,
    },
    email: {
        marginTop: 50,
        marginLeft: -280,
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 10,
    },
    inputemail: {
        marginLeft: -42,
        height: 40,
        width: '80%',
        borderWidth: 1,
        padding: 10,
        textAlign: 10,
    },
    password: {
        marginTop: 50,
        marginLeft: -228,
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 10,
    },
    inputpassword: {
        marginLeft: -42,
        height: 40,
        width: '80%',
        borderWidth: 1,
        padding: 10,
        textAlign: 10,
    },
    loginbutton: {
        marginTop: 50,
        height: 40,
        width: '20%',
        borderWidth: 1,
        padding: 10,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
    },
    buttonText1: {
        marginTop: 20,
        fontSize: 20,
        textAlign: 'center',
    },
    buttonText2: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },

});
export default Login;