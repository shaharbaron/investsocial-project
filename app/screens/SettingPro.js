import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Platform,
} from "react-native";
import LogoUp from "../components/LogoUp";
import colors from "../config/colors";
import AppTextInput from "../components/AppTextInput";
import {
  getCurrentUserProfileImage,
  getCurrentUserUsername,
  updateProfileImage,
  updateUsername,
  FIREBASE_AUTH,
} from "../firebase";
import Takepicture from "../components/Icons/Takepicture";
import Selectimage from "../components/Icons/Selectimage";

function SettingPro(props) {
  const [Profilepic, setProfilepic] = useState(null);
  const [Username, setUsername] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [newUsername, setNewUsername] = useState("");

  async function fetchProfileImage() {
    // this call the function that get the profile picture
    const profileImageURL = await getCurrentUserProfileImage();
    if (profileImageURL) {
      setProfilepic(profileImageURL);
      console.log("Current user's profile image URL:", profileImageURL);
    } else {
      console.log("No profile image found for the current user");
    }
  }

  fetchProfileImage();

  useEffect(() => {
    // this call the function that get the username.
    const fetchUsername = async () => {
      try {
        const username = await getCurrentUserUsername();
        console.log("Profileinfo - the username is: ", username);
        setUsername(username);
      } catch (error) {
        console.log("Error");
      }
    };

    fetchUsername();
  }, []);

  const onImageSelected = (imageUri) => {
    setNewImage(imageUri);
  };

  const onSaveButtonPress = async () => {
    // save all the new info in the DB
    const user = FIREBASE_AUTH.currentUser;
    const userId = user.uid;
    console.log("SettingPro - the profilepic is :", Profilepic);
    console.log("SettingPro - the Username is :", Username);
    console.log("SettingPro - the newImage is :", newImage);
    console.log("SettingPro - the newUsername is :", newUsername);
    console.log("SettingPro - the userId is : ", userId);
    try {
      if (newImage) {
        // Update the profile picture in the database
        const newLink = await updateProfileImage(userId, newImage);
        setProfilepic(newLink);
        setNewImage(null);
      }

      if (newUsername.trim() !== "") {
        // Update the username in the database
        await updateUsername(userId, newUsername.trim());
        setUsername(newUsername.trim());
        setNewUsername("");
      }

      // Navigate back to the Profile screen
      props.navigation.goBack();
    } catch (error) {
      console.log("Error updating profile:", error);
    }
  };

  return (
    <View style={styles.container}>
      <LogoUp />
      <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 30 }}>
        <Text style={{ fontSize: 25, marginRight: 160 }}>Profile picture</Text>
        <Text style={{ fontSize: 25, color: colors.blue }}>edit</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Takepicture onImageSelected={onImageSelected} />
        <Image
          style={styles.profile}
          source={
            newImage
              ? { uri: newImage }
              : Profilepic
              ? { uri: Profilepic }
              : require("../assets/images/profile.png")
          }
        />
        <Selectimage onImageSelected={onImageSelected} />
      </View>
      <View style={{ flexDirection: "row", marginTop: 40, marginBottom: 30 }}>
        <Text style={{ fontSize: 25, marginRight: 195 }}>Username</Text>
        <Text style={{ fontSize: 25, color: colors.blue }}>edit</Text>
      </View>
      <Text style={styles.username}>Your current username is: {Username} </Text>
      <AppTextInput
        placeholder={"Change username"}
        value={newUsername}
        onChangeText={(text) => setNewUsername(text)}
      />
      <TouchableOpacity style={styles.savebutton} onPress={onSaveButtonPress}>
        <Text style={{ fontSize: 15 }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  profile: {
    // profile picture
    width: 80,
    height: 80,
    resizeMode: "stretch",
    borderRadius: 50,
  },
  savebutton: {
    // save button
    backgroundColor: colors.lightgray,
    marginTop: 50,
    height: Platform.OS === "android" ? 44 : 40,
    width: 55,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },
  username: {
    fontSize: 18,
    fontWeight: "500",
    marginRight: 59,
    marginBottom: 10,
  },
  icon: {
    marginTop: 60,
  },
});

export default SettingPro;
