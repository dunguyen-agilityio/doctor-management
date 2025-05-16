import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker'

import { ArrowLeft, ArrowRight } from '@icons'

import { tokens } from '@/tamagui.config'

type DateTimePickerProps = Parameters<typeof DateTimePicker>[0]

export type DatePickerProps = Omit<DateTimePickerProps, 'mode' | 'onChange'> & {
  onChange?: (date: DateType) => void
}

const DatePicker = ({ onChange, ...props }: DatePickerProps) => {
  const defaultStyles = useDefaultStyles()

  const handleChange = ({ date }: { date: DateType }) => {
    onChange?.(date)
  }

  return (
    <DateTimePicker
      {...props}
      onChange={handleChange}
      mode="single"
      navigationPosition="right"
      components={{
        IconNext: <ArrowRight />,
        IconPrev: <ArrowLeft />,
      }}
      styles={{
        ...defaultStyles,
        month_selector_label: {
          color: tokens.color.grey900.val,
          fontWeight: '700',
          fontFamily: 'Inter',
          fontSize: 14,
        },
        year_selector_label: {
          color: tokens.color.grey900.val,
          fontWeight: '700',
          fontFamily: 'Inter',
          fontSize: 14,
        },
        day_cell: {
          width: 36,
          height: 30,
          paddingHorizontal: 2,
          paddingVertical: 6,
        },
        weekday_label: { textTransform: 'capitalize', fontFamily: 'Inter', fontSize: 12 },
        month_label: { color: tokens.color.grey600.val, fontFamily: 'Inter' },
        day_label: {
          fontSize: 12,
          fontWeight: '700',
          color: tokens.color.grey500.val,
          fontFamily: 'Inter',
        },
        today: { backgroundColor: 'transparent' },
        selected: {
          backgroundColor: tokens.color.primary.val,
          color: tokens.color.white.val,
          fontWeight: '700',
          borderRadius: 8,
        },
        selected_label: { color: 'white' },
      }}
      weekdaysFormat="short"
      style={{
        backgroundColor: tokens.color.grey50.val,
        borderRadius: 12,
        padding: 16,
        boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.10), 0px 4px 6px 0px rgba(0, 0, 0, 0.05)',
      }}
    />
  )
}

export default DatePicker
