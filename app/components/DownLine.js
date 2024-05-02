import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import AppButton from '../components/AppButton';

function DownLine({navigation}) {
    return (
        <View style={styles.container}>
            <AppButton title="Home    " onPress={() => navigation.navigate('Home')}></AppButton>
            <AppButton title="Create    " onPress={() => navigation.navigate('Create')}></AppButton>
            <AppButton title="Explore    " onPress={() => navigation.navigate('Explore')}></AppButton>
            <AppButton title="Profile    " onPress={() => navigation.navigate('Profile')}></AppButton>
        </View>
    );
}
const styles= StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
});

export default DownLine;