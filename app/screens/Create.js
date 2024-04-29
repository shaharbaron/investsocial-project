import React from 'react';
import { StyleSheet, View, Text, Platform, TextInput, TouchableOpacity, handleLogin} from 'react-native';
import LogoUp from '../components/LogoUp';
import DownLine from '../components/DownLine';
// import AppButton from '../components/AppButton';

function Create(props) {
    return (
        <View style= {styles.container}>
            <LogoUp
            background={require("../assets/images/blackup.jpg")}
            logo= {require("../assets/images/logoup.png")} />
            <Text style={styles.title}>Create new post</Text>
            <Text style={styles.caption}>Caption</Text>
            <TextInput style={styles.input}></TextInput>
            <Text style={styles.addphoto}>Add photo</Text>
            <TextInput style={styles.input}>             SVG, PNG, JPG, GIF, JPEG </TextInput>
            <TouchableOpacity style={styles.postbutton} onPress={handleLogin}>
            <Text style={styles.buttonpost}>Post</Text>
            </TouchableOpacity>
            {/* <AppButton style={styles.postbutton}
                title={"post"}
                onPress={onPress}
            /> */}
            <DownLine
            Home={"Home"}
            Create={"Create"}
            Explore={"Explore"}
            Profile={"Profile"}/>
        </View>  
    );
}

const styles= StyleSheet.create({
    container: { 
        flex: 1,
        alignItems: 'center',
    },
    title: { // create new post
        fontSize: 30,
        fontWeight: '600',
        marginTop: 50,
        marginLeft: -120,
    },
    input: {// all the text input 
        marginLeft: -42,
        height: 120,
        width: 300,
        borderWidth: 1,
        padding: 10,
        borderRadius:4,
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
        marginTop: 50,
        height: Platform.OS ==="android" ? 44 : 40 ,
        width: 55,
        borderWidth: 1,
        padding: 10,
        borderRadius:10,
    },
    buttonpost: {// text post on button
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: "center",
    },
});

export default Create;