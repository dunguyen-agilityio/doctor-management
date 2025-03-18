import type { Meta, StoryObj } from '@storybook/react';

import { View } from 'react-native';

import { CATEGORIES } from '@/constants';

import Category from './CategoryItem';

const [{ id, name }] = CATEGORIES;

const meta = {
  title: 'Category',
  component: Category,
  argTypes: {
    onPressItem: { action: 'Pressed' },
    isActive: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, alignItems: 'flex-start' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Category>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { id, children: name } };

export const Active: Story = {
  args: { id, children: name, isActive: true },
};
