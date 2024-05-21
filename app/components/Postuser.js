import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, Platform } from "react-native";
import { getUserByEmail } from "../firebase";

import colors from "../config/colors";
import UserInfo from "./UserInfo";
import LikeButton from "./LikeButton";

function Postuser({ email, time, title, image }) {
  console.log("Postuser - the image is: ", image);
  const [userDetails, setUserDetails] = useState([]);

  const getUserDetails = async () => {
    const userDet = await getUserByEmail(email);
    //console.log("Postuser -  the email is:", email);
    //console.log("Postuser -  the userDet is:", userDet);
    if (userDet) setUserDetails((userDetails) => userDet);
  };

  useEffect(() => {
    getUserDetails();
  }, [email]);

  useEffect(() => {
    //console.log("Postuser - in useeffect 2 user details is: ", userDetails);
  }, [userDetails]);

  return (
    <View style={styles.post}>
      <UserInfo
        style={styles.userinfo}
        imagepro={userDetails.profileImageUrl}
        username={userDetails.username}
        time={time}
      />
      <Text style={styles.title}>{title}</Text>
      <Image style={styles.image} source={{ uri: image }} />
      <LikeButton />
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    // the template of the post
    borderRadius: 15,
    borderWidth: 0.7,
    borderColor: colors.gray,
    backgroundColor: colors.white,
    padding: 6,
    marginTop: Platform.OS === "android" ? 30 : 10,
    overflow: "hidden",
  },
  title: {
    // the post the user write
    marginTop: 5,
    marginBottom: 7,
  },
  image: {
    // the image the user add to the post
    width: "100%",
    height: 150,
    resizeMode: "stretch",
    borderRadius: 10,
  },
});
export default Postuser;
