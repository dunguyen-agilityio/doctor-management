import { View } from 'react-native';

import type { Meta, StoryObj } from '@storybook/react';

import { MOCK_ARTICLES } from '@/mocks';

import ArticlesSlider from './index';

const meta = {
  title: 'ArticlesSlider',
  component: ArticlesSlider,
  argTypes: {},
  decorators: [
    (Story) => (
      <View style={{ padding: 16, alignItems: 'flex-start' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof ArticlesSlider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { articles: MOCK_ARTICLES } };
