import { Slot } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const ProductsLayout = () => {
  return (
    <View>
      <Text>ProductsLayout</Text>
      <Slot />
    </View>
  );
};

export default ProductsLayout;
