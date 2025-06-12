import dayjs, { Dayjs } from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { getCalendars } from 'expo-localization'

dayjs.extend(utc)
dayjs.extend(timezone)

export const formatTime = (time: string, separator = '.') => {
  const splitTime = time.split(':')

  return `${splitTime.slice(0, 2).join(separator)} ${parseInt(splitTime[0]) > 12 ? 'PM' : 'AM'}`
}

export const createDayjs = (date?: dayjs.ConfigType) => {
  return dayjs.tz(date, getCalendars()[0].timeZone ?? 'UTC')
}

export const formatDate = (date: Dayjs) => {
  return createDayjs(date).format('YYYY-MM-DD - HH:mm A')
}

export const formatShortDate = (date: Dayjs) => {
  return createDayjs(date).format('YYYY-MM-DD')
}

export const formatShortTime = (date?: Dayjs) => {
  if (!date?.isValid?.()) return ''
  return date.format('HH:mm') + ':00'
}

export const getDateSkippingWeekend = () => {
  let date = createDayjs()

  if (date.day() === 6) {
    date = date.add(2, 'day')
  } else if (date.day() === 0) {
    date = date.add(1, 'day')
  }

  return date
}

export const getMaxDate = (years = 18) => {
  let maxDate = createDayjs()
  maxDate = maxDate.set('years', maxDate.get('year') - years)
  return maxDate
}

export const splitTime = (time?: string) => {
  if (!time) return { hour: 0, minute: 0 }

  const [hour, minute] = time.split(':').map(Number)
  return { hour, minute }
}
