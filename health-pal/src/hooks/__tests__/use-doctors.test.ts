import { MOCK_DOCTORS } from '@/mocks/doctor'
// Adjust path
import { TDoctorData } from '@/models/doctor'
import { renderHook, waitFor } from '@utils-test'

// Adjust path
import { useInfiniteQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'

import { getDoctors } from '@/services/doctor'

import { StrapiPagination } from '@/types/strapi'

import { useAppLoading } from '../use-app-loading'
import useDoctors from '../use-doctors'

// Mock dependencies
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useInfiniteQuery: jest.fn(),
}))

jest.mock('expo-router', () => ({
  useLocalSearchParams: jest.fn(),
}))

jest.mock('@/services/doctor', () => ({
  getDoctors: jest.fn(),
}))

jest.mock('../use-app-loading', () => ({
  useAppLoading: jest.fn(),
}))

describe('useDoctors', () => {
  const mockDoctor: TDoctorData = {
    ...MOCK_DOCTORS[0],
  }
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
  }
  const mockSetAppLoading = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useLocalSearchParams as jest.Mock).mockReturnValue({
      specialty: 'Cardiology',
      query: '',
      page: '1',
    })
    ;(useAppLoading as jest.Mock).mockReturnValue(mockSetAppLoading)
    ;(useInfiniteQuery as jest.Mock).mockReturnValue(mockQueryResponse)
    ;(getDoctors as jest.Mock).mockResolvedValue(mockResponse)
  })

  it('returns query response from useInfiniteQuery', () => {
    const { result } = renderHook(() => useDoctors())

    expect(result.current).toEqual(mockQueryResponse)
  })

  it('queryFn calls getDoctors with correct filters and pagination', async () => {
    let queryFn: ({ pageParam }: { pageParam: number }) => Promise<StrapiPagination<TDoctorData>>
    ;(useInfiniteQuery as jest.Mock).mockImplementation(({ queryFn: fn }) => {
      queryFn = fn
      return mockQueryResponse
    })

    renderHook(() => useDoctors())

    await waitFor(async () => {
      const result = await queryFn({ pageParam: 1 })
      expect(getDoctors).toHaveBeenCalledWith({
        pagination: { page: 1 },
        filters: [{ key: 'filters[specialty][name][$eqi]', query: 'Cardiology' }],
      })
      expect(result).toEqual(mockResponse)
      expect(mockSetAppLoading).toHaveBeenCalledWith(true)
      expect(mockSetAppLoading).toHaveBeenCalledWith(false)
    })
  })

  it('handles array of specialties in filters', async () => {
    ;(useLocalSearchParams as jest.Mock).mockReturnValue({
      specialty: ['Cardiology', 'Neurology'],
      query: '',
      page: '1',
    })

    let queryFn: ({ pageParam }: { pageParam: number }) => Promise<StrapiPagination<TDoctorData>>
    ;(useInfiniteQuery as jest.Mock).mockImplementation(({ queryFn: fn }) => {
      queryFn = fn
      return mockQueryResponse
    })

    renderHook(() => useDoctors())

    await waitFor(async () => {
      await queryFn({ pageParam: 1 })
      expect(getDoctors).toHaveBeenCalledWith({
        pagination: { page: 1 },
        filters: [
          { key: 'filters[specialty][name][$eqi]', query: 'Cardiology' },
          { key: 'filters[specialty][name][$eqi]', query: 'Neurology' },
        ],
      })
    })
  })

  it('includes query filter when provided', async () => {
    ;(useLocalSearchParams as jest.Mock).mockReturnValue({
      specialty: 'Cardiology',
      query: 'Smith',
      page: '1',
    })

    let queryFn: ({ pageParam }: { pageParam: number }) => Promise<StrapiPagination<TDoctorData>>
    ;(useInfiniteQuery as jest.Mock).mockImplementation(({ queryFn: fn }) => {
      queryFn = fn
      return mockQueryResponse
    })

    renderHook(() => useDoctors())

    await waitFor(async () => {
      await queryFn({ pageParam: 1 })
      expect(getDoctors).toHaveBeenCalledWith({
        pagination: { page: 1 },
        filters: [
          { key: 'filters[specialty][name][$eqi]', query: 'Cardiology' },
          { key: 'filters[users_permissions_user][name][$containsi]', query: 'Smith' },
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

    renderHook(() => useDoctors())

    expect(getNextPageParam(mockResponse)).toBe(2) // page: 1, pageCount: 2
    expect(
      getNextPageParam({ ...mockResponse, meta: { pagination: { page: 2, pageCount: 2 } } }),
    ).toBeUndefined()
  })

  it('getPreviousPageParam returns previous page or undefined', () => {
    let getPreviousPageParam: (params: StrapiPagination<TDoctorData>) => number | undefined =
      jest.fn()
    ;(useInfiniteQuery as jest.Mock).mockImplementation(({ getPreviousPageParam: fn }) => {
      getPreviousPageParam = fn
      return mockQueryResponse
    })

    renderHook(() => useDoctors())

    expect(getPreviousPageParam(mockResponse)).toBeUndefined() // page: 1
    expect(
      getPreviousPageParam({ ...mockResponse, meta: { pagination: { page: 2, pageCount: 2 } } }),
    ).toBe(1)
  })

  it('select transforms pages correctly', () => {
    const mockPages = [
      { data: [mockDoctor], meta: { pagination: { page: 1, pageCount: 2 } } },
      { data: [{ ...mockDoctor, id: '2' }], meta: { pagination: { page: 2, pageCount: 2 } } },
    ]
    let select: (data: { pages: StrapiPagination<TDoctorData>[] }) => any = jest.fn()
    ;(useInfiniteQuery as jest.Mock).mockImplementation(({ select: fn }) => {
      select = fn
      return mockQueryResponse
    })

    renderHook(() => useDoctors())

    const result = select({ pages: mockPages })
    expect(result).toEqual({
      meta: { pagination: { page: 2, pageCount: 2 } },
      data: [mockDoctor, { ...mockDoctor, id: '2' }],
    })
  })

  it('handles loading state', () => {
    ;(useInfiniteQuery as jest.Mock).mockReturnValue({
      ...mockQueryResponse,
      isLoading: true,
      data: undefined,
    })

    const { result } = renderHook(() => useDoctors())

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

    const { result } = renderHook(() => useDoctors())

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
      expect(result.current.error).toEqual(error)
      expect(result.current.data).toBeUndefined()
    })
  })
})
