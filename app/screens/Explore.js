import React, {useState} from "react";
import { StyleSheet, TouchableOpacity, View, Platform, FlatList} from "react-native";
import LogoUp from "../components/LogoUp";
import AppTextInput from "../components/AppTextInput";
import { AntDesign } from "@expo/vector-icons";
import Postuser from "../components/Postuser";
import colors from "../config/colors";

function Explore(props) {
  const [posts, setPosts] = useState([
    {
      id: 1,
      imagepro: require("../assets/images/profile1.jpg"),
      username: "EmraldWizard",
      time: "1h",
      image: require("../assets/images/BABAdaily.png"),
      title:
        "I think BABA stock will go up, look at its daily chart, it can now break the price it had as resistance and continue to climb upwards.",
    },
    {
      id: 2,
      imagepro: require("../assets/images/profile1.jpg"),
      username: "EmraldWizard",
      time: "4h",
      image: require("../assets/images/SOFIinfo.png"),
      title:
        "$1M YOLO into SoFi (Earnings are on Monday in the pre-market) - Position details in the comments",
    },
  ]);
  const renderPost = ({ item }) => (
    <Postuser
      imagepro={item.imagepro}
      username={item.username}
      time={item.time}
      image={item.image}
      title={item.title}
    />
  );
  return (
    <View style={styles.container}>
      <LogoUp />
      <View style={styles.space} />
      <AppTextInput placeholder={"Search username"} />
      <TouchableOpacity>
        <AntDesign
          style={styles.iconsearch}
          name="search1"
          size={24}
          color="black"
        />
      </TouchableOpacity>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()} // the id of each post
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  space: {
    marginTop: Platform.OS === "android" ? 0 : 8,
  },
  iconsearch: {
    backgroundColor: colors.white,
    marginTop: Platform.OS === "android" ? -37 : -34,
    marginLeft: Platform.OS === "android" ? 320 : 300,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.black,
  },
});

export default Explore;
