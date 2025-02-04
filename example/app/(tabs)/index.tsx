import React from "react";
import { Text, TextInput, View, StyleSheet, Platform } from "react-native";

const Home = () => {
  return (
    <View
      style={{ height: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <Text style={styles.title}>Home</Text>
      <TextInput
        clearButtonMode="always"
        placeholder="Type..."
        style={{ width: "100%", padding: 10, backgroundColor: "white" }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  title: {
    height: Platform.OS === "ios" ? 200 : 100,
    ...Platform.select({
      ios: {
        backgroundColor: "red",
      },
      android: {
        backgroundColor: "green",
      },
      default: {
        // other platforms, web for example
        backgroundColor: "blue",
      },
    }),
  },
});
