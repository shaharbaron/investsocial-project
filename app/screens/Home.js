import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  RefreshControl,
  Image,
} from "react-native";
import Postuser from "../components/Postuser";
import LogoUp from "../components/LogoUp";
import Stock from "../components/Stock";
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
      const sortedPosts = postsData.sort((a, b) => b.time - a.time);
      setPosts(sortedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setRefreshing(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      handleRefresh();
    }, [])
  );

  const handleDeletePost = (deletedPostTime) => {
    // filter the posts list and delete the post that deleted
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.time !== deletedPostTime)
    );
  };

  const renderPost = ({ item }) => (
    <Postuser
      navigation={navigation}
      email={item.email}
      time={item.time}
      title={item.title}
      image={item.imageURL}
      onDeletePost={handleDeletePost} // pass the onDeletePost function as a props
    />
  );

  const handleRefresh = () => {
    setPosts([]);
    getPosts();
  };

  return (
    <View style={styles.container}>
      <LogoUp />
      <Stock />
      {posts.length === 0 ? (
        <Image source={require("../assets/images/loader.gif")}></Image>
      ) : (
        false
      )}
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
