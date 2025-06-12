import { ArrowLeft, ArrowRight } from '@/icons'

import { memo } from 'react'
import { StyleSheet } from 'react-native'

import dayjs, { Dayjs } from 'dayjs'
import DateTimePicker, { DateType } from 'react-native-ui-datepicker'

import { tokens } from '@tamagui.config'

import { WINDOW_SIZE } from '@/constants'

type DateTimePickerProps = Parameters<typeof DateTimePicker>[0]

export type DatePickerProps = Omit<DateTimePickerProps, 'mode' | 'onChange'> & {
  onChange?: (date: Dayjs) => void
}

const DatePicker = ({ onChange, ...props }: DatePickerProps) => {
  const handleChange = ({ date }: { date: DateType }) => {
    onChange?.(dayjs(date))
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
      styles={styles}
      weekdaysFormat="short"
      style={styles.container}
      containerHeight={270}
    />
  )
}

export default memo(DatePicker)

const styles = StyleSheet.create({
  container: {
    width: WINDOW_SIZE.width - 24 * 2,
    minHeight: 272,
    alignSelf: 'center',
    backgroundColor: tokens.color.grey50.val,
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 16,
    boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.10), 0px 4px 6px 0px rgba(0, 0, 0, 0.05)',
  },
  header: { paddingVertical: 0 },
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
    height: 34,
  },
  weekday_label: {
    textTransform: 'capitalize',
    fontFamily: 'Inter',
    fontSize: 12,
  },
  month_label: { color: tokens.color.grey600.val, fontFamily: 'Inter' },
  day_label: {
    fontSize: 12,
    fontWeight: '700',
    color: tokens.color.grey500.val,
    fontFamily: 'Inter',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  today: { backgroundColor: 'transparent' },
  selected_label: {
    backgroundColor: tokens.color.primary.val,
    color: tokens.color.white.val,
    fontWeight: '700',
    borderRadius: 8,
    width: 36,
    height: 30,
    lineHeight: 30,
  },
  disabled_label: {
    color: tokens.color.grey500.val,
    opacity: 0.5,
  },
  button_prev: { paddingRight: 0 },
  button_next: { paddingLeft: 0 },
})
