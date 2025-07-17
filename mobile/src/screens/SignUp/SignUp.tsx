import React from "react";
import { View, Text, Button } from "react-native";

export default function SignUp({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>SignUp</Text>
      <Button title="Go to Sign Up" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}