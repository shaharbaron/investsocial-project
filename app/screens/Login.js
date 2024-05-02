import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform} from 'react-native';

import LogoUp from '../components/LogoUp';
import colors from '../config/colors';
import AppTextInput from '../components/AppTextInput';

function Login({navigation}) {
    return (
    <View style= {styles.container}>
        <LogoUp/>
        <Text style={styles.headerText1}>Log in to your account</Text>
        <Text style={styles.headerText2}>Welcome back! please enter your details.</Text>
        <Text style={styles.email}>Email</Text>
        <AppTextInput placeholder={"Enter your username"}></AppTextInput>
        <Text style={styles.password}>Password</Text>
        <AppTextInput placeholder={"Enter your password"}></AppTextInput>
        <TouchableOpacity style={styles.loginbutton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonlog}>Log in</Text>
        </TouchableOpacity>
        <Text style={styles.buttonText1}>Don't hava an account?</Text>
        <TouchableOpacity style={styles.signupbutton} onPress={() => navigation.navigate('Signup')}>
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
        marginLeft: Platform.OS ==="android" ? -285 : -280 ,
        fontWeight: 'bold',
        fontSize: 25,
    },
    password: {// the password text
        marginTop: 50,
        marginLeft: Platform.OS ==="android" ? -235 : -228 ,
        fontWeight: 'bold',
        fontSize: 25,
    },
    loginbutton: {// button login
        backgroundColor: colors.lightgray,
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