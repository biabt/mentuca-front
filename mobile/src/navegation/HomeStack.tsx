import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home/Home";
import Lesson from "../screens/Lesson/Lesson";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Lesson" component={Lesson} />
    </Stack.Navigator>
  );
}