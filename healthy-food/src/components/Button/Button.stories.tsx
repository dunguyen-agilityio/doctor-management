import { Meta, StoryObj } from '@storybook/react';

import { COLOR } from '@/theme';

import Button from './index';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  argTypes: {
    variant: { control: 'radio', options: ['contained', 'outlined', 'icon'] },
    isLoading: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Click Me',
    variant: 'contained',
  },
};

export const Loading: Story = {
  args: {
    children: 'Click Me',
    isLoading: true,
  },
};

export const IconButton: Story = {
  args: {
    variant: 'icon',
    width: 50,
    children: '+',
  },
};

export const WithColor: Story = {
  args: {
    variant: 'icon',
    width: 50,
    children: '+',
    backgroundColor: COLOR.LIGHT_BLACK,
  },
};
