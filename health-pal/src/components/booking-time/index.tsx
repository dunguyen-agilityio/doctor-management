import { StyleSheet } from 'react-native'

import dayjs from 'dayjs'
import { DateType } from 'react-native-ui-datepicker'

import { Heading, Text, XStack, YStack } from '@app/components/common'

import TimeButton from '../time-button'

const TIMES = [
  '09:00:00',
  '09:30:00',
  '10:00:00',
  '10:30:00',
  '11:00:00',
  '11:30:00',
  '15:00:00',
  '15:30:00',
  '16:00:00',
  '16:30:00',
  '17:00:00',
  '17:30:00',
]

interface BookingTimeProps {
  errorMessage?: string
  onChange: (value: string) => void
  available: Record<string, boolean>
  value?: string
  current?: string
  date: DateType
}

const BookingTime = ({
  errorMessage,
  onChange,
  value,
  available,
  date,
  current,
}: BookingTimeProps) => {
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
        {TIMES.map((time) => {
          let clone = dayjs(date)
          let [hour, minute] = time.split(':')
          clone = clone.set('hour', parseInt(hour))
          clone = clone.set('minute', parseInt(minute))

          const disabled = (!available[time] && current !== time) || clone.isBefore(dayjs(), 'hour')

          return (
            <TimeButton
              value={time}
              key={time}
              onSelect={onChange}
              disabled={disabled}
              color={value === time ? '$white' : '$primary'}
              backgroundColor={value === time ? '$primary' : '$grey50'}
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
