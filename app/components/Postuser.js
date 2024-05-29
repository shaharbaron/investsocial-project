import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, Platform, Alert } from "react-native";
import moment from "moment";
import { getUserByEmail, deletePost } from "../firebase";
import { getAuth } from "firebase/auth";
import colors from "../config/colors";
import UserInfo from "./UserInfo";
import LikeButton from "./Icons/LikeButton";
import Feather from "@expo/vector-icons/Feather";
import { AntDesign } from "@expo/vector-icons";

moment.locale("en");

function Postuser({ email, time, title, image, navigation }) {
  // console.log("Postuser - the image is: ", image);
  // console.log("Postuser - the title is: ", title);
  // console.log("Postuser - the email is: ", email);

  const [userDetails, setUserDetails] = useState([]);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const getUserDetails = async () => {
      const userDet = await getUserByEmail(email);
      if (userDet) {
        setUserDetails(userDet);
      }
    };

    getUserDetails();
    console.log("Postuser - the userdetails is: ", userDetails);
  }, [email]);

  const handleDeletePost = async () => {
    // Show confirmation dialog to the user
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            // User confirmed deletion, call deletePost function from firebase.js
            await deletePost(time);
            // Refresh the posts after deletion (you can implement this based on your app's logic)
            // For example, you can navigate back to the previous screen or refresh the current screen
          },
        },
      ],
      { cancelable: false }
    );
  };

  const isCurrentUserPost = currentUser && currentUser.email === email;

  return (
    <View style={styles.post}>
      {userDetails && (
        <UserInfo
          imagepro={userDetails.profileImageUrl}
          username={userDetails.username}
          time={userDetails.time}
        />
      )}
      {isCurrentUserPost && (
        <View style={{ flexDirection: "row" }}>
          <AntDesign
            style={{ position: "absolute", right: 8, marginTop: -25 }}
            name="delete"
            size={24}
            color="black"
            onPress={handleDeletePost}
          />
          <Feather
            style={{ position: "absolute", right: 40, marginTop: -25 }}
            name="edit"
            size={24}
            color="black"
            onPress={() =>
              navigation.navigate("EditPostUser", {
                time: time,
                title: title,
                image: image,
              })
            }
          />
        </View>
      )}
      <Text style={styles.title}>{title}</Text>
      <Image style={styles.image} source={{ uri: image }} />
      {/* <LikeButton /> */}
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
