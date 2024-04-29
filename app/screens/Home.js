import React from 'react';
import {StyleSheet, View, Text, Platform} from 'react-native';
import Postuser from "../components/Postuser";
import LogoUp from '../components/LogoUp';
import DownLine from '../components/DownLine';

function Home(props) {
    return (
        <View style= {styles.container}>
            <LogoUp
            background={require("../assets/images/blackup.jpg")}
            logo= {require("../assets/images/logoup.png")} />
            <View>
                <Postuser style={styles.post}
                imagepro= {require('../assets/images/profile1.jpg')}
                username= {"Shahar Baron"}
                time= {"1h"}
                image= {require('../assets/images/BABAdaily.png')}
                title= {"I think BABA stock will go up, look at its daily chart, it can now break the price it had as resistance and continue to climb upwards."} />
                <Postuser style={styles.post}
                imagepro= {require('../assets/images/profile2.jpg')}
                username= {"EmraldWizard"}
                time= {"4h"}
                image= {require('../assets/images/SOFIinfo.png')}
                title= {"$1M YOLO into SoFi (Earnings are on Monday in the pre-market) - Position details in the comments"} />
            </View>
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
    post: {
        width: '10%',
        resizeMode: 'contain',
    },
});
export default Home;