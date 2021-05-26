import React, { useState, useEffect } from "react";
import {
  useFonts,
  Comfortaa_400Regular,
  Comfortaa_500Medium,
} from "@expo-google-fonts/comfortaa";
import RNPhoneCodeSelect from "react-native-phone-code-select";
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
  View,
  Dimensions,
  Button,
} from "react-native";

export default function logIn() {
  const [visible, setVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  return (
    <View style={styles.container}>
      <Button onPress={() => setVisible(true)} title="Show Modal" />
      <RNPhoneCodeSelect
        visible={visible}
        onDismiss={() => setVisible(false)}
        onCountryPress={(country) => setSelectedCountry(country)}
        primaryColor="#f04a4a"
        secondaryColor="#000000"
        buttonText="Ok"
      />
    </View>
  );
}
