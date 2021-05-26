import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CityWeather from "../Screens/CityWeather";
import SearchScreen from "../Screens/SearchScreen";
const Stack = createStackNavigator();

export default function searchStack() {
  return (
    <Stack.Navigator initialRouteName="SearchScreen">
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="CityWeather" component={CityWeather} />
    </Stack.Navigator>
  );
}
