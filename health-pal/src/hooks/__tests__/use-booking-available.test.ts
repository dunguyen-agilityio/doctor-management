import { renderHook, waitFor } from '@utils-test'

import { useQuery } from '@tanstack/react-query'

import { getBookingAvailable } from '@/services/booking'

import { useBookingAvailable } from '../use-booking-available'

// Mock dependencies
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}))

jest.mock('@/services/booking', () => ({
  getBookingAvailable: jest.fn(),
}))

describe('useBookingAvailable', () => {
  const mockDoctorId = 'doc123'
  const mockDate = '2025-05-26'
  const mockAvailability = [
    { time: '09:00', available: true },
    { time: '10:00', available: false },
  ]
  const mockQueryResponse = {
    data: mockAvailability,
    isLoading: false,
    isError: false,
    error: null,
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useQuery as jest.Mock).mockReturnValue(mockQueryResponse)
    ;(getBookingAvailable as jest.Mock).mockResolvedValue(mockAvailability)
  })

  it('calls useQuery with correct queryKey and queryFn', () => {
    renderHook(() => useBookingAvailable(mockDoctorId, mockDate))

    expect(useQuery).toHaveBeenCalledWith({
      queryKey: ['booking-available', mockDoctorId, mockDate],
      queryFn: expect.any(Function),
    })
  })

  it('returns query response from useQuery', () => {
    const { result } = renderHook(() => useBookingAvailable(mockDoctorId, mockDate))

    expect(result.current).toEqual(mockQueryResponse)
  })

  it('queryFn calls getBookingAvailable with correct doctorId and date', async () => {
    let queryFn: () => Promise<any>
    ;(useQuery as jest.Mock).mockImplementation(({ queryFn: fn }) => {
      queryFn = fn
      return mockQueryResponse
    })

    renderHook(() => useBookingAvailable(mockDoctorId, mockDate))

    await waitFor(async () => {
      const result = await queryFn()
      expect(getBookingAvailable).toHaveBeenCalledWith(mockDoctorId, mockDate)
      expect(result).toEqual(mockAvailability)
    })
  })

  it('handles loading state', () => {
    ;(useQuery as jest.Mock).mockReturnValue({
      ...mockQueryResponse,
      isLoading: true,
      data: undefined,
    })

    const { result } = renderHook(() => useBookingAvailable(mockDoctorId, mockDate))

    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBeUndefined()
  })

  it('handles error state', async () => {
    const error = new Error('Failed to fetch availability')
    ;(useQuery as jest.Mock).mockReturnValue({
      ...mockQueryResponse,
      isError: true,
      error,
      data: undefined,
    })
    ;(getBookingAvailable as jest.Mock).mockRejectedValue(error)

    const { result } = renderHook(() => useBookingAvailable(mockDoctorId, mockDate))

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
      expect(result.current.error).toEqual(error)
      expect(result.current.data).toBeUndefined()
    })
  })
})
