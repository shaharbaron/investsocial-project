import React, { useState } from "react";
import { FlatList, StyleSheet, View, RefreshControl } from "react-native";
import Postuser from "../components/Postuser";
import LogoUp from "../components/LogoUp";
import { getAllPosts } from "../firebase";
import { useFocusEffect } from "@react-navigation/native";

function Home({ navigation }) {
  // all goes to database /posts
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getPosts = async () => {
    setRefreshing(true);
    try {
      const postsData = await getAllPosts();
      setPosts(postsData);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setRefreshing(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      getPosts();
    }, [])
  );

  const renderPost = ({ item }) => (
    <Postuser
      email={item.email}
      time={item.time}
      title={item.title}
      image={item.imageURL}
    />
  );

  const handleRefresh = () => {
    getPosts();
  };

  return (
    <View style={styles.container}>
      <LogoUp />
      {posts.length ? (
        <FlatList
          style={{ width: 350 }}
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item, index) => index.toString()} // the id of each post
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
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
