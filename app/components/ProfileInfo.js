import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  FIREBASE_AUTH,
  FIRESTORE_DB,
  getCurrentUserProfileImage,
  getCurrentUserUsername,
} from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const ProfileInfo = () => {
  // the info in up of profile screen , the hello and profile picture
  const [Profilepic, setProfilepic] = useState(null);
  const [Username, setUsername] = useState("");
  const user = FIREBASE_AUTH.currentUser;

  const fetchProfileImage = async () => {
    // this call the function that get the profile picture
    if (user) {
      const profileImageURL = await getCurrentUserProfileImage();
      console.log("ProfileInfo - the profileimageUrl is : ", profileImageURL);
      if (profileImageURL) {
        setProfilepic(profileImageURL);
        console.log("Current user's profile image URL:", profileImageURL);
      } else {
        console.log("No profile image found for the current user");
        setProfilepic(null);
      }
    } else {
      setProfilepic(null);
    }
  };

  const fetchUsername = async (user) => {
    // this call the function that get the username
    if (user) {
      const Username = await getCurrentUserUsername();
      console.log("ProfileInfo - the username is : ", Username);
      if (Username) {
        setUsername(Username);
        console.log("Current user's username:", Username);
      } else {
        console.log("No username found for the current user");
        setUsername("");
      }
    } else {
      setUsername("");
    }
  };

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const userId = user.uid;
      const userDocRef = doc(FIRESTORE_DB, "users", userId);

      unsubscribe = onSnapshot(
        userDocRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.data();
            setUsername(userData.username);
          } else {
            console.log("User data not found");
            setUsername("");
          }
        },
        (error) => {
          console.error("Error getting user data:", error);
        }
      );
    } else {
      console.log("No user is currently signed in");
      setUsername("");
    }

    fetchProfileImage();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  fetchProfileImage();

  useFocusEffect(
    React.useCallback(() => {
      fetchProfileImage(); // call to fetch every time you enter the screen
    }, [])
  );

  return (
    <View style={styles.container}>
      <Image
        style={styles.profile}
        source={
          Profilepic
            ? { uri: Profilepic }
            : require("../assets/images/profile.png")
        }
      />
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
