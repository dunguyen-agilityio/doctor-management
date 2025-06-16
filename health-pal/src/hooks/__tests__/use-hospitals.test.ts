import { renderHook, waitFor } from '@utils-test'

import { useInfiniteQuery } from '@tanstack/react-query'

import { getHospitals } from '@/services/hospital'

import { useHospitals } from '../use-hospitals'

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useInfiniteQuery: jest.fn(),
}))

jest.mock('@/services/hospital', () => ({
  getHospitals: jest.fn(),
}))

describe('useHospitals', () => {
  const mockHospitals = [
    { id: 'hosp1', name: 'City Hospital', address: '123 Main St' },
    { id: 'hosp2', name: 'General Hospital', address: '456 Oak Ave' },
  ]
  const mockQueryResponse = {
    data: mockHospitals,
    isLoading: false,
    isError: false,
    error: null,
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useInfiniteQuery as jest.Mock).mockReturnValue(mockQueryResponse)
    ;(getHospitals as jest.Mock).mockResolvedValue(mockHospitals)
  })

  it('calls useQuery with correct queryKey and queryFn', () => {
    renderHook(() => useHospitals())

    expect(useInfiniteQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ['hospitals', ''],
      }),
    )
  })

  it('returns query response from useQuery', () => {
    const { result } = renderHook(() => useHospitals())

    expect(result.current).toEqual(mockQueryResponse)
  })

  it('queryFn calls getHospitals', async () => {
    let queryFn: () => Promise<any>
    ;(useInfiniteQuery as jest.Mock).mockImplementation(({ queryFn: fn }) => {
      queryFn = fn
      return mockQueryResponse
    })

    renderHook(() => useHospitals())

    await waitFor(async () => {
      const result = await queryFn({ pageParam: 1 })
      expect(getHospitals).toHaveBeenCalled()
      expect(result).toEqual(mockHospitals)
    })
  })

  it('handles loading state', () => {
    ;(useInfiniteQuery as jest.Mock).mockReturnValue({
      ...mockQueryResponse,
      isLoading: true,
      data: undefined,
    })

    const { result } = renderHook(() => useHospitals())

    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBeUndefined()
  })

  it('handles error state', async () => {
    const error = new Error('Failed to fetch hospitals')
    ;(useInfiniteQuery as jest.Mock).mockReturnValue({
      ...mockQueryResponse,
      isError: true,
      error,
      data: undefined,
    })
    ;(getHospitals as jest.Mock).mockRejectedValue(error)

    const { result } = renderHook(() => useHospitals())

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
      expect(result.current.error).toEqual(error)
      expect(result.current.data).toBeUndefined()
    })
  })
})
