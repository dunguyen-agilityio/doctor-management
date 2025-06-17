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
    fetchNextPage: jest.fn(),
  }

  beforeEach(() => {
    ;(useInfiniteQuery as jest.Mock).mockReturnValue(mockQueryResponse)
    ;(getHospitals as jest.Mock).mockResolvedValue(mockHospitals)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('calls useQuery with correct queryKey and queryFn', () => {
    renderHook(() => useHospitals('qu'))

    expect(useInfiniteQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ['hospitals', 'qu'],
      }),
    )
  })

  it('returns query response from useQuery', () => {
    const { result } = renderHook(() => useHospitals())

    expect(result.current).toEqual(mockQueryResponse)
  })

  it('queryFn calls getHospitals', async () => {
    let queryFn: () => Promise<any>
    ;(useInfiniteQuery as jest.Mock).mockImplementation(
      ({ queryFn: fn, getNextPageParam: getNextPage, getPreviousPageParam: getPreviousPage }) => {
        queryFn = fn
        return mockQueryResponse
      },
    )

    renderHook(() => useHospitals('qu'))

    await waitFor(async () => {
      const result = await queryFn({ pageParam: 1 })
      expect(getHospitals).toHaveBeenCalled()
      expect(result).toEqual(mockHospitals)
    })
  })

  it('queryFn calls getHospitals', async () => {
    let queryFn: (param: { pageParam: number }) => Promise<any>
    let getNextPageParam: jest.Mock
    ;(useInfiniteQuery as jest.Mock).mockImplementation(
      ({ queryFn: fn, getNextPageParam: getNextPage, getPreviousPageParam: getPreviousPage }) => {
        queryFn = fn
        getNextPageParam = getNextPage
        return mockQueryResponse
      },
    )

    renderHook(() => useHospitals('qu'))

    await waitFor(() => {
      queryFn({
        pageParam: getNextPageParam({
          meta: {
            pagination: {
              page: 1,
              pageCount: 10,
            },
          },
        }),
      })
      expect(getHospitals).toHaveBeenCalledWith(
        expect.objectContaining({
          pagination: { page: 2, pageSize: 10 },
        }),
      )
    })
  })

  it('queryFn calls getHospitals', async () => {
    let queryFn: (param: { pageParam: number }) => Promise<any>
    let getPreviousPageParam: jest.Mock
    ;(useInfiniteQuery as jest.Mock).mockImplementation(
      ({ queryFn: fn, getNextPageParam: getNextPage, getPreviousPageParam: getPreviousPage }) => {
        queryFn = fn
        getPreviousPageParam = getPreviousPage
        return mockQueryResponse
      },
    )

    renderHook(() => useHospitals('qu'))

    await waitFor(() => {
      queryFn({
        pageParam: getPreviousPageParam({
          meta: {
            pagination: {
              page: 3,
              pageCount: 10,
            },
          },
        }),
      })
      expect(getHospitals).toHaveBeenCalledWith(
        expect.objectContaining({
          pagination: { page: 2, pageSize: 10 },
        }),
      )
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
