import { View } from 'react-native'

import type { Meta, StoryObj } from '@storybook/react'
import dayjs from 'dayjs'

import DatePicker from '.'

const meta = {
  title: 'components/date-picker',
  component: DatePicker,
  argTypes: {
    // onPress: { action: 'pressed the button' },
  },
  args: {},
  decorators: [
    (Story) => (
      <View style={{ padding: 16, alignItems: 'flex-start', height: 100 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof DatePicker>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
export const Defaultq: Story = {
  args: { disabledDates: (date) => [0, 6].includes(dayjs(date).day()) },
}
