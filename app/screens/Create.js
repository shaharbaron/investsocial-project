import React from 'react';
import { StyleSheet, View, Text, Platform, TextInput, TouchableOpacity, handleLogin} from 'react-native';
import LogoUp from '../components/LogoUp';
// import DownLine from '../components/DownLine';
import AppButton from '../components/AppButton';
import colors from '../config/colors';

function Create({navigation}) {
    return (
        <View style= {styles.container}>
            <LogoUp/>
            <Text style={styles.title}>Create new post</Text>
            <Text style={styles.caption}>Caption</Text>
            <TextInput style={styles.input}></TextInput>
            <Text style={styles.addphoto}>Add photo</Text>
            <TextInput style={styles.input}>             SVG, PNG, JPG, GIF, JPEG </TextInput>
            <TouchableOpacity style={styles.postbutton} onPress={handleLogin}>
            <Text style={styles.buttonpost}>Post</Text>
            </TouchableOpacity>
            {/* <DownLine/> */}
            <View style={styles.down}>
            <AppButton title="Home    " onPress={() => navigation.navigate('Home')}></AppButton>
            <AppButton title="Create    " onPress={() => navigation.navigate('Create')}></AppButton>
            <AppButton title="Explore    " onPress={() => navigation.navigate('Explore')}></AppButton>
            <AppButton title="Profile    " onPress={() => navigation.navigate('Profile')}></AppButton>
            </View>
        </View>  
    );
}

const styles= StyleSheet.create({
    container: { 
        flex: 1,
        alignItems: 'center',
    },
    down: { // the down line on the screen
        marginTop: 25,
        flexDirection: 'row',
    },
    title: { // create new post
        fontSize: 30,
        fontWeight: '600',
        marginTop: 50,
        marginLeft: -120,
    },
    input: {// all the text input 
        backgroundColor: colors.white,
        marginLeft: -42,
        height: 120,
        width: 300,
        borderWidth: 1,
        padding: 10,
        borderRadius:15,
    },
    caption: {// the caption text
        marginTop: 50,
        marginLeft: -255,
        fontWeight: '500',
        fontSize: 25,
        marginBottom: 10,
    },
    addphoto: {// add photo
        marginTop: 20,
        marginLeft: -225,
        fontWeight: '500',
        fontSize: 25,
        marginBottom: 10,
    },
    postbutton: {// button post
        backgroundColor: colors.lightgray,
        marginTop: 50,
        height: Platform.OS ==="android" ? 44 : 40 ,
        width: 55,
        borderWidth: 1,
        padding: 10,
        borderRadius:15,
    },
    buttonpost: {// text post on button
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: "center",
    },
});

export default Create;