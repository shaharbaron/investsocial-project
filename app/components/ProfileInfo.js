import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  getCurrentUserUsername,
  getCurrentUserProfileImage,
} from "../firebase";

const ProfileInfo = () => {
  // the info in up of profile screen , the hello and profile picture

  const [Profilepic, setProfilepic] = useState(null);
  async function fetchProfileImage() {
    // this call the function that get the profile picture
    const profileImageURL = await getCurrentUserProfileImage();
    console.log("ProfileInfo1 - the profileimageUrl is : ", profileImageURL);
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
      {Profilepic ? (
        <Image style={styles.profile} source={{ uri: Profilepic }} />
      ) : (
        <Image
          style={styles.profile}
          source={
            "https://firebasestorage.googleapis.com/v0/b/invest-social-c2ad4.appspot.com/o/profile-images%2Fprofile.png?alt=media&token=0071e735-25e1-4c7f-a6f0-9d9e73391bad"
          }
        />
      )}
      {/* <Image source = {{"https://firebasestorage.googleapis.com/v0/b/invest-social-c2ad4.appspot.com/o/profile-images%2Fprofile.png?alt=media&token=0071e735-25e1-4c7f-a6f0-9d9e73391bad" || "https://firebasestorage.googleapis.com/v0/b/invest-social-c2ad4.appspot.com/o/profile-images%2Fprofile2.jpg?alt=media&token=eafa9a00-78c6-4777-b7e5-b78a20bb68c8"}} /> */}
      <Text style={styles.username}>Hello {Username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: -27,
  },
  profile: {
    width: 40,
    height: 40,
    resizeMode: "stretch",
    borderRadius: 50,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
});

export default ProfileInfo;
