import { View } from 'react-native'

import type { Meta, StoryObj } from '@storybook/react'

import DateInput from '.'

const meta = {
  title: 'components/dateInput',
  component: DateInput,
  argTypes: {
    // onPress: { action: 'pressed the button' },
  },
  args: {
    placeholder: 'Date of birth',
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, alignItems: 'flex-start', height: 100 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof DateInput>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
