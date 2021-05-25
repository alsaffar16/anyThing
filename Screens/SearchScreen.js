import React, { useState, useEffect } from "react";
import { Card } from "react-native-elements";

import {
  ActivityIndicator,
  StyleSheet,
  TouchableHighlight,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  Button,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { cities } from "../cities.js";

export default function Search({ navigation }) {
  //console.log(navigation);

  const [search, setSearch] = useState("");

  const [cityName, setCity] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState(cities);
  const [masterDataSource, setMasterDataSource] = useState(cities);
  //console.log(cities);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={{ alignItems: "center", flexDirection: "row" }}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search City"
        />
      </View>
      <View style={{ flexDirection: "column" }}>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => item.geonameid.toString()}
          renderItem={({ item }) => (
            <View style={{}}>
              <TouchableHighlight
                onPress={() => navigation.navigate("CityWeather", item.name)}
                style={[styles.city, { backgroundColor: "#C0C0C0" }]}
              >
                <Text style={styles.text}>{item.name}</Text>
              </TouchableHighlight>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    alignContent: "center",
    marginLeft: 10,
  },
  textInput: {
    height: 50,
    width: Dimensions.get("window").width * 0.8,
    borderColor: "#708090",
    borderWidth: 1.5,
    marginTop: 90,
    marginLeft: Dimensions.get("window").width * 0.05,
    borderRadius: 15,
    shadowColor: "#000",
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    fontSize: 20,
    textAlign: "center",
  },

  city: {
    width: Dimensions.get("window").width * 0.8,
    height: 70,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "#708090",
    marginVertical: 8,
    marginHorizontal: 20,
    textAlign: "center",
  },

  button: {
    width: Dimensions.get("window").width * 0.17,
    marginHorizontal: Dimensions.get("window").width * 0.1,
    height: 50,
    marginTop: 90,
    borderWidth: 1.5,
    borderRadius: 15,
    alignContent: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    // backgroundColor:,
    elevation: 11,
    textAlign: "center",
  },
  text: {
    fontSize: 25,
    textAlign: "center",
    justifyContent: "center",
  },
});
