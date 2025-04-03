import type { Meta, StoryObj } from '@storybook/react';

import { View } from 'react-native';

import { TabParamsList } from '@/types';

import { ROUTES } from '@/routes';

import TabIcon from './index';

const meta = {
  title: 'TabIcon',
  component: TabIcon,
  decorators: [
    (Story) => (
      <View
        style={{ padding: 16, alignItems: 'center', justifyContent: 'center' }}
      >
        <Story />
      </View>
    ),
  ],
  argTypes: {
    focused: { control: 'boolean' },
    name: {
      control: 'select',
      options: Object.values(ROUTES),
    },
  },
} satisfies Meta<typeof TabIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

// Stories
export const FavoriteFocused: Story = {
  args: {
    focused: true,
    name: ROUTES.FAVORITE,
  },
};

export const FavoriteUnfocused: Story = {
  args: {
    focused: false,
    name: ROUTES.FAVORITE,
  },
};

export const HomeFocused: Story = {
  args: {
    focused: true,
    name: ROUTES.HOME,
  },
};

export const HomeUnfocused: Story = {
  args: {
    focused: false,
    name: ROUTES.HOME,
  },
};

export const SearchFocused: Story = {
  args: {
    focused: true,
    name: ROUTES.SEARCH,
  },
};

export const SearchUnfocused: Story = {
  args: {
    focused: false,
    name: ROUTES.SEARCH,
  },
};

export const UnknownRoute: Story = {
  args: {
    focused: true,
    name: 'Unknown' as keyof TabParamsList, // Type cast for testing
  },
};
