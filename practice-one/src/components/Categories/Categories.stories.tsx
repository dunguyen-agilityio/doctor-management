import { View } from 'react-native';

import type { Meta, StoryObj } from '@storybook/react';

import { CATEGORIES } from '@constants';

import Categories from './index';

const meta = {
  title: 'Categories',
  component: Categories,
  argTypes: { onSelect: { action: 'selected' } },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, alignItems: 'flex-start' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Categories>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { categories: CATEGORIES } };

export const WithValues: Story = {
  args: {
    categories: CATEGORIES,
    values: CATEGORIES.slice(0, 2).map(({ id }) => id),
  },
};
