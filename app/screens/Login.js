import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import LogoUp from "../components/LogoUp";
import colors from "../config/colors";
import AppTextInput from "../components/AppTextInput";
import { loginWithEmailAndPassword } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSavedUser = async () => {
    const savedEmail = await AsyncStorage.getItem("email");
    const savedPassword = await AsyncStorage.getItem("password");
    if (savedEmail && savedPassword) {
      // the aplication dont try to register if the values is null
      handleLogin(savedEmail, savedPassword);
    }
  };

  useEffect(() => {
    handleSavedUser();
  }, []);

  const handleLogin = async (user_email, user_password) => {
    try {
      console.log("Login - the user-email is :", user_email);
      console.log("Login - the user-pass is :", user_password);
      const result = await loginWithEmailAndPassword(user_email, user_password);
      console.log("Login - the result is :", result);

      if (result && result.user && result.user.uid) {
        navigation.navigate("Home");
      } else {
        alert("Invalid email or password. Please try again");
      }
      console.log(result);
    } catch (error) {
      console.error("Error login the application: ", error);
    }
    setEmail("");
    setPassword("");
  };
  return (
    <View style={styles.container}>
      <LogoUp />
      <Text style={styles.headerText1}>Log in to your account </Text>
      <Text style={styles.headerText2}>
        Welcome back! please enter your details.
      </Text>
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
      <TouchableOpacity
        style={styles.loginbutton}
        onPress={() => handleLogin(email, password)}
      >
        <Text style={styles.buttonlog}>Log in</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", marginTop: 40 }}>
        <Text style={styles.buttonText1}>Don't hava an account?</Text>
        <TouchableOpacity
          style={styles.signupbutton}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.buttonText2}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    alignItems: "center",
  },
  headerText1: {
    // log in to your account
    marginTop: 60,
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  headerText2: {
    // welcome back....
    fontSize: 19,
    marginBottom: 40,
  },
  textemail: {
    // the email text
    marginTop: 10,
    marginLeft: -280,
    fontWeight: "bold",
    fontSize: 25,
  },
  textpass: {
    // the pssword text
    marginTop: 10,
    marginLeft: -230,
    fontWeight: "bold",
    fontSize: 25,
  },
  loginbutton: {
    // button login
    backgroundColor: colors.lightgray,
    marginTop: 50,
    height: Platform.OS === "android" ? 44 : 40,
    width: "20%",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  buttonlog: {
    // text login on button
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  buttonText1: {
    // dont have an acount
    fontSize: 20,
    textAlign: "center",
  },
  buttonText2: {
    // sign up
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default Login;
