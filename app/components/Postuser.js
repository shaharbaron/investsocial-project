import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, Platform, onPress } from "react-native";
import moment from "moment";
import { getUserByEmail } from "../firebase";
import { getAuth } from "firebase/auth";
import colors from "../config/colors";
import UserInfo from "./UserInfo";
import LikeButton from "./Icons/LikeButton";
import Feather from "@expo/vector-icons/Feather";
import { AntDesign } from "@expo/vector-icons";

moment.locale("en");

function Postuser({ email, createdAt, title, image, navigation }) {
  // console.log("Postuser - the image is: ", image);
  // console.log("Postuser - the title is: ", title);
  // console.log("Postuser - the email is: ", email);

  const [userDetails, setUserDetails] = useState([]);
  const [timeFromNow, setTimeFromNow] = useState("");
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

    const updateTime = () => {
      const timeFromNowUpdate = moment(createdAt).calendar(null, {
        sameDay: "[Today]",
        nextDay: "[Tomorrow]",
        nextWeek: "dddd",
        lastDay: "[Yesterday]",
        lastWeek: "[Last] dddd",
        sameElse: "DD/MM/YYYY",
      });
      setTimeFromNow(timeFromNowUpdate);
    };

    updateTime(); // Update immediately
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, [email, createdAt]);

  const isCurrentUserPost = currentUser && currentUser.email === email;

  return (
    <View style={styles.post}>
      {userDetails && (
        <UserInfo
          style={styles.userinfo}
          imagepro={userDetails.profileImageUrl}
          username={userDetails.username}
          time={timeFromNow}
        />
      )}
      {isCurrentUserPost && (
        <View style={{ flexDirection: "row" }}>
          <AntDesign
            style={{ position: "absolute", right: 8, marginTop: -25 }}
            name="delete"
            size={24}
            color="black"
            onPress={onPress}
          />
          <Feather
            style={{ position: "absolute", right: 40, marginTop: -25 }}
            name="edit"
            size={24}
            color="black"
            onPress={() =>
              navigation.navigate("EditPostUser", {
                email: email,
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
