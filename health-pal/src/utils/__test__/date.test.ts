import dayjs from 'dayjs'

import { formatShortTime, formatTime, getDateSkippingWeekend, getMaxDate, splitTime } from '../date'

describe('formatTime', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('formats time with default separator (.) for PM', () => {
    const result = formatTime('14:30:00')
    expect(result).toBe('14.30 PM')
  })

  it('formats time with default separator (.) for AM', () => {
    const result = formatTime('09:45:00')
    expect(result).toBe('09.45 AM')
  })

  it('formats time with custom separator (:)', () => {
    const result = formatTime('14:30:00', ':')
    expect(result).toBe('14:30 PM')
  })

  it('handles 12:00:00 as PM', () => {
    const result = formatTime('12:00:00')
    expect(result).toBe('12.00 AM')
  })

  it('handles 00:00:00 as AM', () => {
    const result = formatTime('00:00:00')
    expect(result).toBe('00.00 AM')
  })

  it('handles time without seconds', () => {
    const result = formatTime('15:45')
    expect(result).toBe('15.45 PM')
  })

  it('handles single-digit hours and minutes', () => {
    const result = formatTime('03:05:00')
    expect(result).toBe('03.05 AM')
  })

  it('handles time with extra segments', () => {
    const result = formatTime('14:30:00:extra')
    expect(result).toBe('14.30 PM')
  })
})

describe('formatShortTime', () => {
  it('returns formatted time with ":00" when date is valid', () => {
    const date = dayjs('2025-06-16T14:30:00')
    expect(formatShortTime(date)).toBe('14:30:00')
  })

  it('returns empty string when date is undefined or invalid', () => {
    expect(formatShortTime(undefined)).toBe('')
  })
})

describe('getDateSkippingWeekend', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('returns Monday if today is Saturday', () => {
    jest.setSystemTime(new Date('2025-06-14')) // Saturday
    const result = getDateSkippingWeekend()
    expect(result.format('dddd')).toBe('Monday')
  })

  it('returns Monday if today is Sunday', () => {
    jest.setSystemTime(new Date('2025-06-15')) // Sunday
    const result = getDateSkippingWeekend()
    expect(result.format('dddd')).toBe('Monday')
  })

  it('returns today if weekday (e.g., Friday)', () => {
    jest.setSystemTime(new Date('2025-06-13')) // Friday
    const result = getDateSkippingWeekend()
    expect(result.format('dddd')).toBe('Friday')
  })
})

describe('getMaxDate', () => {
  it('returns date with 18 years subtracted by default', () => {
    jest.setSystemTime(new Date('2025-06-16'))
    const result = getMaxDate()
    expect(result.year()).toBe(2007)
  })

  it('returns date with custom years subtracted', () => {
    jest.setSystemTime(new Date('2025-06-16'))
    const result = getMaxDate(10)
    expect(result.year()).toBe(2015)
  })
})

describe('splitTime', () => {
  it('splits time string correctly', () => {
    expect(splitTime('12:45')).toEqual({ hour: 12, minute: 45 })
  })

  it('returns zero hour and minute when input is empty', () => {
    expect(splitTime(undefined)).toEqual({ hour: 0, minute: 0 })
  })
})
