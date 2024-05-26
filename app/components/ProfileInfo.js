import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { getCurrentUserProfileImage } from "../firebase";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const ProfileInfo = () => {
  // the info in up of profile screen , the hello and profile picture
  const [Profilepic, setProfilepic] = useState(null);
  const [Username, setUsername] = useState("");

  useEffect(() => {
    const fetchProfileImage = async () => {
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
