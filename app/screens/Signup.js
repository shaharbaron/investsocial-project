import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform} from 'react-native';

import LogoUp from '../components/LogoUp';
import AppTextInput from '../components/AppTextInput';
import colors from '../config/colors';

function Signup({navigation}){
    return(
    <View style= {styles.container}>
        <LogoUp/>
        <Text style={styles.headerText1}>Create new account</Text>
        <Text style={styles.headerText2}>To use InvestSocial, please enter your details.</Text>
        <Text style={styles.textname}>Name</Text>
        <AppTextInput placeholder={"Enter your name"}></AppTextInput>
        <Text style={styles.textuser}>Username</Text>
        <AppTextInput placeholder={"Enter your username"}></AppTextInput>
        <Text style={styles.textemail}>Email</Text>
        <AppTextInput placeholder={"Enter your email"}></AppTextInput>
        <Text style={styles.textpass}>Password</Text>
        <AppTextInput placeholder={"Enter your password"}></AppTextInput>
        <TouchableOpacity style={styles.signbutton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonsign}>Sign up</Text>
        </TouchableOpacity>
        <Text style={styles.buttonText1}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText2}>Log in</Text>
        </TouchableOpacity>
    </View>    
    );
}

const styles= StyleSheet.create({
    container: { 
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
    },
    headerText1: {// creat new account
        marginTop: Platform.OS ==="android" ? 30 : 60 ,
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    headerText2: {// to use invest.....
        fontSize: 17,
    },
    textname: {// the name text
        marginTop: 20,
        marginLeft: -275,
        fontWeight: 'bold',
        fontSize: 25,
    },
    textuser: {// the user text
        marginTop: 20,
        marginLeft: -225,
        fontWeight: 'bold',
        fontSize: 25,
        
    },
    textemail: {// the email text
        marginTop: 20,
        marginLeft: -280,
        fontWeight: 'bold',
        fontSize: 25,
    },
    textpass: {// the pssword text
        marginTop: 20,
        marginLeft: -230,
        fontWeight: 'bold',
        fontSize: 25,
    },
    signbutton: {// button sign up
        backgroundColor: colors.lightgray,
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
