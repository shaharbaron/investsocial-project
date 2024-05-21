import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Postuser from "../components/Postuser";
import LogoUp from "../components/LogoUp";
import { getAllPosts } from "../firebase";
import { useFocusEffect } from "@react-navigation/native";

function Home({ route }) {
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
});
export default Home;
