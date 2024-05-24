import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  FlatList,
} from "react-native";
import LogoUp from "../components/LogoUp";
import AppTextInput from "../components/AppTextInput";
import { AntDesign } from "@expo/vector-icons";
import Postuser from "../components/Postuser";
import colors from "../config/colors";
import { getPostsByEmail, getEmailByUsername } from "../firebase";

function Explore(props) {
  // all goes to database /posts
  const [posts, setPosts] = useState([]);
  const [searchUsername, setSearchUsername] = useState("");

  const handleSearch = async () => {
    console.log(
      "Explore - the username that the user search is:",
      searchUsername
    );
    const email = await getEmailByUsername(searchUsername);
    console.log("Explore - the email is: ", email);
    if (email) {
      const searchResults = await getPostsByEmail(email.toLowerCase());
      setPosts(searchResults);
    } else {
      setPosts([]);
    }
  };

  const handleUsernameChange = (text) => {
    setSearchUsername(text);
    if (text === "") {
      setPosts([]);
    }
  };

  const renderPost = ({ item }) => (
    <Postuser
      email={item.email}
      time={item.time}
      title={item.title}
      image={item.imageURL}
    />
  );
  return (
    <View style={styles.container}>
      <LogoUp />
      <View style={styles.space} />
      <AppTextInput
        placeholder={"Search username"}
        onChangeText={handleUsernameChange}
        value={searchUsername}
      />
      <TouchableOpacity onPress={handleSearch}>
        <AntDesign
          style={styles.iconsearch}
          name="search1"
          size={24}
          color="black"
        />
      </TouchableOpacity>
      {posts.length ? (
        <FlatList
          style={{ width: 350 }}
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item, index) => index} // the id of each post
        />
      ) : null}
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
