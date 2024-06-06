import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Platform,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  View,
} from "react-native";
import colors from "../../config/colors";
import * as ImagePicker from "expo-image-picker";
import { updatePost } from "../../firebase";

function EditPostPage({ postId, initialTitle, initialImage, navigation }) {
  console.log("EditPostPage - the postId is :", postId);
  console.log("EditPostPage - the title is :", initialTitle);
  console.log("EditPostPage - the image is :", initialImage);
  const [newCaption, setnewCaption] = useState(initialTitle);
  const [newImage, setnewImage] = useState(initialImage);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCaptionChange = (text) => {
    setnewCaption(text);
  };

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(
        "EditPostPage - the result.assets[0].uri is: ",
        result.assets[0].uri
      );
      setnewImage(result.assets[0].uri);
    }
  };

  const handleSaveSubmit = async () => {
    // Check if the user enter caption
    if (!newCaption.trim()) {
      alert("Please enter a caption before posting.");
      return;
    }
    console.log("1");
    setIsSubmitting(true);
    console.log("EditPostPage2 - the newImage is: ", newImage);
    updatePost(postId, newCaption, newImage);
    setIsSubmitting(false);
    navigation.goBack(); // Navigate back to the Home screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update your post</Text>
      <Text style={styles.caption}>Caption</Text>
      <TextInput
        style={styles.input}
        value={newCaption}
        onChangeText={handleCaptionChange}
        multiline
      />
      <Text style={styles.addphoto}>Change photo</Text>
      <Text>SUPPORT THIS: SVG, PNG, JPG, GIF, JPEG TYPES </Text>
      <TouchableOpacity style={styles.button} onPress={handleImagePicker}>
        <Text style={styles.buttontext}>Upload</Text>
      </TouchableOpacity>
      {newImage && (
        <Image
          source={{ uri: newImage }}
          style={{
            marginTop: 10,
            borderRadius: 10,
            width: "90%",
            aspectRatio: 1,
          }}
        />
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSaveSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttontext}>Save</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  title: {
    // create new post
    fontSize: 30,
    fontWeight: "600",
    marginTop: 50,
  },
  input: {
    // the text input
    backgroundColor: colors.white,
    height: 120,
    width: 300,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },
  caption: {
    // the caption text
    marginTop: 50,
    fontWeight: "500",
    fontSize: 25,
    marginBottom: 10,
  },
  addphoto: {
    // add photo
    marginTop: 20,
    fontWeight: "500",
    fontSize: 25,
    marginBottom: 10,
  },
  button: {
    // the button of upload/post
    backgroundColor: colors.lightgray,
    marginTop: 10,
    marginleft: -100,
    height: Platform.OS === "android" ? 44 : 40,
    width: 75,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },
  buttontext: {
    // text on button
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
});

export default EditPostPage;
