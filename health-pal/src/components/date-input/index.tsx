import { useEffect, useRef, useState } from 'react'
import { TextInput } from 'react-native'

import dayjs from 'dayjs'
import { DateType } from 'react-native-ui-datepicker'

import { Button, InputProps, Popover } from 'tamagui'

import { CalendarIcon } from '@icons'

import DatePicker, { DatePickerProps } from '../date-picker'
import Input from '../input'

interface DateInputProps extends Omit<InputProps, 'value'> {
  value?: Date | null
  ref?: React.Ref<TextInput | null>
  onChangeValue?: (value: Date) => void
  errorMessage?: string
  datePickerProps?: DatePickerProps
}

const DateInput = ({
  errorMessage,
  onChangeValue,
  datePickerProps,
  value: initialValue,
  ...props
}: DateInputProps) => {
  const [value, setValue] = useState<DateType>()
  const inputRef = useRef<TextInput>(null)

  const containerRef = useRef<Popover>(null)

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue)
    }
  }, [initialValue])

  const handleOpenDatePicker = () => {
    containerRef.current?.open()
  }

  const handleChange = (date: DateType) => {
    setValue(date)
    containerRef.current?.close()
    onChangeValue?.(dayjs(date).toDate())
    inputRef.current?.blur()
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
      <Popover.Trigger asChild height={48}>
        <Button onPress={handleOpenDatePicker} padding={0}>
          <Input
            {...props}
            ref={inputRef}
            leftIcon={CalendarIcon}
            textContentType="dateTime"
            value={value ? dayjs(value).format('DD/MM/YYYY') : ''}
            errorMessage={errorMessage}
            editable={false}
            pointerEvents="none"
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
        <DatePicker onChange={handleChange} date={value} {...datePickerProps} />
      </Popover.Content>
    </Popover>
  )
}

export default DateInput
