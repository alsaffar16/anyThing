import * as React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import searchStack from "../navigation/searchStack";
import navigatePage from "./HomeStack.js";
import favoriteStack from "./FavoriteStack";

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#708090"
      barStyle={{ backgroundColor: "#C0C0C0" }}
    >
      <Tab.Screen
        name="Home"
        component={navigatePage}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={searchStack}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map-search" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Favotite"
        component={favoriteStack}
        options={{
          tabBarLabel: "Favorite",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="heart" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default MyTabs;
