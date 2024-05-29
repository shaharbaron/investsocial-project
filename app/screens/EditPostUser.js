import React from "react";
import {
  StyleSheet,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import LogoUp from "../components/LogoUp";
import EditPostPage from "../components/Pages/EditPostPage";

function EditPostUser({ route }) {
  const { time, title, image } = route.params;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <LogoUp />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <EditPostPage postId={time} initialTitle={title} initialImage={image} />
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

export default EditPostUser;
