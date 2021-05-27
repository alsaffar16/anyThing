import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../Screens/LogIn";
import Authintecation from "../Screens/Authintecation";

const Stack = createStackNavigator();

export default function LogInStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="verify" component={Authintecation} />
    </Stack.Navigator>
  );
}
