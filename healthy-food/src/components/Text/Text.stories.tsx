import type { Meta, StoryObj } from '@storybook/react';

import { View } from 'react-native';

import { COLOR, TEXT_COLOR } from '@/theme';

import Text from './index';

const meta = {
  title: 'Text',
  component: Text,
  argTypes: {
    color: { control: 'select', options: Object.keys(TEXT_COLOR) },
  },
  args: { children: 'Hello World!' },
  decorators: [
    (Story) => (
      <View style={{ flex: 1 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Main1: Story = { args: { variant: 'main1' } };

export const Main2: Story = { args: { variant: 'main2' } };

export const Body1: Story = { args: { variant: 'body1' } };

export const Body2: Story = { args: { variant: 'body2' } };

export const Body3: Story = { args: { variant: 'body3' } };

export const Body4: Story = { args: { variant: 'body4' } };

export const Body5: Story = { args: { variant: 'body5' } };

export const Body6: Story = { args: { variant: 'body6' } };

export const Title1: Story = { args: { variant: 'title1' } };

export const Title2: Story = { args: { variant: 'title2' } };

export const SubTitle1: Story = { args: { variant: 'subtitle1' } };

export const SubTitle2: Story = { args: { variant: 'subtitle2' } };

export const SubTitle3: Story = { args: { variant: 'subtitle3' } };

export const SubTitle4: Story = { args: { variant: 'subtitle4' } };

export const WithColor: Story = { args: { color: COLOR.RED } };
