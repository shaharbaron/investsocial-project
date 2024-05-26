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
