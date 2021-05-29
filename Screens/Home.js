import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect,useCallback } from "react";
import * as Location from "expo-location";
import {
  useFonts,
  Comfortaa_400Regular,
  Comfortaa_500Medium,
} from "@expo-google-fonts/comfortaa";
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
  View,
  Dimensions,
  Button,
} from "react-native";
import Loading from "./loadingScreen";
import { useSelector,useDispatch } from "react-redux";
import {fetchFavotites} from "../store/actions/city";

export default function App() {
  const uid = useSelector((state) => {
    return state.userID.uid;
  });
  const dispatch = useDispatch();
  let [fontsLoaded] = useFonts({
    Comfortaa_400Regular,
    Comfortaa_500Medium,
  });
  const forcast = [
    { key: "0", day: "Sun", data: "25/5/2021", min: "25", max: "50" },
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
  const [weatherState, setweatherState] = useState("");
  const [backColor, setbackColor] = useState("#fff");
  const [icon, setIcon] = useState(" ");
  const[cityID, setCityId] = useState("");   
  const [favoriteCity, setfavoriteCity] = useState([]);
  useEffect(() => {
    dispatch(fetchFavotites(uid));
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
        setweatherState(responseJson.current.weather[0].main.toString());
        backroundCol(responseJson.current.weather[0].main);
        setIcon(
          "http://openweathermap.org/img/wn/" +
            responseJson.current.weather[0].icon +
            "@2x.png"
        );
        setLoading(false);
        console.log(uid);
      });
  }

  function backroundCol(state) {
    if (state == "Clouds") setbackColor("#d0cccc");
    else if (state === "Sunny") setbackColor("#F2F27A");
    else if (state === "Rain") setbackColor("#AFC3CC");
    else if (state === "Snow") setbackColor("#fffafa");
    else if (state === "Clear") setbackColor("#66bbdd");
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
    <View style={[styles.MainContainer]}>
      <View style={[styles.currentInfo, { backgroundColor: backColor }]}>
        <View style={{ flexDirection: "column", flex: 1, textAlign: "center" }}>
          <Image
            source={{
              uri: icon.toString(),
            }}
            style={{
              width: Dimensions.get("window").width * 0.4,
              height: Dimensions.get("window").height * 0.1,
              // marginLeft: Dimensions.get("window").width * 0.7,
              marginTop: Dimensions.get("window").height * 0.02,
            }}
          />
          <Text
            style={{
              fontSize: 30,
              alignContent: "center",
              fontFamily: "Comfortaa_400Regular",
              marginLeft: Dimensions.get("window").width * 0.12,
              marginTop: Dimensions.get("window").height * 0.01,
              fontSize: 20,
              paddingRight: 150,
            }}
          >
            {weatherState}
          </Text>
        </View>

        <Text
          style={{
            fontSize: 30,
            fontFamily: "Comfortaa_500Medium",
            marginLeft: Dimensions.get("window").width * 0.3,
            marginRight: Dimensions.get("window").width * 0.1,
            marginTop: Dimensions.get("window").height * 0.06,
            alignContent: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          °{tempreture}
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

      <View
        style={{
          marginTop: Dimensions.get("window").height * 0.3,
        }}
      ></View>
    </View>
  );
}
const styles = StyleSheet.create({
  MainContainer: {
    marginTop: Dimensions.get("window").height * 0.1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  currentInfo: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    paddingBottom: Dimensions.get("window").width * 0.04,
    marginHorizontal: Dimensions.get("window").width * 0.02,
    fontFamily: "Comfortaa_400Regular",
    borderRadius: 20,
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
    fontFamily: "Comfortaa_400Regular",
  },
  buttonText: {
    color: "#FFFFE0",
    height: 50,
    textAlign: "center",
    justifyContent: "center",
    fontSize: 27,
    fontFamily: "Comfortaa_400Regular",
  },

  temp: {
    flex: 1,
    position: "relative",
    marginVertical: Dimensions.get("window").height * 0.027,
    fontSize: 43,
    fontFamily: "Comfortaa_400Regular",
  },
});
