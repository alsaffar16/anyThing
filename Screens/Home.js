import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { NavigationContainer } from "@react-navigation/native";
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Dimensions,
  Button,
} from "react-native";
import Loading from "./loadingScreen";

export default function App() {
  const forcast = [
    { key: "0", day: "Sunday", data: "25/5/2021", min: "25", max: "50" },
    { key: "1", day: "Mon", data: "25/5/2021", min: "25", max: "32" },
    { key: "2", day: "Tue", data: "25/5/2021", min: "25", max: "55" },
    { key: "3", day: "Wed", data: "25/5/2021", min: "25", max: "100" },
  ];
  const [cState, setcState] = useState(true);
  const [fState, setfState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [tempreture, settempreture] = useState("");
  const [weatherState, setweatherState] = useState("Rain");
  const [backColor, setbackColor] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      setLocation(location);
      getWheatherData(location);
    })();
  }, []);

  function getWheatherData(location) {
    fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        location.coords.latitude +
        "&lon=" +
        location.coords.longitude +
        "&units=metric&exclude=hourly,daily&appid=ef068df682a43913b9d1fadd684d3571",
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        settempreture(responseJson.current.temp);

        setweatherState(responseJson.current.weather[0].main);
        backroundCol();
        setLoading(false);
      });
  }

  function backroundCol() {
    if (weatherState == "Clouds") setbackColor("#d0cccc");
    else if (weatherState == "Sunny") setbackColor("#F2F27A");
    else if (weatherState == "Rain") setbackColor("#AFC3CC");
    else if (weatherState == "Snow") setbackColor("#fffafa");
  }

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return loading ? (
    Loading()
  ) : (
    <View style={[styles.MainContainer, { backgroundColor: backColor }]}>
      <View style={styles.currentInfo}>
        <Text
          style={{
            fontSize: 30,
            marginTop: 250,
            alignContent: "center",
          }}
        >
          {weatherState}
        </Text>
        <Text
          style={{
            fontSize: 35,
            fontWeight: "bold",
            marginLeft: 20,
            marginTop: 250,
            alignContent: "center",
          }}
        >
          {" "}
          °{tempreture}{" "}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableHighlight
          style={[
            {
              backgroundColor: cState ? "#708090" : "#C0C0C0",
            },
            styles.button,
          ]}
          onPress={() => {
            if (!cState) {
              setcState(true);
              setfState(false);
              settempreture(
                (((parseFloat(tempreture) - 32) * 5.0) / 9.0)
                  .toFixed(2)
                  .toString()
              );
            }
          }}
        >
          <Text style={styles.buttonText}>C°</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={[
            { backgroundColor: fState ? "#708090" : "#C0C0C0" },
            styles.button,
          ]}
          onPress={() => {
            if (!fState) {
              setcState(false);
              setfState(true);
              settempreture(
                ((parseFloat(tempreture) * 9.0) / 5.0 + 32)
                  .toFixed(2)
                  .toString()
              );
            }
          }}
        >
          <Text style={styles.buttonText}>°F</Text>
        </TouchableHighlight>
      </View>

      <View style={{ flexDirection: "column", marginTop: 150 }}>
        <FlatList
          data={forcast}
          keyExtractor={(item, index) => item.key}
          renderItem={({ item }) => (
            <View>
              <Text style={{ fontSize: 25 }}>{item.day}</Text>
              <Text style={{ fontSize: 20 }}>{item.max}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  currentInfo: {
    flexDirection: "row",
  },

  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },

  button: {
    height: 60,
    width: 150,
    padding: 20,
    borderRadius: 10,
    marginVertical: Dimensions.get("window").height * 0.027,
    marginLeft: 10,
  },
  buttonText: {
    color: "#FFFFE0",
    height: 50,
    textAlign: "center",
    justifyContent: "center",
    fontSize: 27,
  },

  temp: {
    flex: 1,
    position: "relative",
    marginVertical: Dimensions.get("window").height * 0.027,
    fontSize: 43,
  },
});
