import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import LogoUp from "../components/LogoUp";
import EditPostPage from "../components/Pages/EditPostPage";
import { getPostByEmail } from "../firebase";

function EditPostUser({ route }) {
  const { email, title, image } = route.params;
  const [postDetails, setPostDetails] = useState([]);
  console.log("EditPostUser - the title is :", title);
  console.log("EditPostUser - the image is :", image);
  console.log("EditPostUser - the email is :", email);
  console.log("EditPostUser - the postid is: ", route.params.email);

  useEffect(() => {
    const getPostDetails = async () => {
      const postDet = await getPostByEmail(email);
      if (postDet) {
        setPostDetails(userDet);
      }
    };
    getPostDetails();
  });

  console.log("EditPostUser - the postDetails is :", postDetails);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <LogoUp />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <EditPostPage
          //   postId={postDetails.uid}
          initialTitle={title}
          initialImage={image}
        />
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
