import React from 'react';
import { StyleSheet, View, TouchableOpacity} from 'react-native';
import LogoUp from '../components/LogoUp';
// import DownLine from '../components/DownLine';
import AppButton from '../components/AppButton';
import { Feather } from '@expo/vector-icons';

function Profile({navigation}) {
    return (
        <View style= {styles.container}>
            <LogoUp/>
            <TouchableOpacity style={styles.setting} onPress={() => navigation.navigate('SettingPro')}>
            <Feather name="settings" size={24} color="black" />
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
    setting: {
        marginLeft: 340,
    },
    down: {
        marginTop: 590,
        flexDirection: 'row',
    },
});

export default Profile;