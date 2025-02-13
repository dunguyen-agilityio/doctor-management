import { View } from 'react-native';

import { MOCK_FOODS } from '@__mock__';
import type { Meta, StoryObj } from '@storybook/react';

import FoodCard from './index';

const meta = {
  title: 'FoodCard',
  component: FoodCard,
  argTypes: { onPress: { action: 'pressed' } },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, alignItems: 'flex-start' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof FoodCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { data: MOCK_FOODS[0] } };
