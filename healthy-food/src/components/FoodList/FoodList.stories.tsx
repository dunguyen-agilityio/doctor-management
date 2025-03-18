import type { Meta, StoryObj } from '@storybook/react';

import { View } from 'react-native';

import NotFound from '@/components/NotFound';

import { MOCK_FOOD_LIST } from '@/mocks/food';

import FoodList from './index';

const meta = {
  title: 'FoodList',
  component: FoodList,
  argTypes: {
    horizontal: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, alignItems: 'flex-start', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof FoodList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: { ListEmptyComponent: <NotFound />, data: [] },
};

export const Horizontal: Story = {
  args: { data: MOCK_FOOD_LIST, horizontal: true },
};

export const Vertical: Story = {
  args: { data: MOCK_FOOD_LIST },
};
