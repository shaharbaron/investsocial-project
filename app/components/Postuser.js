import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, Platform } from "react-native";
import moment from "moment";
import { getUserByEmail } from "../firebase";
import colors from "../config/colors";
import UserInfo from "./UserInfo";
import LikeButton from "./Icons/LikeButton";

moment.locale("en");

function Postuser({ email, createdAt, title, image }) {
  // console.log("Postuser - the image is: ", image);
  // console.log("Postuser - the title is: ", title);
  // console.log("Postuser - the email is: ", email);

  const [userDetails, setUserDetails] = useState([]);
  const [timeFromNow, setTimeFromNow] = useState("");

  useEffect(() => {
    const getUserDetails = async () => {
      const userDet = await getUserByEmail(email);
      if (userDet) {
        setUserDetails(userDet);
        console.log("Postuser - the userdetails is :", userDetails);
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

  return (
    <View style={styles.post}>
      {userDetails && (
        <UserInfo
          imagepro={userDetails.profileImageUrl}
          username={userDetails.username}
          time={timeFromNow}
        />
      )}
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
