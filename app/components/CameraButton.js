import React from "react";
import { StyleSheet, View, Image } from "react-native";
import Takepicture from "./Icons/Takepicture";
import Selectimage from "./Icons/Selectimage";

function CameraButton({ onImageSelected, selectedImage }) {
  return (
    <View style={styles.container}>
      <Takepicture onImageSelected={onImageSelected} />
      <Image
        style={styles.profile}
        source={
          selectedImage
            ? { uri: selectedImage }
            : require("../assets/images/profile.png")
        }
      />
      <Selectimage onImageSelected={onImageSelected} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  profile: {
    width: 80,
    height: 80,
    resizeMode: "stretch",
    borderRadius: 50,
  },
});

export default CameraButton;

// import React from "react";
// import { StyleSheet, View, Image } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";

// function CameraButton({ onImageSelected, selectedImage }) {
//   const takePhotoFromCamera = async () => {
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== "granted") {
//       alert("Sorry, we need camera permissions to take a photo.");
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       onImageSelected(result.uri);
//     }
//   };

//   const selectImageFromGallery = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== "granted") {
//       alert("Sorry, we need permissions to access your photo library.");
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       onImageSelected(result.uri);
//     }
//   };
//   return (
//     <View style={styles.container}>
//       <Ionicons
//         style={{ marginTop: 50 }}
//         name="camera"
//         size={22}
//         color="black"
//         onPress={takePhotoFromCamera}
//       />
//       <Image
//         style={styles.profile}
//         source={
//           selectedImage
//             ? { uri: selectedImage }
//             : require("../assets/images/profile.png")
//         }
//       />
//       <Ionicons
//         style={{ marginTop: 50 }}
//         name="image"
//         size={22}
//         color="black"
//         onPress={selectImageFromGallery}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//   },
//   profile: {
//     width: 80,
//     height: 80,
//     resizeMode: "stretch",
//     borderRadius: 50,
//   },
// });

// export default CameraButton;
