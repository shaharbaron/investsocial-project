import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import AppTextInput from "../AppTextInput";
import colors from "../../config/colors";
import CameraButton from "../CameraButton";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

function SignUpPage({ navigation }) {
  // start with empty value, and changes when the user enter info
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // storage the image

  const handleSignUp = async () => {
    if (!name || !username || !email || !password) {
      alert("Please fill in all fields before signing up");
      return;
    }
    try {
      const auth = getAuth();
      console.log("Creating user...");
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User created:", user);
      let profileImageUrl = null;

      if (selectedImage) {
        // if choose image, we uploade to storage
        console.log("Uploading profile image...");
        const storage = getStorage();
        const storageRef = ref(storage, `profile-images/${Date.now()}`); //הפניה למיקום ספציפי
        const response = await fetch(selectedImage); //הפונקציה fetch מחזירה promise שמכיל אובייקט response מהשרת
        const blob = await response.blob(); //ממיר את התמונה לאובייקט מסוג blob
        await uploadBytes(storageRef, blob); // מעלים את הblob שנבחר למיקום שהוגדר
        profileImageUrl = await getDownloadURL(storageRef); // מקבלים את כתובת הurl הציבורית של הקובץ שהועלה
        console.log("SignUpPage - the profileimageURL is: ", profileImageUrl);
      }
      console.log("Saving user data...");
      await saveUserData(user.uid, email, name, username, profileImageUrl);
      console.log("Saving user credentials...");

      // Save user credentials to AsyncStorage
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("password", password);
      console.log("Sign up successful, navigating to Home...");
    } catch (error) {
      console.error("Error signing up:", error);
      alert("An error occurred while signing up. Please try again.");
    }
    setName(""); // reset all the info
    setUsername("");
    setEmail("");
    setPassword("");
    setSelectedImage(null);
  };

  const saveUserData = async (
    userId,
    email,
    fullName,
    username,
    profileImageUrl
  ) => {
    try {
      const db = getFirestore();
      await setDoc(doc(db, "users", userId), {
        email: email,
        fullName: fullName,
        username: username,
        profileImageUrl: profileImageUrl,
      });
      console.log("User data saved successfully!");
    } catch (error) {
      console.error("Error signup the application: ", error);
      throw error;
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerText1}>Create new account</Text>
      <Text style={styles.headerText2}>
        To use InvestSocial, please enter your details.
      </Text>
      <CameraButton
        onImageSelected={setSelectedImage}
        selectedImage={selectedImage}
      />
      <Text style={styles.textname}>Name</Text>
      <AppTextInput
        placeholder={"Enter your name"}
        onChangeText={setName}
        value={name}
      ></AppTextInput>
      <Text style={styles.textuser}>Username</Text>
      <AppTextInput
        placeholder={"Enter your username"}
        onChangeText={setUsername}
        value={username}
      ></AppTextInput>
      <Text style={styles.textemail}>Email</Text>
      <AppTextInput
        placeholder={"Enter your email"}
        onChangeText={setEmail}
        value={email}
      ></AppTextInput>
      <Text style={styles.textpass}>Password</Text>
      <AppTextInput
        placeholder={"Enter your password"}
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      ></AppTextInput>
      <TouchableOpacity style={styles.signbutton} onPress={handleSignUp}>
        <Text style={styles.buttonsign}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  headerText1: {
    // creat new account
    marginTop: Platform.OS === "android" ? 10 : 10,
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 5,
  },
  headerText2: {
    // to use invest.....
    fontSize: 17,
  },
  textname: {
    // the name text
    marginLeft: -251,
    fontWeight: "bold",
    fontSize: 25,
  },
  textuser: {
    // the user text
    marginTop: 10,
    marginLeft: -200,
    fontWeight: "bold",
    fontSize: 25,
  },
  textemail: {
    // the email text
    marginTop: 10,
    marginLeft: -257,
    fontWeight: "bold",
    fontSize: 25,
  },
  textpass: {
    // the pssword text
    marginTop: 10,
    marginLeft: -205,
    fontWeight: "bold",
    fontSize: 25,
  },
  signbutton: {
    // button sign up
    backgroundColor: colors.lightgray,
    marginTop: 20,
    height: 44,
    width: "23%",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  buttonsign: {
    //text sign up on button
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
});
export default SignUpPage;

//מה שניסיתי לעשות
// if (selectedImage) {
//   // if choose image, we uploade to storage
//   console.log("Uploading profile image...");
//   const storage = getStorage();
//   const imageRef = ref(storage, "/profile-images/" + Date.now());
//   const response = await fetch(selectedImage);
//   console.log("SignUpPage - the response is: ", response);
//   const blob = await response.blob();
//   const bytesref = await uploadBytes(imageRef, blob);
//   const profileImageUrl = await getDownloadURL(bytesref.ref);
//   console.log("SignUpPage - the profileimageURL is: ", profileImageUrl);
// }
