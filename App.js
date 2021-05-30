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
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import cityReducer from "./store/reducers/cityReducers";
import uidReducer from "./store/reducers/uidReducers";
import LogIn from "./Screens/LogIn";
import Athinticateion from "./Screens/Authintecation";
import AppContainer from "./navigation/switchNavigation";
import ReduxThunk from "redux-thunk";

const rootReducer = combineReducers({
  cities: cityReducer,
  userID: uidReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppContainer />
      </NavigationContainer>
    </Provider>
  );
}
