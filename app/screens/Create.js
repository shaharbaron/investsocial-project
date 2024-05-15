import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import LogoUp from "../components/LogoUp";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import * as ImagePicker from "expo-image-picker";

function Create({ navigation }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

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

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handlePostSubmit = () => {
    // Handle post submission logic here
    console.log("Caption:", caption);
    console.log("Image URI:", image);
  };
  return (
    <View style={styles.container}>
      <LogoUp />
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
      <Text style={styles.upload}>
        SUPPORT THIS: SVG, PNG, JPG, GIF, JPEG TYPES{" "}
      </Text>
      <TouchableOpacity style={styles.uploadbutton} onPress={handleImagePicker}>
        <Text style={styles.buttonpost}>Upload</Text>
      </TouchableOpacity>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <TouchableOpacity style={styles.postbutton} onPress={handlePostSubmit}>
        <Text style={styles.buttonpost}>Post</Text>
      </TouchableOpacity>
      {/* <DownLine/> */}
      <View style={styles.down}>
        <AppButton
          title="Home    "
          onPress={() => navigation.navigate("Home")}
        />
        <AppButton
          title="Create    "
          onPress={() => navigation.navigate("Create")}
        />
        <AppButton
          title="Explore    "
          onPress={() => navigation.navigate("Explore")}
        />
        <AppButton
          title="Profile    "
          onPress={() => navigation.navigate("Profile")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  down: {
    // the down line on the screen
    marginTop: 25,
    flexDirection: "row",
  },
  title: {
    // create new post
    fontSize: 30,
    fontWeight: "600",
    marginTop: 50,
    marginLeft: -120,
  },
  input: {
    // all the text input
    backgroundColor: colors.white,
    marginLeft: -42,
    height: 120,
    width: 300,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },
  caption: {
    // the caption text
    marginTop: 50,
    marginLeft: -255,
    fontWeight: "500",
    fontSize: 25,
    marginBottom: 10,
  },
  addphoto: {
    // add photo
    marginTop: 20,
    marginLeft: -225,
    fontWeight: "500",
    fontSize: 25,
    marginBottom: 10,
  },
  postbutton: {
    // button post
    backgroundColor: colors.lightgray,
    marginTop: 50,
    height: Platform.OS === "android" ? 44 : 40,
    width: 55,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },
  uploadbutton: {
    // button post
    backgroundColor: colors.lightgray,
    marginTop: 10,
    height: Platform.OS === "android" ? 44 : 40,
    width: 75,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },
  buttonpost: {
    // text post on button
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
});

export default Create;
