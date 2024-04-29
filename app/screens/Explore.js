import React from 'react';
import { StyleSheet, View, TextInput} from 'react-native';
import LogoUp from '../components/LogoUp';
import DownLine from '../components/DownLine';
import AppText from '../components/AppText';

function Explore(props) {
    return (
        <View style= {styles.container}>
            <LogoUp
            background={require("../assets/images/blackup.jpg")}
            logo= {require("../assets/images/logoup.png")} />
            <AppText
            apptext = {"Search UserName"} />
            <TextInput style={styles.inputuser}>
            </TextInput>
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
    inputuser: {// the search input 
        marginTop: 10,
        height: 40,
        width: 300,
        borderWidth: 1,
        borderRadius:10,
    },
});

export default Explore;