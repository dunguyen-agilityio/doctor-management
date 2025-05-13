import { View } from 'react-native'
import type { Meta, StoryObj } from '@storybook/react'
import { Text } from '../text'

const meta = {
  title: 'components/text',
  component: Text,
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
} satisfies Meta<typeof Text>

export default meta

type Story = StoryObj<typeof meta>

export const ExtraLargeText: Story = {
  args: { size: 'extraLarge' },
}

export const MediumText: Story = {
  args: { size: 'medium' },
}

export const LargeText: Story = {
  args: { size: 'large' },
}

export const SmallText: Story = {
  args: { size: 'small' },
}

export const SmallTextBold: Story = {
  args: { size: 'small', fontWeight: '700' },
}
