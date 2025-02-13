import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: (Story) => (
    <NavigationContainer>
      <Story />
    </NavigationContainer>
  ),
};

export default preview;
