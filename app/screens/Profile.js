import React, {useState} from "react";
import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import LogoUp from "../components/LogoUp";
import { Feather } from "@expo/vector-icons";
import Postuser from "../components/Postuser";
import ProfileInfo from "../components/ProfileInfo";

function Profile({ navigation }) {
  const [posts, setPosts] = useState([
    {
      id: 1,
      imagepro: require("../assets/images/profile2.jpg"),
      username: "Shaharb",
      time: "1h",
      image: require("../assets/images/BABAdaily.png"),
      title:
        "I think BABA stock will go up, look at its daily chart, it can now break the price it had as resistance and continue to climb upwards.",
    },
    {
      id: 2,
      imagepro: require("../assets/images/profile2.jpg"),
      username: "Shaharb",
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
      <View style={{ flexDirection: "row", marginTop: 5 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Feather name="log-out" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.setting}
          onPress={() => navigation.navigate("SettingPro")}
        >
          <Feather name="settings" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ProfileInfo />
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
  setting: {
    marginLeft: 300,
  },
});

export default Profile;
