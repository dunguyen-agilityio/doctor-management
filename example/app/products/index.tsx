import AlertTest from "@/components/AlertTest";
import AndroidToastTest from "@/components/AndroidToastTest";
import CheckboxTest from "@/components/CheckboxTest";
import DrawerLayoutAndroidTest from "@/components/DrawerLayoutAndroidTest";
import KeyboardAvoidingComponent from "@/components/KeyboardAvoidingComponent";
import TestModal from "@/components/ModalTest";
import RefreshTest from "@/components/RefreshTest";
import StatusBarTest from "@/components/StatusBarTest";
import React from "react";
import { Text, TouchableHighlight, View } from "react-native";

const Products = () => {
  return (
    <View
      style={{ height: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <AlertTest />
      <AndroidToastTest />
      {/* <DrawerLayoutAndroidTest />
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => alert("Pressed!")}
      >
        <View style={{ padding: 10, backgroundColor: "#fff" }}>
          <Text>My Component</Text>
        </View>
      </TouchableHighlight>
      <CheckboxTest />
      <StatusBarTest />
      <KeyboardAvoidingComponent />
      <TestModal />
      <RefreshTest /> */}
    </View>
  );
};

export default Products;
