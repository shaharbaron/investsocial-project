import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import LogoUp from "../components/LogoUp";
import AppButton from "../components/AppButton";
import { Feather } from "@expo/vector-icons";

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
      {/* <DownLine/> */}
      <View style={styles.down}>
        <AppButton
          title="Home    "
          onPress={() => navigation.navigate("Home")}
        />
        <AppButton
          title="Create    "
          onPress={() => navigation.navigate("Create")}
        />
        <AppButton
          title="Explore    "
          onPress={() => navigation.navigate("Explore")}
        />
        <AppButton
          title="Profile    "
          onPress={() => navigation.navigate("Profile")}
        />
      </View>
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
  down: {
    marginTop: 550,
    flexDirection: "row",
  },
});

export default Profile;
