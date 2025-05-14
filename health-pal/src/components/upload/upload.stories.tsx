import { View } from 'react-native'

import type { Meta, StoryObj } from '@storybook/react'

import Upload from '.'

const meta = {
  title: 'components/upload',
  component: Upload,
  argTypes: {
    onUpload: { action: 'upload' },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, alignItems: 'flex-start', height: 100 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Upload>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
