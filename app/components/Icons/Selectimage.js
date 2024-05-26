import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

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
      <TouchableOpacity style={styles.icon} onPress={pickImage}>
        <MaterialIcons name="photo-library" size={20} color="gray" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  icon: {
    marginTop: 60,
  },
});

export default Selectimage;
