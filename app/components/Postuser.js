import React from 'react';
import {StyleSheet, View, Image, Text,Platform } from 'react-native';

import colors from "../config/colors";

function Postuser({imagepro, username, time, image , title}) {
    return (
        <View style={styles.post}>
            <Image style={styles.imagepro} source={imagepro}/>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.time}>{time}</Text>
            <Text style={styles.title}>{title}</Text> 
            <Image style={styles.image} source={image}></Image>
            
        </View>
    );
}

const styles = StyleSheet.create({
    post : { // all the template
        padding:20,
        marginTop: Platform.OS ==="android" ? 20 : 10 ,
        overflow: "hidden",
    },
    imagepro: { // the profile picture of the user
        width: "8%",
        height: 25,
        resizeMode: 'stretch',
        borderRadius: 20,
    },
    username: { // the name of the user
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: -20,
        marginLeft: 30,
    },
    time: { // what time he upload the post
        fontSize: 15,
        marginTop: Platform.OS ==="android" ? -21 : -18,
        marginLeft: Platform.OS ==="android" ? 140 : 145,
    },
    title: { // the post the user write
        marginTop: 5,
        marginBottom: 7,
    },
    image: { // the image the user ass to the post
        width: "100%",
        height: 150,
        resizeMode: 'stretch',
        borderRadius: 10,
    },
})
export default Postuser;