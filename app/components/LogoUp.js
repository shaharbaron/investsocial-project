import React from 'react';
import {StyleSheet, View, Image, Platform} from 'react-native';

function LogoUp(props) {
    return (
        <View>
            <Image style={styles.background} source={require("../assets/images/blackup.jpg")}/>
            <Image style={styles.logo} source={require("../assets/images/logoup.png")}/>
        </View>
    );
}
const styles = StyleSheet.create({
    background: {
        marginLeft: -20,
        width: 600,
        flexBasis: 100,
        height: Platform.OS ==="android" ? 100 : 120,
    },
    logo: {
        marginTop: Platform.OS ==="android" ? 25 : -65 ,
        marginLeft: 110,
        flexBasis:65,
        width: 350,
    },
})
export default LogoUp;