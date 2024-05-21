import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import AppTextInput from "../components/AppTextInput";
import colors from "../config/colors";
import CameraButton from "../components/CameraButton";

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
      const auth = FIREBASE_AUTH;
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
        const storage = getStorage();
        const storageRef = ref(storage, `profile-images/${user.uid}`);
        await uploadBytes(storageRef, selectedImage);
        profileImageUrl = await getDownloadURL(storageRef); // we get the url image
      }

      await saveUserData(user.uid, email, name, username, profileImageUrl);
      navigation.navigate("Home");
    } catch (error) {
      console.log("Error signing up:", error);
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
      console.error("Error saving user data: ", error);
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
