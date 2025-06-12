import { GestureResponderEvent } from 'react-native'

import { Button, StackProps, TextProps } from 'tamagui'

import { Text } from '@/components/common'

type Size = 'md'

interface ChipProps extends StackProps {
  active?: boolean
  children: React.ReactNode
  size?: Size
  onSelect: (value: string) => void
  value: string
}

const STYLES_BY_SIZE: Record<
  Size,
  {
    container: (theme: { active: boolean }) => StackProps
    text: (theme: { active: boolean }) => TextProps
  }
> = {
  md: {
    container: ({ active }) => ({
      backgroundColor: active ? '$primary' : '$white',
      borderRadius: 60,
      borderColor: '$primary',
      borderWidth: 1,
      height: 37,
      paddingHorizontal: 20,
      paddingVertical: 8,
    }),
    text: ({ active }) => ({
      color: active ? '$white' : '$primary',
    }),
  },
}

const Chip = ({
  active = false,
  children,
  value,
  size = 'md',
  onSelect,
  onPress,
  ...props
}: ChipProps) => {
  const { container, text } = STYLES_BY_SIZE[size]

  let content = children

  if (typeof children === 'string') {
    content = (
      <Text size="small" fontWeight="600" {...text({ active })}>
        {children}
      </Text>
    )
  }

  const handlePress = (event: GestureResponderEvent) => {
    onPress?.(event)
    onSelect(value)
  }

  return (
    <Button {...container({ active })} {...props} onPress={handlePress}>
      {content}
    </Button>
  )
}

export default Chip
