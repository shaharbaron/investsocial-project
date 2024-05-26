import React, {useState}  from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const LikeButton = () => {
    const [isLiked, setIsLiked] = useState(false); // like's status
    const handleLikePress = () => {
        setIsLiked(!isLiked);
    };

    return (
        <View style={styles.container}>{}
            <TouchableOpacity onPress={handleLikePress} style={[styles.button, isLiked && styles.likedButton]}>
            <AntDesign
                name={isLiked ? 'like1' : 'like2'}
                size={20}
                color={isLiked ? 'green' : 'black'}/>
            </TouchableOpacity>{}
            <Text style={styles.likesText}>{isLiked ? 1 : 0} Likes</Text>
        </View>
    );
};   

const styles = StyleSheet.create({
    container: { // all 
        flexDirection: 'row',
        marginTop: 5,
    },
    button: { // the button - number of likes
        marginRight: 10,
    },
    likesText: { // the text - number of likes
        marginTop: 2,
        fontSize: 15,
    },
});

export default LikeButton;