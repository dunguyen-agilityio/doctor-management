import { View } from 'react-native'

import type { Meta, StoryObj } from '@storybook/react'

import { Heading } from '../heading'

const meta = {
  title: 'components/heading',
  component: Heading,
  argTypes: {
    onPress: { action: 'pressed the button' },
  },
  args: {
    children: 'Hello world',
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, alignItems: 'flex-start' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Heading>

export default meta

type Story = StoryObj<typeof meta>

export const ExtraLargeHeading: Story = {
  args: { size: 'extraLarge' },
}

export const MediumHeading: Story = {
  args: { size: 'medium' },
}

export const LargeHeading: Story = {
  args: { size: 'large' },
}

export const SmallHeading: Story = {
  args: { size: 'small' },
}
