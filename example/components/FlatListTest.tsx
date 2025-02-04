import { Link } from "expo-router";
import React from "react";
import { FlatList, Text, View } from "react-native";

const data = Array.from({ length: 10 }).map((_, i) => ({
  id: i.toString(),
  name: `Product ${i}`,
}));

const FlatListTest = () => {
  return (
    <FlatList
      data={data}
      ItemSeparatorComponent={() => (
        <View style={{ height: 5, width: "100%", backgroundColor: "black" }} />
      )}
      renderItem={({ item }) => (
        <Link push href={`/products/${item.id}`} style={{ padding: 20 }}>
          <Text style={{ fontWeight: "500" }}>{item.name}</Text>
        </Link>
      )}
      keyExtractor={({ id }) => id}
    />
  );
};

export default FlatListTest;
