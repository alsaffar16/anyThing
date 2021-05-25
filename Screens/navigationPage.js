import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";

import CityWeather from "./CityWeather";
import SearchScreen from "./SearchScreen";
const Stack = createStackNavigator();

export default function navigatePage() {
  return (
    <Stack.Navigator initialRouteName="SearchScreen">
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="CityWeather" component={CityWeather} />
    </Stack.Navigator>
  );
}
