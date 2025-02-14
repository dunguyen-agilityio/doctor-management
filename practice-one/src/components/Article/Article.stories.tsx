import { View } from 'react-native';

import type { Meta, StoryObj } from '@storybook/react';

import { MOCK_ARTICLES } from '@/mocks';

import Article from './index';

const meta = {
  title: 'Article',
  component: Article,
  argTypes: {},
  decorators: [
    (Story) => (
      <View style={{ padding: 16, alignItems: 'flex-start' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Article>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: MOCK_ARTICLES[0] };
