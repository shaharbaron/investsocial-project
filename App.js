import React from "react";
import { initializeApp } from "firebase/app";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { firebaseConfig } from "./app/firebase";
import Login from "./app/screens/Login";
import Signup from "./app/screens/Signup";
import Home from "./app/screens/Home";
import Create from "./app/screens/Create";
import Explore from "./app/screens/Explore";
import Profile from "./app/screens/Profile";
import SettingPro from "./app/screens/SettingPro";

const Stack = createStackNavigator();

export default function App() {
  const app = initializeApp(firebaseConfig);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Create"
          component={Create}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Explore"
          component={Explore}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SettingPro"
          component={SettingPro}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
