import React, { useEffect } from "react";
import { StyleSheet, View, Platform, Image, Text } from "react-native";

function UserInfo({ imagepro, username, time }) {
  // profile picture, username , time of the post
  useEffect(() => {
    // console.log("Userinfo - imagepro", imagepro);
    // console.log("Userinfo - username", username);
    // console.log("Userinfo - time", time);
  }, [imagepro]);

  return (
    <View>
      <Image style={styles.imagepro} source={{ uri: imagepro }} />
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  imagepro: {
    // the profile picture of the user
    width: "8%",
    height: 25,
    resizeMode: "stretch",
    borderRadius: 20,
  },
  username: {
    // the name of the user
    fontSize: 17,
    fontWeight: "bold",
    marginTop: -20,
    marginLeft: 30,
  },
  time: {
    // what time ho upload the post
    fontSize: 15,
    marginTop: Platform.OS === "android" ? -21 : -18,
    marginLeft: Platform.OS === "android" ? 140 : 145,
  },
});
export default UserInfo;
