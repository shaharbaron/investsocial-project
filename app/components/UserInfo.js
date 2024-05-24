import React, { useEffect } from "react";
import { StyleSheet, View, Image, Text } from "react-native";

function UserInfo({ imagepro, username, time }) {
  // profile picture, username , time of the post
  useEffect(() => {
    console.log("Userinfo - imagepro", imagepro);
    console.log("Userinfo - username", username);
    console.log("Userinfo - time", time);
  }, [imagepro]);

  return (
    <View style={{ flexDirection: "row" }}>
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
    borderRadius: 20,
  },
  username: {
    // the name of the user
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 4,
    marginLeft: 5,
  },
  time: {
    // what time ho upload the post
    fontSize: 13,
    marginLeft: 5,
    marginTop: 7,
  },
});
export default UserInfo;
