import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Header } from "react-native-elements";

function LogoUp(props) {
  return (
    <View>
      <Header
        backgroundColor="#000000"
        rightComponent={
          <Image
            source={require("../assets/images/logoup.png")}
            style={styles.logo}
          />
        }
        containerStyle={styles.headerContainer}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  logo: {
    // the logo
    marginTop: -20,
    width: 363,
    height: 70,
  },
});
export default LogoUp;
