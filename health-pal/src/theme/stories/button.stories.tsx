import { View } from 'react-native'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@app/theme'
import { Airplay } from '@tamagui/lucide-icons'

const meta = {
  title: 'components/button',
  component: Button,
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
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const Outlined: Story = {
  args: {
    children: 'Another example',
    variant: 'outlined',
    fontSize: 14,
  },
}

export const OutlinedWithIcon: Story = {
  args: {
    children: 'Another example',
    variant: 'outlined',
    fontSize: 14,
    icon: Airplay,
  },
}
