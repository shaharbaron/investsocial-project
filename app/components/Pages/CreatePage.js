import React, { useState } from "react";
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
import { submitNewPost } from "../../firebase";
import { getAuth } from 'firebase/auth';

function CreatePage() {
  const auth = getAuth();
  const current = auth.currentUser;
  //console.log ("Create - the current user is:" , current); // this 3 lines is to know who is the current
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); //

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
      //console.log("Create -  the result.uri is: ", result.uri);
      setImage(result.uri);
    }
  };

  const handlePostSubmit = async () => {
    // Pass the caption and image URI to the database Posts
    if (!caption.trim()) {
      alert("Please enter a caption before posting.");
      return;
    }
    setIsSubmitting(true);
    submitNewPost(current.email, caption, image);

    setIsSubmitting(false);
    setCaption("");
    setImage(null);
  };
  return (
    <View style={styles.container}>
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

export default CreatePage;
