import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

function Userpro(image, username) {
    return (
        <View style={styles.userpro}>
            <Image style={styles.image} source={image}/>
            <Text style={styles.username}>{username}</Text>
        </View>
    );
}
const styles= StyleSheet.create({
    userpro: {
        borderRadius: 15,
        backgroundColor: 'fff',
        marginBottom:20,
        overflow: "hidden",
    },
    image: {
        width: '100%',
        height: 200,
    },
    username: {
        marginBottom: 7,
    },
});
export default Userpro;