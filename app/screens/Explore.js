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
import { getAllPosts } from "../firebase";
import { useFocusEffect } from "@react-navigation/native";

function Explore(props) {
  // all goes to database /posts
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    const posts = await getAllPosts();
    if (posts.length > 0) {
      setPosts([...posts]);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getPosts();
    }, [])
  );

  const renderPost = ({ item }) => (
    <Postuser
      //imagepro={item.imageURL}
      email={item.email}
      time={"1h"}
      title={item.title}
      image={item.imageURL}
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
