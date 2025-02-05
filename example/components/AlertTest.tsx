import React from "react";
import { StyleSheet, Button, Alert, Linking, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const supportedURL = "https://google.com";

const unsupportedURL = "slack://open?team=123456";

type OpenURLButtonProps = {
  url: string;
  children: string;
};

type OpenSettingsButtonProps = {
  children: string;
};

const OpenSettingsButton = ({ children }: OpenSettingsButtonProps) => {
  const handlePress = async () => {
    // Open the custom settings if the app has one
    await Linking.openSettings();
  };

  return <Button title={children} onPress={handlePress} />;
};

const OpenURLButton = ({ url, children }: OpenURLButtonProps) => {
  const handlePress = async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  return <Button title={children} onPress={handlePress} />;
};

const AlertTest = () => {
  const createTwoButtonAlert = () =>
    Alert.alert("Alert Title", "My Alert Msg", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => console.log("OK Pressed"),
      },
    ]);

  const createThreeButtonAlert = () =>
    Alert.alert("Alert Title", "My Alert Msg", [
      {
        text: "Ask me later",
        onPress: () => console.log("Ask me later pressed"),
      },
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  const createButtonPrompt = () =>
    Alert.prompt(
      "Prompt Title",
      "My Prompt Msg",
      [
        {
          text: "Ask me later",
          onPress: () => console.log("Ask me later pressed"),
          style: "destructive",
        },
      ],
      "plain-text",
      "a",
      "a"
    );

  return (
    <SafeAreaView style={styles.container}>
      <OpenSettingsButton>Setting</OpenSettingsButton>
      <OpenURLButton url={supportedURL}>Support</OpenURLButton>
      <OpenURLButton url="tel:+84091787">Tel 840917874925</OpenURLButton>
      <OpenURLButton url="mailto:support@expo.io">
        mailto: support@expo.io
      </OpenURLButton>
      <OpenURLButton url="sms:+84113">SMS 113</OpenURLButton>
      <OpenURLButton url={unsupportedURL}>UnSupport</OpenURLButton>
      <Button title={"2-Button Alert"} onPress={createTwoButtonAlert} />
      <Button title={"3-Button Alert"} onPress={createThreeButtonAlert} />
      <Button title={"Button Prompt"} onPress={createButtonPrompt} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default AlertTest;
