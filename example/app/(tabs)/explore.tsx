import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const Explore = () => {
  return (
    <View
      style={{ height: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <Text>Explore</Text>
      <Link href="/products">Product</Link>
    </View>
  );
};

export default Explore;
