import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform} from 'react-native';

import LogoUp from '../components/LogoUp';
import AppTextInput from '../components/AppTextInput';
import colors from '../config/colors';
import CameraButton from '../components/CameraButton';

function Signup({navigation}){

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);
  
    const handleSignUp = () => {
        if (!name || !username || !email || !password) {
            alert('Please fill in all fields before signing up');
            return;
        }
      // here you sent all the info to the server
      console.log('Name:', name);
      console.log('Username:', username);
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Profile Image:', profileImage);
      navigation.navigate('Home'); // after the sign up you go to home page
    };
    return(
    <View style= {styles.container}>
        <LogoUp/>
        <Text style={styles.headerText1}>Create new account</Text>
        <Text style={styles.headerText2}>To use InvestSocial, please enter your details.</Text>
        <CameraButton/>
        <Text style={styles.textname}>Name</Text>
        <AppTextInput placeholder={"Enter your name"} onChangeText={setName}></AppTextInput>
        <Text style={styles.textuser}>Username</Text>
        <AppTextInput placeholder={"Enter your username"} onChangeText={setUsername}></AppTextInput>
        <Text style={styles.textemail}>Email</Text>
        <AppTextInput placeholder={"Enter your email"} onChangeText={setEmail}></AppTextInput>
        <Text style={styles.textpass}>Password</Text>
        <AppTextInput placeholder={"Enter your password"} onChangeText={setPassword}></AppTextInput>
        <TouchableOpacity style={styles.signbutton} onPress={handleSignUp}>
        <Text style={styles.buttonsign}>Sign up</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginTop: 20}}>
        <Text style={styles.buttonText1}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText2}>Log in</Text>
        </TouchableOpacity></View>
    </View>    
    );
}

const styles= StyleSheet.create({
    container: { 
        flex: 1,
        alignItems: 'center',
    },
    headerText1: {// creat new account
        marginTop: Platform.OS ==="android" ? 30 : 10 ,
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    headerText2: {// to use invest.....
        fontSize: 17,
    },
    textname: {// the name text
        marginLeft: -275,
        fontWeight: 'bold',
        fontSize: 25,
    },
    textuser: {// the user text
        marginTop: 10,
        marginLeft: -225,
        fontWeight: 'bold',
        fontSize: 25,
    },
    textemail: {// the email text
        marginTop: 10,
        marginLeft: -280,
        fontWeight: 'bold',
        fontSize: 25,
    },
    textpass: {// the pssword text
        marginTop: 10,
        marginLeft: -230,
        fontWeight: 'bold',
        fontSize: 25,
    },
    signbutton: {// button sign up
        backgroundColor: colors.lightgray,
        marginTop: 20,
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
        fontSize: 20,
        textAlign: "center",
    },
    buttonText2: {// the log in button-text
        marginLeft: 5,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center",
    },
});
export default Signup;
