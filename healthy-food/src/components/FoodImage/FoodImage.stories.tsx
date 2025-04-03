import type { Meta, StoryObj } from '@storybook/react';

import { View } from 'react-native';

import { MOCK_FOOD_LIST } from '@/mocks/food';

import FoodImage, { FoodImageSize } from './index';

const meta = {
  title: 'FoodImage',
  component: FoodImage,
  decorators: [
    (Story) => (
      <View style={{ flex: 1 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof FoodImage>;

export default meta;

type Story = StoryObj<typeof meta>;

const { color, imgUrl } = MOCK_FOOD_LIST[0];

export const Large: Story = {
  args: { color, imgUrl, type: FoodImageSize.large },
};

export const Medium: Story = {
  args: { color, imgUrl, type: FoodImageSize.medium },
};
