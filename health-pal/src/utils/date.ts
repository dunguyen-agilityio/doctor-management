import dayjs from 'dayjs'

export const formatTime = (time: string, separator = '.') => {
  const splitTime = time.split(':')

  return `${splitTime.slice(0, 2).join(separator)} ${parseInt(splitTime[0]) > 12 ? 'PM' : 'AM'}`
}

export const getDefaultDate = () => {
  let now = dayjs()

  while ([0, 6].includes(now.day())) {
    if (![0, 6].includes(now.day())) break
    now = now.set('date', now.get('date') + 1)
  }

  return now
}
