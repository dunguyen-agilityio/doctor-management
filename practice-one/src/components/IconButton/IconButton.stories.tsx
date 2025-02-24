import type { Meta, StoryObj } from '@storybook/react';

import { View } from 'react-native';

import IconButton from './index';

const meta = {
  title: 'IconButton',
  component: IconButton,
  decorators: [
    (Story) => (
      <View style={{ flex: 1 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PositionedTopLeft: Story = {
  args: { icon: require('@assets/icons/arrow-left.png'), top: 10, left: 10 },
  argTypes: { onPress: { action: 'Pressed' } },
};

export const Default: Story = {
  args: { icon: require('@assets/icons/arrow-left.png') },
  argTypes: { onPress: { action: 'Pressed' } },
};
