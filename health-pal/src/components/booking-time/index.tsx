import { StyleSheet } from 'react-native'

import { TIME_SLOTS } from '@/constants/booking'

import { Heading, Text, XStack, YStack } from '@/components/common'

import TimeButton from '../time-button'

interface BookingTimeProps {
  errorMessage?: string
  onChange: (value: string) => void
  value?: string
  disable?: (time: string) => boolean
}

const BookingTime = ({ errorMessage, onChange, value, disable }: BookingTimeProps) => {
  return (
    <YStack gap={8}>
      <XStack justifyContent="space-between" alignItems="center">
        <Heading>Select Hour</Heading>
        {errorMessage && (
          <Text size="extraSmall" color="red">
            {errorMessage}
          </Text>
        )}
      </XStack>
      <XStack justifyContent="space-between" gap={14} flexWrap="wrap">
        {TIME_SLOTS.map((time) => {
          const disabled = disable?.(time)

          const backgroundColor = !disabled && value === time ? '$primary' : '$grey50'
          const color = !disabled && value === time ? '$white' : '$primary'

          return (
            <TimeButton
              value={time}
              key={time}
              onSelect={onChange}
              disabled={disabled}
              color={color}
              backgroundColor={backgroundColor}
              disabledStyle={styles.disabledStyle}
            />
          )
        })}
      </XStack>
    </YStack>
  )
}

export default BookingTime

const styles = StyleSheet.create({
  disabledStyle: { opacity: 0.5, backgroundColor: '$grey300' },
})
