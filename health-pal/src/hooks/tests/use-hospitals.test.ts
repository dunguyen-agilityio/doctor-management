import { renderHook, waitFor } from '@utils-test'

import { useQuery } from '@tanstack/react-query'

import { getHospitals } from '@app/services/hospital'

import useHospitals from '../use-hospitals'

// Mock dependencies
jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}))

jest.mock('@app/services/hospital', () => ({
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
    ;(useQuery as jest.Mock).mockReturnValue(mockQueryResponse)
    ;(getHospitals as jest.Mock).mockResolvedValue(mockHospitals)
  })

  it('calls useQuery with correct queryKey and queryFn', () => {
    renderHook(() => useHospitals())

    expect(useQuery).toHaveBeenCalledWith({
      queryKey: ['hospitals'],
      queryFn: expect.any(Function),
    })
  })

  it('returns query response from useQuery', () => {
    const { result } = renderHook(() => useHospitals())

    expect(result.current).toEqual(mockQueryResponse)
  })

  it('queryFn calls getHospitals', async () => {
    let queryFn: () => Promise<any>
    ;(useQuery as jest.Mock).mockImplementation(({ queryFn: fn }) => {
      queryFn = fn
      return mockQueryResponse
    })

    renderHook(() => useHospitals())

    await waitFor(async () => {
      const result = await queryFn()
      expect(getHospitals).toHaveBeenCalled()
      expect(result).toEqual(mockHospitals)
    })
  })

  it('handles loading state', () => {
    ;(useQuery as jest.Mock).mockReturnValue({
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
    ;(useQuery as jest.Mock).mockReturnValue({
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
