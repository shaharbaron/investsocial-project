import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

import colors from '../congif/colors'

function AppButton({title, onPress}) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}> 
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity> 
    );
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        width: '100%'
    },
    text: {
        color: '#fff',
        fontSize: 18,
        textTran


    }

})
export default AppButton;