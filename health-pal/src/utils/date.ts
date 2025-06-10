import dayjs, { Dayjs } from 'dayjs'

export const formatTime = (time: string, separator = '.') => {
  const splitTime = time.split(':')

  return `${splitTime.slice(0, 2).join(separator)} ${parseInt(splitTime[0]) > 12 ? 'PM' : 'AM'}`
}

export const formatDate = (date: Dayjs) => {
  return dayjs(date).format('YYYY-MM-DD - HH:mm A')
}

export const formatShortDate = (date: Dayjs) => {
  return dayjs(date).format('YYYY-MM-DD')
}

export const formatShortTime = (date?: Dayjs) => {
  if (!date?.isValid?.()) return ''
  return date.format('HH:mm') + ':00'
}

export const getDateSkippingWeekend = () => {
  let date = dayjs()

  if (date.day() === 6) {
    date = date.add(2, 'day')
  } else if (date.day() === 0) {
    date = date.add(1, 'day')
  }

  return date
}

export const getMaxDate = (years = 18) => {
  let maxDate = dayjs()
  maxDate = maxDate.set('years', maxDate.get('year') - years)
  return maxDate
}

export const splitTime = (time?: string) => {
  if (!time) return { hour: 0, minute: 0 }

  const [hour, minute] = time.split(':').map(Number)
  return { hour, minute }
}
