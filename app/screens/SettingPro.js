import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Platform,
} from "react-native";
import LogoUp from "../components/LogoUp";
import colors from "../config/colors";
import AppTextInput from "../components/AppTextInput";

function SettingPro({ navigation }) {
  return (
    <View style={styles.container}>
      <LogoUp />
      <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 30 }}>
        <Text style={{ fontSize: 25, marginRight: 160 }}>Profile picture</Text>
        <TouchableOpacity style={styles.edit}>
          <Text style={{ fontSize: 25, color: colors.blue }}>edit</Text>
        </TouchableOpacity>
      </View>
      <Image
        style={styles.profile}
        source={require("../assets/images/profile2.jpg")}
      />
      <View style={{ flexDirection: "row", marginTop: 40, marginBottom: 30 }}>
        <Text style={{ fontSize: 25, marginRight: 195 }}>Username</Text>
        <TouchableOpacity style={styles.edit}>
          <Text style={{ fontSize: 25, color: colors.blue }}>edit</Text>
        </TouchableOpacity>
      </View>
      <Text style= {styles.username}>Your current username is: Shaharb</Text>
      <AppTextInput placeholder={"Change username"} />
      <TouchableOpacity style={styles.savebutton}>
        <Text style={{ fontSize: 15 }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  profile: {
    // profile picture
    width: 80,
    height: 80,
    resizeMode: "stretch",
    borderRadius: 50,
  },
  savebutton: {
    // save button
    backgroundColor: colors.lightgray,
    marginTop: 50,
    height: Platform.OS === "android" ? 44 : 40,
    width: 55,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },
  username: {
    fontSize: 18,
    fontWeight: "500",
    marginRight: 59,
    marginBottom: 10,
  },
});

export default SettingPro;
