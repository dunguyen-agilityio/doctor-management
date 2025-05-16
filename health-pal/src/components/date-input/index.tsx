import { useRef, useState } from 'react'
import { TextInput } from 'react-native'

import dayjs from 'dayjs'
import { DateType } from 'react-native-ui-datepicker'

import { Adapt, InputProps, Popover, YStack } from 'tamagui'

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

const DateInput = ({ errorMessage, onChangeValue, datePickerProps, ...props }: DateInputProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState<DateType>()
  const inputRef = useRef<TextInput>(null)

  const handleOpenDatePicker = () => {
    setIsOpen(true)
  }

  const handleChange = (date: DateType) => {
    setValue(date)
    setIsOpen(false)
    onChangeValue?.(dayjs(date).toDate())
    inputRef.current?.blur()
  }

  const textValue = value ? dayjs(value).toDate().toDateString() : undefined

  return (
    <YStack>
      <Popover
        open={isOpen}
        onOpenChange={setIsOpen}
        size="$5"
        allowFlip
        stayInFrame
        offset={15}
        placement="bottom"
        resize>
        <Popover.Trigger asChild>
          <Input
            {...props}
            ref={inputRef}
            leftIcon={CalendarIcon}
            textContentType="dateTime"
            value={textValue}
            errorMessage={errorMessage}
            onPressIn={handleOpenDatePicker}
          />
        </Popover.Trigger>

        <Adapt when="maxMd" platform="touch">
          <Popover.Sheet animation="medium" modal dismissOnSnapToBottom>
            <Popover.Sheet.Frame padding="$4">
              <Adapt.Contents />
            </Popover.Sheet.Frame>
            <Popover.Sheet.Overlay
              backgroundColor="transparent"
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Popover.Sheet>
        </Adapt>

        <Popover.Content
          width={360}
          height={300}
          enterStyle={{ y: -10, opacity: 0 }}
          exitStyle={{ y: -10, opacity: 0 }}
          borderWidth={0}
          backgroundColor="transparent"
          padding={0}
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
    </YStack>
  )
}

export default DateInput
