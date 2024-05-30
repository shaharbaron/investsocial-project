import React from "react";
import { View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

function Takepicture({ onImageSelected }) {
  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      onImageSelected(selectedAsset.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons
        style={{ marginTop: 60 }}
        name="camera"
        size={22}
        color="black"
        onPress={takePhoto}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});

export default Takepicture;
