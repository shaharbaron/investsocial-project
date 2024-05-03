import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

function CameraButton(props) {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };
  
    const takePhoto = async () => {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.takephoto} onPress={takePhoto}>
                <Foundation name="camera" size={24} color= "gray" />
            </TouchableOpacity>
            <Image style={styles.profile} source={require("../assets/images/profile.png")}/>
            <TouchableOpacity style={styles.choosepicture} onPress={pickImage}>
                <MaterialIcons name="photo-library" size={24} color="gray" />
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
    );
}
const styles= StyleSheet.create({
    container: { 
        flexDirection: 'row',
    },
    profile: {
        width: 100,
        height: 100,
        resizeMode: 'stretch',
        borderRadius: 50,
    },
    choosepicture:{
        marginTop: 60,
    },
    takephoto:{
        marginTop: 60,
    },
});
export default CameraButton;