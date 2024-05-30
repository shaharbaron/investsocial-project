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

function Postuser({ email, time, title, image, navigation, onDeletePost }) {
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
  }, [email]);

  const handleDeletePost = async () => {
    // Ask the user if he want delete the post
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
            onDeletePost(time); // Call the onDeletePost function with the deleted post's
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
      <Image
        style={{
          width: "100%",
          aspectRatio: 7 / 6,
          resizeMode: "stretch",
          borderRadius: 10,
        }}
        source={{ uri: image }}
      />
      <Text style={{ marginTop: 5 }}>{moment(time).fromNow()}</Text>
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
});
export default Postuser;
