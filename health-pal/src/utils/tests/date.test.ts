import { formatTime } from '../date'

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
