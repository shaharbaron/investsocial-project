import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import SignUpPage from "../components/Pages/SignUpPage";
import LogoUp from "../components/LogoUp";

function Signup({ navigation }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <LogoUp />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <SignUpPage />
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Text style={styles.buttonText1}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.buttonText2}>Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  buttonText1: {
    //already have an account
    marginLeft: 20,
    fontSize: 20,
    textAlign: "center",
  },
  buttonText2: {
    // the log in button-text
    marginLeft: 5,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default Signup;
