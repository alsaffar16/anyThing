import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableHighlight,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import firebase from "firebase";

export default function Loading() {
  const LoadingIcon = ({ isIconAnimating }) => (
    <ActivityIndicator size="large" color="#fff" animating={isIconAnimating} />
  );

  return (
    <View style={styles.MainContainer}>
      <ActivityIndicator size="large" />
      <View>
        <Text style={{ fontSize: 20, color: "blue" }}>
          {" "}
          please wait while getting the location{" "}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    width: Dimensions.get("window").width,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
    flex: 1,
    marginTop: 10,
  },
});
