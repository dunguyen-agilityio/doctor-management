import { View } from 'react-native';

import type { Meta, StoryObj } from '@storybook/react';

import Loading from './index';

const meta = {
  title: 'Loading',
  component: Loading,
  decorators: [
    (Story) => (
      <View style={{ flex: 1 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Loading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
