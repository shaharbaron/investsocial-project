import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Postuser from "../components/Postuser";
import LogoUp from '../components/LogoUp';
// import DownLine from '../components/DownLine';
import AppButton from '../components/AppButton';

function Home({ navigation }) {
    const posts = [
        {
            id: 1,
            imagepro: require('../assets/images/profile1.jpg'),
            username: "Shahar Baron",
            time: "1h",
            image: require('../assets/images/BABAdaily.png'),
            title: "I think BABA stock will go up, look at its daily chart, it can now break the price it had as resistance and continue to climb upwards."
        },
        {
            id: 2,
            imagepro: require('../assets/images/profile2.jpg'),
            username: "EmraldWizard",
            time: "4h",
            image: require('../assets/images/SOFIinfo.png'),
            title: "$1M YOLO into SoFi (Earnings are on Monday in the pre-market) - Position details in the comments"
        },
        {
            id: 3,
            imagepro: require('../assets/images/profile3.jpg'),
            username: "RaalaBabinian",
            time: "7h",
            image: require('../assets/images/applinfo.png'),
            title: "Bought some apple calls before closing"
        }
    ];
    const renderPost = ({ item }) => (
        <Postuser
            imagepro={item.imagepro}
            username={item.username}
            time={item.time}
            image={item.image}
            title={item.title}
        />
    );

    return (
        <View style={styles.container}>
            <LogoUp />
            <FlatList
                data={posts}
                renderItem={renderPost}
                keyExtractor={(item) => item.id.toString()} // the id of each post
            />
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
        marginTop: 20,
        flexDirection: 'row',
    },
});
export default Home;