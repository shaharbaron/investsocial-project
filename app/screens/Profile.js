import React from 'react';
import { StyleSheet, View} from 'react-native';
import LogoUp from '../components/LogoUp';
// import DownLine from '../components/DownLine';
import AppButton from '../components/AppButton';
import LikeButton from '../components/LikeButton';

function Profile({navigation, onPress}) {
    return (
        <View style= {styles.container}>
            <LogoUp/>
            {/* <DownLine/> */}
            <View style={styles.down}>
            <AppButton title="Home    " onPress={() => navigation.navigate('Home')}></AppButton>
            <AppButton title="Create    " onPress={() => navigation.navigate('Create')}></AppButton>
            <AppButton title="Explore    " onPress={() => navigation.navigate('Explore')}></AppButton>
            <AppButton title="Profile    " onPress={() => navigation.navigate('Profile')}></AppButton>
            </View>
        </View>  
    );
    // }
}

const styles= StyleSheet.create({
    container: { 
        flex: 1,
        alignItems: 'center',
    },
    down: {
        marginTop: 590,
        flexDirection: 'row',
    },
    apptextinput: {

    },
});

export default Profile;