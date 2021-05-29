import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyTabs from "./tabs";
import LogIn from "../Screens/LogIn";
import LogInStack from "./LogInStack";


const Stack = createStackNavigator();

export default function AppContainer() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Login" component={LogInStack} />
      <Stack.Screen name="Home" component={MyTabs} />
    
    </Stack.Navigator>
  );
}

