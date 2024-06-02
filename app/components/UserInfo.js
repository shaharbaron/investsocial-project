import React, { useEffect } from "react";
import { StyleSheet, View, Image, Text } from "react-native";

function UserInfo({ imagepro, username, time, navigation }) {
  // profile picture, username , time of the post
  useEffect(() => {}, [imagepro]);

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
    // what time the user upload the post
    fontSize: 13,
    marginTop: 7,
    marginLeft: 5,
  },
});
export default UserInfo;
