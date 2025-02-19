import type { Meta, StoryObj } from '@storybook/react';

import { View } from 'react-native';

import { MOCK_FOODS } from '@/mocks';

import FoodCard, { FoodCardProps } from './index';

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

const { color, name, id, imgUrl, nutritional, weight } = MOCK_FOODS[0];

const args: FoodCardProps = {
  color,
  name,
  id,
  imgUrl,
  weight,
  calories: nutritional.calories,
};

export const Default: Story = { args };
