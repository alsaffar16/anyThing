import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MyTabs from "./tabs";
import { View } from "react-native";
import navigatePage from "./Screens/navigationPage";

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
