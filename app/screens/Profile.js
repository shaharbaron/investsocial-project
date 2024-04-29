import React from 'react';
import { StyleSheet, View, Text, Platform} from 'react-native';

import LogoUp from '../components/LogoUp';
import DownLine from '../components/DownLine';
function Profile(props) {
    return (
        <View style= {styles.container}>
            <LogoUp
            background={require("../assets/images/blackup.jpg")}
            logo= {require("../assets/images/logoup.png")} />
            <DownLine
            Home={"Home"}
            Create={"Create"}
            Explore={"Explore"}
            Profile={"Profile"}/>
        </View>  
    );
}

const styles= StyleSheet.create({
    container: { 
        flex: 1,
        alignItems: 'center',
    },
});

export default Profile;