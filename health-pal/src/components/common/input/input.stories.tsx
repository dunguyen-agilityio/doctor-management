import { Check, LockIcon } from '@/icons'

import { View } from 'react-native'

import type { Meta, StoryObj } from '@storybook/react'

import { Input } from '.'

const meta = {
  title: 'components/input',
  component: Input,
  argTypes: {
    onPress: { action: 'pressed the button' },
  },
  args: {
    placeholder: 'Typing name...',
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, alignItems: 'flex-start', height: 100 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithIcon: Story = { args: { leftIcon: Check } }

export const Password: Story = {
  args: {
    leftIcon: LockIcon,
    textContentType: 'password',
    secureTextEntry: true,
    placeholder: 'Password',
  },
}
