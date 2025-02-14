import { View } from 'react-native';

import { MOCK_FOODS } from '@__mock__';
import type { Meta, StoryObj } from '@storybook/react';

import FoodImage from './index';

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

const { color, imgUrl } = MOCK_FOODS[0];

export const Large: Story = { args: { color, imgUrl, type: 'large' } };

export const Medium: Story = { args: { color, imgUrl, type: 'medium' } };
