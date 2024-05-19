import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Platform,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import LogoUp from "../components/LogoUp";
import colors from "../config/colors";
import * as ImagePicker from "expo-image-picker";

function Create({ navigation }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCaptionChange = (text) => {
    setCaption(text);
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
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const handlePostSubmit = async () => {
    // Pass the caption and image URI to the Home screen
    if (!caption.trim()) {
      alert("Please enter a caption before posting.");
      return;
    }
    setIsSubmitting(true);
    const currentUser = {
      username: "John Doe",
      profileImage: require("../assets/images/profile1.jpg"),
    };

    await navigation.navigate("Home", { caption, image, currentUser });
    setIsSubmitting(false);
    setCaption("");
    setImage(null);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <LogoUp />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Create new post</Text>
        <Text style={styles.caption}>Caption</Text>
        <TextInput
          style={styles.input}
          value={caption}
          placeholder="Enter your post here"
          onChangeText={handleCaptionChange}
          multiline
        />
        <Text style={styles.addphoto}>Add photo</Text>
        <Text>SUPPORT THIS: SVG, PNG, JPG, GIF, JPEG TYPES </Text>
        <TouchableOpacity style={styles.button} onPress={handleImagePicker}>
          <Text style={styles.buttontext}>Upload</Text>
        </TouchableOpacity>
        {image && (
          <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={handlePostSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttontext}>Post</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
  },
  container: {
    flex: 1,
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

export default Create;
