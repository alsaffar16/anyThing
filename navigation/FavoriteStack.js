import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Favorite from "../Screens/favoriteScreen";
import favoriteCity from "../Screens/favoriteCity";
const Stack = createStackNavigator();

export default function favoriteStack() {
  return (
    <Stack.Navigator initialRouteName="Favorite">
      <Stack.Screen name="Favorite Cities" component={Favorite} />
      <Stack.Screen name="City" component={favoriteCity} />
    </Stack.Navigator>
  );
}
