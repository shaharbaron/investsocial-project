import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, Image, StyleSheet } from "react-native";
import { getCurrentUserProfileImage } from "../firebase";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const ProfileInfo = () => {
  // the info in up of profile screen , the hello and profile picture
  const [Profilepic, setProfilepic] = useState(null);
  const [Username, setUsername] = useState("");

  const fetchProfileImage = async () => {
    console.log("aaa");
    // this call the function that get the profile picture
    const profileImageURL = await getCurrentUserProfileImage();
    console.log("ProfileInfo1 - the profileimageUrl is : ", profileImageURL);
    if (profileImageURL) {
      setProfilepic(profileImageURL);
      console.log("Current user's profile image URL:", profileImageURL);
    } else {
      console.log("No profile image found for the current user");
    }
  };

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const firestore = getFirestore();
      const userId = user.uid;
      const userDocRef = doc(firestore, "users", userId);

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
