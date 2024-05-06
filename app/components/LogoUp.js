import React from "react";
import { StyleSheet, View, Image, Platform } from "react-native";

function LogoUp(props) {
  return (
    <View>
      <Image
        style={styles.black}
        source={require("../assets/images/blackup.jpg")}
      />
      <Image
        style={styles.logo}
        source={require("../assets/images/logoup.png")}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  black: {
    marginLeft: -20,
    width: 500,
    flexBasis: Platform.OS === "android" ? 85 : 95,
  },
  logo: {
    marginTop: Platform.OS === "android" ? -65 : -64,
    marginLeft: 56,
    flexBasis: 65,
    width: 350,
  },
});
export default LogoUp;
