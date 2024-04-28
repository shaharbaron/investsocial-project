import React from 'react';
import { StyleSheet, Image , SafeAreaView, Text, Platform, ImageBackground} from 'react-native';
// import Userpro from '../components/Userpro';

function Home(props) {
    return (
        <SafeAreaView style= {styles.container}>
            <Image style={styles.blackup} source={require("../assets/images/blackup.jpg")}/>
            <Image style={styles.logoup} source={require("../assets/images/logoup.png")}/>
            {/* <Userpro
                image = {require('../assets/images/profile1.jpg')}
                title = {"sh"}
            /> */}
            {/* <View style={styles.detailContainer}> 
            <Image style={styles.profilepicture} source={require("../assets/images/blackup.jpg")} />
            </View> */}
            {/* <Post style={styles.post}
            image= {require('../assets/images/BABAdaily.png')}
            title= "shahar" /> */}
            <Image style={styles.profile1} source={require('../assets/images/profile1.jpg')}></Image>
            <Text style={styles.user}> Shahar Baron</Text>
            <Text style={styles.text}>I think BABA stock will go up, look at its daily chart, it can now break the price it had as resistance and continue to climb upwards.</Text>
            <Image style={styles.image} source={require('../assets/images/BABAdaily.png')} />
            <Text style={styles.textbottom}>Home
            <Text style={styles.textbottom}>  Explore
            <Text style={styles.textbottom}>  Create
            <Text style={styles.textbottom}>  Profile
            </Text></Text></Text></Text>
        </SafeAreaView>  
    );
}

const styles= StyleSheet.create({
    container: { 
        flex: 1,
        alignItems: 'center',
    },
    blackup: {// the black background upside
        flexBasis: 100,
        height: 120,
        position: "absolute",
    },
    logoup: {// the logo - investsocial
        marginTop: Platform.OS ==="android" ? 30 : -5 ,
        flexBasis:65,
        width: '90%',
        resizeMode: 'stretch',
    },
    // post: {
    //     width: '70%',
    //     resizeMode: 'contain',
    // },
    profile1: {
        marginTop: 40,
        resizeMode: 'contain',
        width: '30%',
        height: 30,
        marginLeft: -310,
    },
    user: { 
        marginTop: -25,
        marginLeft: -170,
        fontWeight: 'bold',
        fontSize: 15,

    },
    text: { // the text the user write in the post
        marginTop: 30,
        width: '90%',
        fontSize: 15,
    },
    image: { // the photo the uder add to the post
        resizeMode: 'contain',
        width: '90%',
        height: 150,
    },
    textbottom: {// the texts down
        marginTop: Platform.OS ==="android" ? 280 : 310 ,
        fontSize: 25,
        fontWeight: 'bold',
    },
});
export default Home;