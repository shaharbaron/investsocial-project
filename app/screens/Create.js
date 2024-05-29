import React from "react";
import {
  StyleSheet,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import LogoUp from "../components/LogoUp";
import CreatePage from "../components/Pages/CreatePage";

function Create({ navigation }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <LogoUp />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <CreatePage navigation={navigation} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default Create;
