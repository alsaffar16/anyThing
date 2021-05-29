import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
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
import { useDispatch } from "react-redux";
import { deleteCity } from "../store/actions/city";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import db from "../firestore/firestore";

export default function favoriteCity(props) {
  const uid = useSelector((state) => {
    return state.userID.uid;
  });
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({
    Comfortaa_400Regular,
    Comfortaa_500Medium,
  });
  const [cState, setcState] = useState(true);
  const [fState, setfState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cityName, setCity] = useState("");
  const [fetching, setFetching] = useState(false);
  const [found, setFound] = useState(false);
  const [tempreture, settempreture] = useState("");
  const [weatherState, setweatherState] = useState("");
  const [backColor, setbackColor] = useState("");
  const [icon, setIcon] = useState(" ");

  const dispatch = useDispatch();

  const dispatchHandler = useCallback(() => {
    dispatch(deleteCity(props.route.params.id));
  }, [dispatch, props.route.params.id]);

  useEffect(() => {
    (async () => {
      setCity(props.route.params.name);
      getWheatherData(props.route.params.name);
    })();
  }, []);

  function getWheatherData(city) {
    setFetching(true);
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
        props.route.params.name.toString() +
        "&limit=5&units=metric&appid&appid=ef068df682a43913b9d1fadd684d3571",
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        settempreture(responseJson.main.temp);
        setFound(true);
        setweatherState(responseJson.weather[0].description);
        setLoading(false);
        setIcon(
          "http://openweathermap.org/img/wn/" +
            responseJson.weather[0].icon +
            "@2x.png"
        );

        backroundCol(responseJson.weather[0].main);
      });
  }

  function backroundCol(state) {
    if (state === "Clouds") setbackColor("#d0cccc");
    else if (state === "Sunny") setbackColor("#F2F27A");
    else if (state === "Rain") setbackColor("#AFC3CC");
    else if (state === "Snow") setbackColor("#fffafa");
    else if (state === "Clear") setbackColor("#66bbdd");
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
              marginLeft: Dimensions.get("window").width * 0.05,
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
            fontSize: 32,
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
          marginTop: Dimensions.get("window").height * 0.25,
        }}
      >
        <TouchableHighlight
          style={{
            borderRadius: 15,
            backgroundColor: "#ff3232",
            paddingHorizontal: 30,
            textAlign: "center",
            justifyContent: "center",
            //alignContent: "center",
          }}
          onPress={ async ()  =>  {
            console.log("hello");
           const cityQuery = await db.collection("favoriteCities").where("userID", "==", uid).
           where("cityID", "==",props.route.params.id).get();
           cityQuery.forEach(doc =>{
            console.log(doc.data().cityName);
            doc.ref.delete();
           });
           dispatchHandler();
           navigation.navigate("Favorite Cities");
           alert("City Deleted from Favorite");

          }}
        >
          <Text style={[styles.buttonText, { marginTop: 10 }]}>
            Delete from favorite{" "}
          </Text>
        </TouchableHighlight>
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
    marginHorizontal: Dimensions.get("window").width * 0.02,
    justifyContent: "center",
    alignContent: "center",
    paddingBottom: 30,
    marginTop: Dimensions.get("window").width * 0.1,
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
