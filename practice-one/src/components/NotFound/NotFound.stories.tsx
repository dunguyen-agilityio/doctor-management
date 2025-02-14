import { View } from 'react-native';

import type { Meta, StoryObj } from '@storybook/react';

import NotFound from './index';

const meta = {
  title: 'NotFound',
  component: NotFound,
  decorators: [
    (Story) => (
      <View style={{ flex: 1 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof NotFound>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
