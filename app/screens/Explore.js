import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import LogoUp from '../components/LogoUp';
// import DownLine from '../components/DownLine';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import { AntDesign } from '@expo/vector-icons';
import colors from '../config/colors';

function Explore({navigation}) {
    return (
        <View style= {styles.container}>
            <LogoUp/>
            <View style={styles.space}/>
            <AppTextInput placeholder={"Search username"}/>
            <TouchableOpacity>
            <AntDesign style={styles.iconsearch} name="search1" size={24} color="black" />
            </TouchableOpacity>
            {/* <DownLine/> */}
            <View style={styles.down}>
            <AppButton title="Home    " onPress={() => navigation.navigate('Home')}/>
            <AppButton title="Create    " onPress={() => navigation.navigate('Create')}/>
            <AppButton title="Explore    " onPress={() => navigation.navigate('Explore')}/>
            <AppButton title="Profile    " onPress={() => navigation.navigate('Profile')}/>
            </View>
        </View>  
    );
}

const styles= StyleSheet.create({
    container: { 
        flex: 1,
        alignItems: 'center',
    },
    down: {
        marginTop: 500,
        flexDirection: 'row',
    },
    space:{
        marginTop: 40,
    },
    iconsearch: {
        backgroundColor: colors.white,
        marginTop: -34,
        marginLeft: 300,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: colors.black,
    },
});

export default Explore;