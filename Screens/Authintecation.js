import React, { useState, useEffect } from "react";
import {
  Keyboard,
  Dimensions,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { StyleSheet, View, AsyncStorage } from "react-native";
import SMSVerifyCode from "react-native-sms-verifycode";
import { firebaseConfig } from "../config";
import firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

export default function Athinticateion(props) {
  const navigation = useNavigation();
  const [message, showMessage] = React.useState(
    !firebaseConfig || Platform.OS === "web"
      ? {
          text: "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device.",
        }
      : undefined
  );
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
  //firebase.auth().onAuthStateChanged(onAuthStateChanged);

  // const onAuthStateChanged = (user) => {
  //   this.setState({ isAuthinticationReady: true });
  //   this.setState({ isAthinticated: !!user });
  // };

  onInputCompleted = async (text) => {
    console.log(text, props.route.params.id);

    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        props.route.params.id,
        text
      );

      await firebase.auth().signInWithCredential(credential);
      console.log("sucess");
      navigation.navigate("Home", { screen: "Home" });
    } catch (err) {
      showMessage({ text: `Error: ${err.message}`, color: "red" });
    }
  };

  reset = () => {
    this.verifycode.reset();
    this.setState({ codeText: "" });
  };

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      accessible={false}
      style={{
        flex: 1,
        backgroundColor: "#e5e5e5",
      }}
    >
      <View style={styles.mainContainer}>
        <View style={styles.code}>
          <SMSVerifyCode
            containerPaddingVertical={40}
            containerPaddingRight={58}
            containerPaddingLeft={20}
            codeViewBorderRadius={10}
            codeFontSize={26}
            verifyCodeLength={6}
            containerBackgroundColor={"#e5e5e5"}
            // ref={(ref) => (this.verifycode = ref)}
            onInputCompleted={onInputCompleted}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#e5e5e5",
    height: "100%",
    width: "100%",
  },
  code: {
    width: "90%",
    height: "25%",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#49a9bf",
    //paddingRight: Dimensions.get("window").height * 0.3,
    marginHorizontal: Dimensions.get("window").width * 0.03,
    paddingTop: Dimensions.get("window").width * 0.1,
    marginTop: Dimensions.get("window").height * 0.25,
    //paddingHorizontal: Dimensions.get("window").width * 0.01,
    backgroundColor: "#e5e5e5",
  },
});
