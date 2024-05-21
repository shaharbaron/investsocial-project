import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const ProfileInfo = () => {
  // the info in up of profile screen , the hello and profile picture
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const firestore = getFirestore();
      const userId = user.uid;
      const userDocRef = doc(firestore, "users", userId);

      const unsubscribe = onSnapshot(
        userDocRef,
        async (snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.data();
            setUserData(userData);
          } else {
            setError(new Error("User data not found"));
          }
        },
        (error) => {
          setError(error);
        }
      );
      return () => unsubscribe();
    }
  }, []);

  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    async (snapshot) => {
      try {
        const storage = getStorage();
        const imageRef = ref(storage, userData.profileImageUrl);
        const url = await getDownloadURL(imageRef);
        console.log("Profileinfo: the url is", url);
        setImageUrl(url);
      } catch (error) {
        console.log("Error getting image URL:", error);
      }
    },
      (error) => {
        setError(error);
      };
  }, []);

  return (
    <View style={styles.container}>
      {imageUrl ? (
        <Image style={styles.profile} source={{ uri: imageUrl }} />
      ) : (
        <Image
          style={styles.profile}
          source={require("../assets/images/profile.png")}
        />
      )}
      <Text style={styles.username}>Hello {userData?.username}</Text>
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
