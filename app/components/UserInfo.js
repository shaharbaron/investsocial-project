import React from 'react';
import { View } from 'react-native';

function UserInfo({imagepro, username, time}) {
    return (
        <View>
            <Image style={styles.imagepro} source={imagepro}/>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.time}>{time}</Text> 
        </View>
    );
}

const styles = StyleSheet.create({
    imagepro: { // the profile picture of the user
        width: "8%",
        height: 25,
        resizeMode: 'stretch',
    },
    username: { // the name of the user
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: -20,
        marginLeft: 30,
    },
    time: { // what time ho upload the post
        fontSize: 15,
        marginTop: Platform.OS ==="android" ? -21 : -18,
        marginLeft: Platform.OS ==="android" ? 140 : 145,
    },
})
export default UserInfo;