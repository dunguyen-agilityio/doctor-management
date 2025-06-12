import { renderHook, waitFor } from '@utils-test'

// Adjust path
import { useQuery } from '@tanstack/react-query'

import { getDoctor } from '@/services/doctor'

import useDoctor from '../use-doctor'

// Mock dependencies
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}))

jest.mock('@/services/doctor', () => ({
  getDoctor: jest.fn(),
}))

describe('useDoctor', () => {
  const mockDocId = 'doc123'
  const mockDoctor = {
    id: mockDocId,
    name: 'Dr. Smith',
    specialty: 'Cardiology',
  }
  const mockQueryResponse = {
    data: mockDoctor,
    isLoading: false,
    isError: false,
    error: null,
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useQuery as jest.Mock).mockReturnValue(mockQueryResponse)
    ;(getDoctor as jest.Mock).mockResolvedValue(mockDoctor)
  })

  it('calls useQuery with correct queryKey and queryFn', () => {
    renderHook(() => useDoctor(mockDocId))

    expect(useQuery).toHaveBeenCalledWith({
      queryKey: ['doctor', mockDocId],
      queryFn: expect.any(Function),
    })
  })

  it('returns query response from useQuery', () => {
    const { result } = renderHook(() => useDoctor(mockDocId))

    expect(result.current).toEqual(mockQueryResponse)
  })

  it('queryFn calls getDoctor with correct docId', async () => {
    let queryFn: () => Promise<any>
    ;(useQuery as jest.Mock).mockImplementation(({ queryFn: fn }) => {
      queryFn = fn
      return mockQueryResponse
    })

    renderHook(() => useDoctor(mockDocId))

    await waitFor(async () => {
      const result = await queryFn()
      expect(getDoctor).toHaveBeenCalledWith(mockDocId)
      expect(result).toEqual(mockDoctor)
    })
  })

  it('handles loading state', () => {
    ;(useQuery as jest.Mock).mockReturnValue({
      ...mockQueryResponse,
      isLoading: true,
      data: undefined,
    })

    const { result } = renderHook(() => useDoctor(mockDocId))

    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBeUndefined()
  })

  it('handles error state', async () => {
    const error = new Error('Failed to fetch doctor')
    ;(useQuery as jest.Mock).mockReturnValue({
      ...mockQueryResponse,
      isError: true,
      error,
      data: undefined,
    })
    ;(getDoctor as jest.Mock).mockRejectedValue(error)

    const { result } = renderHook(() => useDoctor(mockDocId))

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
      expect(result.current.error).toEqual(error)
      expect(result.current.data).toBeUndefined()
    })
  })
})
