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
} from "../firebase";

function SettingPro({ navigation }) {
  const [Profilepic, setProfilepic] = useState(null);
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

  const [Username, setUsername] = useState(null);
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

  return (
    <View style={styles.container}>
      <LogoUp />
      <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 30 }}>
        
        <Text style={{ fontSize: 25, marginRight: 160 }}>Profile picture</Text>
        <TouchableOpacity style={styles.edit}>
          <Text style={{ fontSize: 25, color: colors.blue }}>edit</Text>
        </TouchableOpacity>
      </View>
      <Image
        style={styles.profile}
        source={
          Profilepic
            ? { uri: Profilepic }
            : require("../assets/images/profile.png")
        }
      />
      <View style={{ flexDirection: "row", marginTop: 40, marginBottom: 30 }}>
        <Text style={{ fontSize: 25, marginRight: 195 }}>Username</Text>
        <TouchableOpacity style={styles.edit}>
          <Text style={{ fontSize: 25, color: colors.blue }}>edit</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.username}>Your current username is: {Username} </Text>
      <AppTextInput placeholder={"Change username"} />
      <TouchableOpacity style={styles.savebutton}>
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
});

export default SettingPro;
