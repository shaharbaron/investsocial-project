import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  Alert,
} from "react-native";
import LogoUp from "../components/LogoUp";
import { Feather } from "@expo/vector-icons";
import Postuser from "../components/Postuser";
import ProfileInfo from "../components/ProfileInfo";
import { useFocusEffect } from "@react-navigation/native";
import { getPostsByEmail } from "../firebase";
import { getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Profile({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const auth = getAuth();
  const current = auth.currentUser; // print the currentuser by the firebase - auth
  console.log("Profile - the current user is:", current); // this 3 lines is to know who is the current

  // all goes to database /posts
  const getPostsE = async () => {
    setRefreshing(true);
    try {
      if (current) {
        const posts = await getPostsByEmail(current.email);
        const sortedPosts = posts.sort((a, b) => b.time - a.time);
        if (sortedPosts.length > 0) {
          setPosts([...posts]);
        }
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setRefreshing(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      if (current) {
        handleRefresh();
      }
    }, [current])
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
    getPostsE();
  };

  useEffect(() => {
    handleRefresh();
  }, [current]);

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancle",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          try {
            await AsyncStorage.clear();
            await auth.signOut();
            console.log("User logged out successfully");
            navigation.navigate("Login");
          } catch (error) {
            console.error("Error logging out: ", error);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <LogoUp />
      <View style={{ flexDirection: "row", marginTop: 5 }}>
        <Feather
          name="log-out"
          size={24}
          color="black"
          onPress={handleLogout}
        />
        <Feather
          name="settings"
          size={24}
          color="black"
          style={{ marginLeft: 300 }}
          onPress={() => navigation.navigate("SettingPro")}
        />
      </View>
      <ProfileInfo />
      {posts.length ? (
        <FlatList
          style={{ width: 350 }}
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item, index) => index} // the id of each post
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

export default Profile;
