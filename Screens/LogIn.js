import React, { useRef ,useState, useEffect } from "react";
import {
  useFonts,
  Comfortaa_400Regular,
  Comfortaa_500Medium,
} from "@expo-google-fonts/comfortaa";
import { firebaseConfig } from "../config";
import firebase from "firebase";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  TextInput,
  View,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import PhoneInput from "react-native-phone-number-input";

export default function LogIn() {
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({
    Comfortaa_400Regular,
    Comfortaa_500Medium,
  });
  const recaptchaVerifier = React.useRef(null);
  const attemptInvisibleVerification = false;
  const [phoneNum, setPhone] = useState(" ");
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }


  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      accessible={false}
      style={{}}
    >
      <View style={styles.mainContainer}>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
          attemptInvisibleVerification={attemptInvisibleVerification}
        />
        <View style={{backgroundColor:"#E3E2E2",
         paddingVertical:Dimensions.get('window').height*0.07,
         marginTop: Dimensions.get('window').height*0.16,
         borderRadius:20,
         marginHorizontal:Dimensions.get('window').width*0.05,
         }}>
        <View style={{  flexDirection: "row" }}>
          <View style={{marginHorizontal:Dimensions.get('window').width*0.05}}>
        <PhoneInput
           // ref={phoneInput}
            defaultValue={value}
            defaultCode="SA"
            layout="first"
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
              
            }}
            withDarkTheme
            withShadow
            autoFocus
          />
          </View>
          {/* <TextInput
            keyboardType="numeric"
            onChangeText={(text) => {
              setPhone(text);
              //console.log(text);
            }}
            style={styles.textInput}
            //underlineColorAndroid="transparent"
            placeholder="966xxxxxxxxx"
          /> */}
        </View>

        <View
          style={{
            marginTop: Dimensions.get("window").height * 0.05,
            marginHorizontal: Dimensions.get("window").width * 0.05,
          }}
        >
          <TouchableHighlight
            style={{
              borderRadius: 15,
              backgroundColor: "#F38F38",
              //paddingHorizontal: Dimensions.get("window").width * 0.05,
              //marginRight: Dimensions.get("window").width * 0.05,
              textAlign: "center",
              //justifyContent: "center",
              //alignContent: "center",
            }}
            onPress={() => {
              firebase
                .auth()
                .signInWithPhoneNumber(
                  formattedValue,
                  recaptchaVerifier.current
                )
                .then((result) => {
                  //console.log(result);
                  navigation.navigate("verify", {
                    id: result.verificationId,

                  });
                  (error) => {
                    Alert(error.message);
                  };
                });
            }}
          >
            <Text style={[styles.buttonText, { marginTop: 10 }]}>Next </Text>
          </TouchableHighlight>
        </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    //alignContent: "center",
    //justifyContent: "center",
    height: "100%",
    width: "100%",
    //marginLeft: 18,
    
    //padding: Dimensions.get("window").height
  },
  textInput: {
    height: Dimensions.get("window").width * 0.15,
    width: Dimensions.get("window").width * 0.7,
    borderColor: "#708090",
    borderWidth: 1.5,
    fontSize: 25,
    //fontFamily: "Comfortaa_400Regular",
    //marginTop: Dimensions.get("window").height * 0.2,
    marginLeft: Dimensions.get("window").width * 0.09,
    borderRadius: 15,
    shadowColor: "#000",
    textAlign: "center",
    //marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
  buttonText: {
    color: "#FFFFE0",
    height: 50,
    textAlign: "center",
    justifyContent: "center",
    fontSize: 27,
    //fontFamily: "Comfortaa_400Regular",
  },
});
