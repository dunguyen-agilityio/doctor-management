import { View } from 'react-native';

import type { Meta, StoryObj } from '@storybook/react';

import SearchInput from './index';

const meta = {
  title: 'SearchInput',
  component: SearchInput,
  argTypes: { onChangeText: { action: 'type' } },
  decorators: [
    (Story) => (
      <View style={{ flex: 1 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof SearchInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
