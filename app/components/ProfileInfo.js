import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import FastImage from "react-native-fast-image";

const ProfileInfo = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const firestore = getFirestore();
    const user = auth.currentUser;

    if (user) {
      const userId = user.uid;
      const userDocRef = doc(firestore, "users", userId);

      const unsubscribe = onSnapshot(
        userDocRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.data();
            setUserData(userData);
            console.log(userData);
            setLoading(false);
          } else {
            setError(new Error("User data not found"));
            setLoading(false);
          }
        },
        (error) => {
          setError(error);
          setLoading(false);
        }
      );
      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    // { uri: userData.profileImageUrl }
    <View style={styles.container}>
      {userData?.profileImageUrl ? (
        <Image
          style={styles.profile}
          source={require("../assets/images/profile1.jpg")}
        />
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
