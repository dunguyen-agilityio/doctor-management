import type { Meta, StoryObj } from '@storybook/react';

import { View } from 'react-native';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import FavoriteButton from './index';

const queryClient = new QueryClient();

const meta = {
  title: 'FavoriteButton',
  component: FavoriteButton,
  argTypes: { onRefetch: { action: 'pressed' } },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <View style={{ flex: 1 }}>
          <Story />
        </View>
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof FavoriteButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Favorite: Story = { args: { favorite: true, id: '1' } };

export const UnFavorite: Story = { args: { favorite: false, id: '1' } };
