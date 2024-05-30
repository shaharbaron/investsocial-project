import React from "react";
import { View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

function Selectimage({ onImageSelected }) {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
    <View>
      <Ionicons
        style={{ marginTop: 60 }}
        name="image"
        size={22}
        color="black"
        onPress={pickImage}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});

export default Selectimage;
