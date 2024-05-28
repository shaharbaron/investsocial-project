import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./app/screens/Login";
import Signup from "./app/screens/Signup";
import Home from "./app/screens/Home";
import Create from "./app/screens/Create";
import Explore from "./app/screens/Explore";
import Profile from "./app/screens/Profile";
import SettingPro from "./app/screens/SettingPro";
import EditPostUser from "./app/screens/EditPostUser";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "./app/config/colors";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          gestureEnabled: false,
          tabBarIcon: ({ size }) => (
            <Icon name="home-outline" color={colors.black} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={Create}
        options={{
          headerShown: false,
          gestureEnabled: false,
          tabBarIcon: ({ size }) => (
            <Icon name="create-outline" color={colors.black} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          headerShown: false,
          gestureEnabled: false,
          tabBarIcon: ({ size }) => (
            <Icon name="compass-outline" color={colors.black} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          gestureEnabled: false,
          tabBarIcon: ({ size }) => (
            <Icon name="person-outline" color={colors.black} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
} // the 4 tabs

export default function App() {
  // const [user, setUser] = useState(null);
  // useEffect(() => {
  //   const auth = getAuth();
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setUser(user);
  //     } else {
  //       setUser(null);
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MyTabs"
          component={MyTabs}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="SettingPro"
          component={SettingPro}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditPostUser"
          component={EditPostUser}
          options={{ headerShown: false }}
        />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
