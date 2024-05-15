import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

const LogOut = ({ navigation }) => {
  const handleNavigate = () => {
    navigation.navigate("SecondScreen");
  };
  return (
    <View>
      <TouchableOpacity onPress={handleNavigate}>
        <Text>Go to Second Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogOut;
