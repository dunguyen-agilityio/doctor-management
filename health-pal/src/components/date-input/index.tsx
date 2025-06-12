import { CalendarIcon } from '@/icons'
import { createDayjs } from '@/utils/date'

import { useImperativeHandle, useRef } from 'react'
import { TextInput } from 'react-native'

import { DateType } from 'react-native-ui-datepicker'

import { Button, InputProps, Popover } from 'tamagui'

import { Input } from '@/components/common'

import DatePicker, { DatePickerProps } from '../date-picker'

interface DateInputProps extends Omit<InputProps, 'value' | 'defaultValue'> {
  value?: Date | null
  defaultValue?: Date | null
  ref?: React.Ref<TextInput | null>
  onChangeValue?: (value: Date) => void
  errorMessage?: string
  datePickerProps?: DatePickerProps
}

const DateInput = ({
  errorMessage,
  onChangeValue,
  datePickerProps,
  defaultValue,
  value: initialValue = defaultValue,
  ref,
  ...props
}: DateInputProps) => {
  const containerRef = useRef<Popover>(null)
  const inputRef = useRef<TextInput>(null)

  useImperativeHandle(
    ref,
    () =>
      ({
        ...inputRef.current,
        focus: () => {
          inputRef.current?.focus()
          containerRef.current?.open()
        },
      }) as TextInput,
  )

  const handleChange = (date: DateType) => {
    containerRef.current?.close()
    onChangeValue?.(createDayjs(date).toDate())
  }

  return (
    <Popover
      ref={containerRef}
      size="$5"
      allowFlip
      stayInFrame
      offset={8}
      placement="bottom"
      resize>
      <Popover.Trigger
        asChild
        height={48}
        aria-label="Date picker"
        accessibilityHint="Select a date from the calendar"
        role="dialog">
        <Button padding={0}>
          <Input
            {...props}
            ref={inputRef}
            leftIcon={CalendarIcon}
            textContentType="dateTime"
            value={initialValue ? createDayjs(initialValue).format('DD/MM/YYYY') : ''}
            errorMessage={errorMessage}
            editable={false}
            pointerEvents="none"
            aria-label="Select date"
            accessibilityHint="Opens a date picker to choose a date"
          />
        </Button>
      </Popover.Trigger>

      <Popover.Content
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        paddingHorizontal={0}
        paddingVertical={0}
        animation={[
          'quick',
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}>
        <DatePicker onChange={handleChange} date={initialValue} {...datePickerProps} />
      </Popover.Content>
    </Popover>
  )
}

export default DateInput
