import React, { useState, useEffect } from "react";
import { NavigationContainer, View, Button } from "@react-navigation/native";
import MyTabs from "./navigation/tabs";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import cityReducer from "./store/changeReducer";
import RNPhoneCodeSelect from "react-native-phone-code-select";

const rootReducer = combineReducers({
  cities: cityReducer,
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </Provider>
  );
}
