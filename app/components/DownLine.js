import React from "react";
import { View, StyleSheet } from "react-native";
import AppButton from "../components/AppButton";

function DownLine(props) {
  return (
    <View style={styles.container}>
      <AppButton title="Home    " onPress={() => navigation.navigate("Home")} />
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
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});

export default DownLine;
