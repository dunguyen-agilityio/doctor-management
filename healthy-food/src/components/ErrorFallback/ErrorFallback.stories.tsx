import type { Meta, StoryObj } from '@storybook/react';

import { View } from 'react-native';

import Error from './index';

const meta = {
  title: 'Error',
  component: Error,
  decorators: [
    (Story) => (
      <View style={{ flex: 1 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Error>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { error: { message: 'Error', name: 'test' } },
};
