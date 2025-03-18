import type { Meta, StoryObj } from '@storybook/react';

import { MOCK_NUTRITIONAL } from '@/mocks/nutritional';

import Nutritional from './index';

const meta = {
  title: 'Nutritional',
  component: Nutritional,
} satisfies Meta<typeof Nutritional>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { nutritional: MOCK_NUTRITIONAL[0] },
};
