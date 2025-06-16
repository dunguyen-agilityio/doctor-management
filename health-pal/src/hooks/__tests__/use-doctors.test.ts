import { MOCK_DOCTORS } from '@/mocks/doctor'
import { TDoctorData } from '@/models/doctor'
import { renderHook, waitFor } from '@utils-test'

import { useInfiniteQuery } from '@tanstack/react-query'

import { DOCTOR_QUERY_KEY } from '@/constants/doctor'

import { getDoctors } from '@/services/doctor'

import { StrapiPagination } from '@/types/strapi'

import { useDoctors } from '../use-doctors'

// Mock dependencies
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useInfiniteQuery: jest.fn(),
}))

jest.mock('@/services/doctor', () => ({
  getDoctors: jest.fn(),
}))

describe('useDoctors', () => {
  const mockDoctor: TDoctorData = MOCK_DOCTORS[0]
  const mockResponse: StrapiPagination<TDoctorData> = {
    data: [mockDoctor],
    meta: {
      pagination: { page: 1, pageCount: 2, pageSize: 10, total: 15 },
    },
  }
  const mockQueryResponse = {
    data: { meta: mockResponse.meta, data: [mockDoctor] },
    isLoading: false,
    isError: false,
    error: null,
    fetchNextPage: jest.fn(),
    hasNextPage: true,
    isFetchingNextPage: false,
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useInfiniteQuery as jest.Mock).mockReturnValue(mockQueryResponse)
    ;(getDoctors as jest.Mock).mockResolvedValue(mockResponse)
  })

  it('returns query response from useInfiniteQuery', () => {
    const { result } = renderHook(() => useDoctors('', ['Cardiology']))

    expect(result.current).toEqual(mockQueryResponse)
    expect(useInfiniteQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ['doctors', 'Cardiology', ''],
        initialPageParam: 1,
      }),
    )
  })

  it('queryFn calls getDoctors with correct filters and pagination', async () => {
    let queryFn: ({ pageParam }: { pageParam: number }) => Promise<StrapiPagination<TDoctorData>>
    ;(useInfiniteQuery as jest.Mock).mockImplementation(({ queryFn: fn }) => {
      queryFn = fn
      return mockQueryResponse
    })

    renderHook(() => useDoctors('', ['Cardiology']))

    await waitFor(async () => {
      const result = await queryFn({ pageParam: 1 })
      expect(getDoctors).toHaveBeenCalledWith({
        pagination: { page: 1, pageSize: 10 },
        filters: [
          { key: DOCTOR_QUERY_KEY.filterSpecialty, query: 'Cardiology' },
          { key: 'sort', query: 'id:asc' },
        ],
      })
      expect(result).toEqual(mockResponse)
    })
  })

  it('handles array of specialties in filters', async () => {
    let queryFn: ({ pageParam }: { pageParam: number }) => Promise<StrapiPagination<TDoctorData>>
    ;(useInfiniteQuery as jest.Mock).mockImplementation(({ queryFn: fn }) => {
      queryFn = fn
      return mockQueryResponse
    })

    renderHook(() => useDoctors('', ['Cardiology', 'Neurology']))

    await waitFor(async () => {
      await queryFn({ pageParam: 1 })
      expect(getDoctors).toHaveBeenCalledWith({
        pagination: { page: 1, pageSize: 10 },
        filters: [
          { key: DOCTOR_QUERY_KEY.filterSpecialty, query: 'Cardiology' },
          { key: DOCTOR_QUERY_KEY.filterSpecialty, query: 'Neurology' },
          { key: 'sort', query: 'id:asc' },
        ],
      })
    })
  })

  it('includes query filter when provided', async () => {
    let queryFn: ({ pageParam }: { pageParam: number }) => Promise<StrapiPagination<TDoctorData>>
    ;(useInfiniteQuery as jest.Mock).mockImplementation(({ queryFn: fn }) => {
      queryFn = fn
      return mockQueryResponse
    })

    renderHook(() => useDoctors('Smith', ['Cardiology']))

    await waitFor(async () => {
      await queryFn({ pageParam: 1 })
      expect(getDoctors).toHaveBeenCalledWith({
        pagination: { page: 1, pageSize: 10 },
        filters: [
          { key: DOCTOR_QUERY_KEY.filterSpecialty, query: 'Cardiology' },
          { key: 'sort', query: 'id:asc' },
          { key: DOCTOR_QUERY_KEY.query, query: 'Smith' },
        ],
      })
    })
  })

  it('excludes "all" specialty from filters', async () => {
    let queryFn: ({ pageParam }: { pageParam: number }) => Promise<StrapiPagination<TDoctorData>>
    ;(useInfiniteQuery as jest.Mock).mockImplementation(({ queryFn: fn }) => {
      queryFn = fn
      return mockQueryResponse
    })

    renderHook(() => useDoctors('', ['all', 'Cardiology']))

    await waitFor(async () => {
      await queryFn({ pageParam: 1 })
      expect(getDoctors).toHaveBeenCalledWith({
        pagination: { page: 1, pageSize: 10 },
        filters: [
          { key: DOCTOR_QUERY_KEY.filterSpecialty, query: 'Cardiology' },
          { key: 'sort', query: 'id:asc' },
        ],
      })
    })
  })

  it('getNextPageParam returns next page or undefined', () => {
    let getNextPageParam: (lastPage: StrapiPagination<TDoctorData>) => number | undefined =
      jest.fn()
    ;(useInfiniteQuery as jest.Mock).mockImplementation(({ getNextPageParam: fn }) => {
      getNextPageParam = fn
      return mockQueryResponse
    })

    renderHook(() => useDoctors('', ['Cardiology']))

    expect(getNextPageParam(mockResponse)).toBe(2) // page: 1, pageCount: 2
    expect(
      getNextPageParam({
        ...mockResponse,
        meta: { pagination: { page: 2, pageCount: 2, pageSize: 10, total: 15 } },
      }),
    ).toBeUndefined()
  })

  it('getPreviousPageParam returns previous page or undefined', () => {
    let getPreviousPageParam: (params: StrapiPagination<TDoctorData>) => number | undefined =
      jest.fn()
    ;(useInfiniteQuery as jest.Mock).mockImplementation(({ getPreviousPageParam: fn }) => {
      getPreviousPageParam = fn
      return mockQueryResponse
    })

    renderHook(() => useDoctors('', ['Cardiology']))

    expect(getPreviousPageParam(mockResponse)).toBeUndefined() // page: 1
    expect(
      getPreviousPageParam({
        ...mockResponse,
        meta: { pagination: { page: 2, pageCount: 2, pageSize: 10, total: 15 } },
      }),
    ).toBe(1)
  })

  it('select transforms pages correctly', () => {
    const mockPages: StrapiPagination<TDoctorData>[] = [
      {
        data: [mockDoctor],
        meta: { pagination: { page: 1, pageCount: 2, pageSize: 10, total: 15 } },
      },
      {
        data: [{ ...mockDoctor, id: 2 }],
        meta: { pagination: { page: 2, pageCount: 2, pageSize: 10, total: 15 } },
      },
    ]
    let select: (data: { pages: StrapiPagination<TDoctorData>[] }) => any = jest.fn()
    ;(useInfiniteQuery as jest.Mock).mockImplementation(({ select: fn }) => {
      select = fn
      return mockQueryResponse
    })

    renderHook(() => useDoctors('', ['Cardiology']))

    const result = select({ pages: mockPages })
    expect(result).toEqual({
      meta: { pagination: { page: 2, pageCount: 2, pageSize: 10, total: 15 } },
      data: [mockDoctor, { ...mockDoctor, id: 2 }],
    })
  })

  it('handles loading state', () => {
    ;(useInfiniteQuery as jest.Mock).mockReturnValue({
      ...mockQueryResponse,
      isLoading: true,
      data: undefined,
    })

    const { result } = renderHook(() => useDoctors('', ['Cardiology']))

    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBeUndefined()
  })

  it('handles error state', async () => {
    const error = new Error('Failed to fetch doctors')
    ;(useInfiniteQuery as jest.Mock).mockReturnValue({
      ...mockQueryResponse,
      isError: true,
      error,
      data: undefined,
    })
    ;(getDoctors as jest.Mock).mockRejectedValue(error)

    const { result } = renderHook(() => useDoctors('', ['Cardiology']))

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
      expect(result.current.error).toEqual(error)
      expect(result.current.data).toBeUndefined()
    })
  })

  it('uses placeholderData to retain previous data', () => {
    const previousData = {
      pages: [{ ...mockResponse, data: [{ ...mockDoctor, id: 'prev' }] }],
      pageParams: [1],
    }
    let placeholderData: (data: any) => any = jest.fn()
    ;(useInfiniteQuery as jest.Mock).mockImplementation(({ placeholderData: fn }) => {
      placeholderData = fn
      return mockQueryResponse
    })

    renderHook(() => useDoctors('', ['Cardiology']))

    expect(placeholderData(previousData)).toBe(previousData)
  })
})
