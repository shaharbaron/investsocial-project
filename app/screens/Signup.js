import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, handleLogin, Platform} from 'react-native';

import LogoUp from '../components/LogoUp';
import colors from '../config/colors';

function Signup(props){
    return(
    <View style= {styles.container}>
        <LogoUp
            background={require("../assets/images/blackup.jpg")}
            logo= {require("../assets/images/logoup.png")} />
        <Text style={styles.headerText1}>Create new account</Text>
        <Text style={styles.headerText2}>To use InvestSocial, please enter your details.</Text>
        <Text style={styles.textname}>Name</Text>
        <TextInput style={styles.input}></TextInput>
        <Text style={styles.textuser}>Username</Text>
        <TextInput style={styles.input}></TextInput>
        <Text style={styles.textemail}>Email</Text>
        <TextInput style={styles.input}></TextInput>
        <Text style={styles.textpass}>Password</Text>
        <TextInput style={styles.input}></TextInput>
        <TouchableOpacity style={styles.signbutton} onPress={handleLogin}>
        <Text style={styles.buttonsign}>Sign up</Text>
        </TouchableOpacity>
        <Text style={styles.buttonText1}>Already have an account?</Text>
        <TouchableOpacity style={styles.signupbutton} onPress={handleLogin}>
        <Text style={styles.buttonText2}>Log in</Text>
        </TouchableOpacity>
    </View>    
    );
}

const styles= StyleSheet.create({
    container: { 
        flex: 1,
        alignItems: 'center',
    },
    headerText1: {// creat new account
        marginTop: Platform.OS ==="android" ? 30 : 60 ,
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    headerText2: {// to use invest.....
        fontSize: 17,
        marginBottom: 25,
    },
    textname: {// the name text
        marginLeft: -280,
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 10,
    },
    textuser: {// the user text
        marginLeft: -228,
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 10,
    },
    textemail: {// the email text
        marginLeft: -283,
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 10,
    },
    textpass: {// the pssword text
        marginLeft: -233,
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 10,
    },
    input: {// all the textinput 
        marginLeft: Platform.OS ==="android" ? -35 : -46 ,
        height: 40,
        width: '80%',
        borderWidth: 1,
        padding: 10,
        borderRadius:4,
        marginBottom:8,
    },
    signbutton: {// button sign up
        marginTop: 30,
        height: 44,
        width: '23%',
        borderWidth: 1,
        padding: 10,
        borderRadius:10,
    },
    buttonsign: {//text sign up on button
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: "center",
    },
    buttonText1: {//already have an account
        marginTop: 15,
        fontSize: 20,
        textAlign: "center",
    },
    buttonText2: {// the log in button-text
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center",
    },
});
export default Signup;
