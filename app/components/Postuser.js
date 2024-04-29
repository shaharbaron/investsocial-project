import React from 'react';
import {StyleSheet, View, Image, Text,Platform } from 'react-native';

import colors from "../config/colors";
import UserInfo from './UserInfo';

function Postuser({imagepro, username, time, image , title}) {
    return (
        <View style={styles.post}>
            <UserInfo style={styles.userinfo}
            imagepro={imagepro}
            username={username}
            time={time}/>
            <Text style={styles.title}>{title}</Text> 
            <Image style={styles.image} source={image}></Image>
            
        </View>
    );
}

const styles = StyleSheet.create({
    post : { // all the template
        borderRadius: 15,
        //איך מוסיפים מסגרת בצבע לכל תבנית פוסט
        backgroundColor: colors.white,
        padding:6,
        marginTop: Platform.OS ==="android" ? 30 : 30 ,
        overflow: "hidden",
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