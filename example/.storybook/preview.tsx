import type { Preview } from "@storybook/react";
import { withBackgrounds } from "@storybook/addon-ondevice-backgrounds";
import { View } from "react-native";
import React from "react";

const preview: Preview = {
  parameters: {
    decorators: [
      withBackgrounds,
      (Story) => (
        <View style={{ flex: 1, backgroundColor: "blue" }}>
          <Story />
        </View>
      ),
    ],
    backgrounds: {
      default: "plain",
      values: [
        { name: "plain", value: "white" },
        { name: "warm", value: "hotpink" },
        { name: "cool", value: "deepskyblue" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
