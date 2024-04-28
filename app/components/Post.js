import React from 'react';
import { StyleSheet, View, Image, Text} from 'react-native';

import colors from "../config/colors";

function Post(title ,image) {
    return (
        <View style={styles.post}>
            <Image style={styles.image} source={image} />
            <Text style={styles.title}>{title}</Text> 
        </View>
    );
}

const styles = StyleSheet.create({
    post : {
        borderRadius: 15,
        backgroundColor: colors.white,
        marginBottom: 20,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: 200,
    },
    title: {
        marginBottom: 7,
    },
})
export default Post;