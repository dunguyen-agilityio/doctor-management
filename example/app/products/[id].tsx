import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text } from "react-native";

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();
  return <Text>ProductDetailScreen {id}</Text>;
};

export default ProductDetailScreen;
