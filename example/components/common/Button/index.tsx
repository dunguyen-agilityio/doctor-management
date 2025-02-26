import { StyleSheet, Button as RNButton } from "react-native";
import React from "react";

export default function Button() {
  return (
    <RNButton
      title="button"
      onPress={async () => {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
        const data = await res.json();
        console.log("data", data);
      }}
    />
  );
}

const styles = StyleSheet.create({});
