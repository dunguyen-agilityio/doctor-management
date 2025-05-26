import { renderHook } from '@utils-test'

import useMediaQuery from '../use-media-query'

// Mock WINDOW_SIZE
jest.mock('@app/constants', () => ({
  WINDOW_SIZE: {
    width: 400,
    height: 800,
  },
}))

describe('useMediaQuery', () => {
  it('returns default width and height', () => {
    const { result } = renderHook(() => useMediaQuery({}))

    expect(result.current.width).toBe(342)
    expect(result.current.height).toBe(0)
  })

  it('respects custom width and height', () => {
    const { result } = renderHook(() => useMediaQuery({ w: 200, h: 100 }))

    expect(result.current.width).toBe(200)
    expect(result.current.height).toBe(100)
  })

  it('calculates full width and scaled height', () => {
    const { result } = renderHook(() => useMediaQuery({ w: 200, h: 100, full: true }))

    const expectedWidth = 400 - 24 * 2 // maxW = 352
    const expectedHeight = (expectedWidth * 100) / 200

    expect(result.current.width).toBe(expectedWidth)
    expect(result.current.height).toBe(expectedHeight)
  })

  it('calculates full width with zero height', () => {
    const { result } = renderHook(() => useMediaQuery({ h: 0, full: true }))

    expect(result.current.width).toBe(352)
    expect(result.current.height).toBe(0)
  })
})
