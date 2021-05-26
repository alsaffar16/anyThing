import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../Screens/Home";

const Stack = createStackNavigator();

export default function navigatePage() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Current Location" component={Home} />
    </Stack.Navigator>
  );
}
