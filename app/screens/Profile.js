import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import LogoUp from "../components/LogoUp";
import { Feather } from "@expo/vector-icons";
import ProfileInfo from "../components/ProfileInfo";

function Profile({ navigation }) {
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
