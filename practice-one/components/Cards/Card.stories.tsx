import { View } from 'react-native';

import { MOCK_ARTICLES } from '@__mock__';
import type { Meta, StoryObj } from '@storybook/react';

import Card from './Card';

const meta = {
  title: 'Card',
  component: Card,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, alignItems: 'flex-start' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: MOCK_ARTICLES[0] };
