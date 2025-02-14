import { Text, View } from 'react-native';

import { MOCK_FOODS } from '@__mock__';
import type { Meta, StoryObj } from '@storybook/react';

import NotFound from '@components/NotFound';

import FoodList from './index';

const meta = {
  title: 'FoodList',
  component: FoodList,
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

export const WithTitle: Story = {
  args: { title: <Text>All Food</Text>, foods: MOCK_FOODS },
};

export const Horizontal: Story = {
  args: { title: <Text>All Food</Text>, foods: MOCK_FOODS, horizontal: true },
};
