import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  Dimensions,
  TextInput,
} from "react-native";
import MyTabs from "./navigation/tabs";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import cityReducer from "./store/changeReducer";
import LogIn from "./Screens/LogIn";
import Athinticateion from "./Screens/Authintecation";
import AppContainer from "./navigation/switchNavigation";

const rootReducer = combineReducers({
  cities: cityReducer,
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppContainer />
      </NavigationContainer>
    </Provider>
  );
}
