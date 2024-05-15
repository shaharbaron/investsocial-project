import React from "react";
import { StyleSheet, View } from "react-native";
import LogoUp from "../components/LogoUp";

function SettingPro({ navigation }) {
  return (
    <View style={styles.container}>
      <LogoUp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default SettingPro;
