import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

function AppButton({title, onPress}) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}> 
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity> 
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
    },
    text: {
        fontSize: 22,
        fontWeight: 'bold',
    },

})
export default AppButton;