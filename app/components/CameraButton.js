// import React, { useState, useEffect } from "react";
// import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { MaterialIcons } from "@expo/vector-icons";
// import { Foundation } from "@expo/vector-icons";

// function CameraButton(props) {
//   const [image, setImage] = useState(null);
//   const [isImageSet, setIsImageSet] = useState(false);

//   useEffect(() => {
//     // if the user chose photo(show her photo) or show the defaultphoto
//     if (image) {
//       setIsImageSet(true);
//     }
//   }, [image]);

//   const pickImage = async () => {
//     // the code to choose a photo from phone
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) { // check if result is false
//       setImage(result.uri);
//     }
//   };

//   const takePhoto = async () => {
//     // take photo
//     let result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.uri);
//     }
//   };
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.takephoto} onPress={takePhoto}>
//         <Foundation name="camera" size={20} color="gray" />
//       </TouchableOpacity>
//       <Image
//         style={styles.profile}
//         source={
//           isImageSet ? { uri: image } : require("../assets/images/profile.png")
//         }
//       />
//       <TouchableOpacity style={styles.choosepicture} onPress={pickImage}>
//         <MaterialIcons name="photo-library" size={20} color="gray" />
//       </TouchableOpacity>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//   },
//   profile: {
//     width: 70,
//     height: 70,
//     resizeMode: "stretch",
//     borderRadius: 50,
//   },
//   choosepicture: {
//     marginTop: 40,
//   },
//   takephoto: {
//     marginTop: 40,
//   },
// });
// export default CameraButton;

import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";

function CameraButton({ onImageSelected, selectedImage }) {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onImageSelected(result.uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onImageSelected(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.takephoto} onPress={takePhoto}>
        <Foundation name="camera" size={20} color="gray" />
      </TouchableOpacity>
      <Image
        style={styles.profile}
        source={selectedImage ? { uri: selectedImage } : require("../assets/images/profile.png")}
      />
      <TouchableOpacity style={styles.choosepicture} onPress={pickImage}>
        <MaterialIcons name="photo-library" size={20} color="gray" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  profile: {
    width: 70,
    height: 70,
    resizeMode: "stretch",
    borderRadius: 50,
  },
  choosepicture: {
    marginTop: 40,
  },
  takephoto: {
    marginTop: 40,
  },
});

export default CameraButton;