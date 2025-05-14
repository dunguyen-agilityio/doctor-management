import { useRef, useState } from 'react'
import { TextInput } from 'react-native'

import dayjs from 'dayjs'
import { DateType } from 'react-native-ui-datepicker'

import { Adapt, InputProps, Popover, XStack } from 'tamagui'

import { CalendarIcon } from '@icons'

import DatePicker from '../date-picker'
import Input from '../input'

interface DateInputProps extends Omit<InputProps, 'value'> {
  value?: DateType
}

const DateInput = ({ ...props }: DateInputProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState<DateType>()
  const inputRef = useRef<TextInput>(null)

  const handleOpenDatePicker = () => {
    setIsOpen(true)
  }

  const handleChange = (date: DateType) => {
    setValue(date)
    setIsOpen(false)
  }

  return (
    <XStack onPress={handleOpenDatePicker}>
      <Popover
        open={isOpen}
        onOpenChange={setIsOpen}
        size="$5"
        allowFlip
        stayInFrame
        offset={15}
        resize
        {...props}>
        <Popover.Trigger asChild>
          <Input
            {...props}
            ref={inputRef}
            leftIcon={CalendarIcon}
            textContentType="dateTime"
            editable={false}
            value={dayjs(value).toDate().toDateString()}
          />
        </Popover.Trigger>

        <Popover.Sheet modal dismissOnSnapToBottom>
          <Popover.Sheet.Frame padding="$4">
            <Adapt.Contents />
          </Popover.Sheet.Frame>
          <Popover.Sheet.Overlay
            backgroundColor="$shadowColor"
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Popover.Sheet>

        <Popover.Content
          width={360}
          height={300}
          enterStyle={{ y: -10, opacity: 0 }}
          exitStyle={{ y: -10, opacity: 0 }}
          borderWidth={0}
          backgroundColor="transparent"
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}>
          <DatePicker onChange={handleChange} date={value} />
        </Popover.Content>
      </Popover>
    </XStack>
  )
}

export default DateInput
