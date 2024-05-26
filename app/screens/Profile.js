import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import LogoUp from "../components/LogoUp";
import { Feather } from "@expo/vector-icons";
import Postuser from "../components/Postuser";
import ProfileInfo from "../components/ProfileInfo";
import { useFocusEffect } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";
import { getPostsByEmail } from "../firebase";

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
      const posts = await getPostsByEmail(current.email);
      if (posts.length > 0) {
        setPosts([...posts]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setRefreshing(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      getPostsE();
      handleRefresh();
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
    setPosts([]);
    getPostsE();
  };

  const handleLogout = () => {
    // logout the user from the application
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        // if there is error
        console.error("Error logging out: ", error);
      });
  };

  return (
    <View style={styles.container}>
      <LogoUp />
      <View style={{ flexDirection: "row", marginTop: 5 }}>
        <TouchableOpacity onPress={handleLogout}>
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
  setting: {
    marginLeft: 300,
  },
});

export default Profile;
