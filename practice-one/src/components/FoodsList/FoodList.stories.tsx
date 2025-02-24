import type { Meta, StoryObj } from '@storybook/react';

import { View } from 'react-native';

import NotFound from '@/components/NotFound';

import { MOCK_FOODS } from '@/mocks/foods';

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
  args: { ListEmptyComponent: <NotFound />, foods: [] },
};

export const Horizontal: Story = {
  args: { foods: MOCK_FOODS, horizontal: true },
};

export const Vertical: Story = {
  args: { foods: MOCK_FOODS },
};
