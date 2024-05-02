import React, { useState } from 'react';
import {StyleSheet, TextInput} from 'react-native';
import colors from '../config/colors';

const AppTextInput = ({ placeholder, style, ...otherProps }) => {
    const [isFocused, setIsFocused] = useState(false);
  
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    return (
        <TextInput style= {styles.apptextinput}
            placeholder={isFocused ? '' : placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
        {...otherProps}
        />
    );
};

const styles = StyleSheet.create({
    apptextinput: {// the settings of the text in the input
        backgroundColor: colors.white,
        marginTop: Platform.OS ==="android" ? 20 : 10 ,
        marginLeft: Platform.OS ==="android" ? -35 : -45 ,
        width: '80%',
        fontSize: 16,
        borderWidth: 1,
        borderColor: colors.black,
        padding: 10,
        borderRadius: 10,
    },
})
export default AppTextInput;