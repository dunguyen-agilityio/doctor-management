import { Link, Slot } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const ProductsLayout = () => {
  return (
    <View>
      <Link href="/test">Test BackHandler</Link>
      <Link href="/permission">Test Permission</Link>
      <Text>ProductsLayout</Text>
      <Slot />
    </View>
  );
};

export default ProductsLayout;
