import { MOCK_DOCTORS } from '@/mocks/doctor'
import { BookingData, BookingKey } from '@/models/booking'
import { fireEvent, render, screen, waitFor } from '@utils-test'

import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'

import { useRequireAuth } from '@/hooks/use-require-auth'

import { getBookings } from '@/services/booking'

import { BOOKING_TABS } from '@/types/booking'
import { StrapiPagination } from '@/types/strapi'

import BookingList from '..'

jest.mock('@/hooks/use-require-auth')
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}))
jest.mock('@/services/booking', () => ({
  ...jest.requireActual('@/services/booking'),
  getBookings: jest.fn(),
}))

describe('BookingList', () => {
  const mockBooking = {
    id: 1,
    date: dayjs('2025-07-01').toISOString(),
    documentId: 'booking1',
    type: BOOKING_TABS.UPCOMING,
    doctor: MOCK_DOCTORS[0],
    time: '09:00:00',
  } as BookingData
  const mockResponse: StrapiPagination<BookingData> = {
    data: [mockBooking],
    meta: { pagination: { page: 1, pageCount: 1, pageSize: 10, total: 1 } },
  }
  const mockQueryResponse = {
    isLoading: false,
    isFetching: false,
    data: mockResponse,
    error: null,
    refetch: jest.fn(),
  }
  const mockSession = { user: { id: 'user1' } }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRequireAuth as jest.Mock).mockReturnValue({ session: mockSession })
    ;(useQuery as jest.Mock).mockReturnValue(mockQueryResponse)
    ;(getBookings as jest.Mock).mockResolvedValue(mockResponse)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders BookingListSkeleton when loading', () => {
    ;(useQuery as jest.Mock).mockReturnValue({ ...mockQueryResponse, isLoading: true })
    render(<BookingList type={BOOKING_TABS.UPCOMING} />)

    expect(screen.getByTestId('booking-list-skeleton')).toBeTruthy()
  })

  it('renders BookingListSkeleton when fetching', () => {
    ;(useQuery as jest.Mock).mockReturnValue({ ...mockQueryResponse, isFetching: true })
    render(<BookingList type={BOOKING_TABS.UPCOMING} />)

    expect(screen.getByTestId('booking-list-skeleton')).toBeTruthy()
  })

  it('renders ErrorState when query fails', () => {
    const error = new Error('Failed to fetch bookings')
    ;(useQuery as jest.Mock).mockReturnValue({
      ...mockQueryResponse,
      error,
      data: null,
    })
    render(<BookingList type={BOOKING_TABS.UPCOMING} />)

    expect(screen.getByLabelText('Error loading bookings')).toBeTruthy()
  })

  it('renders Empty component when data is empty', () => {
    ;(useQuery as jest.Mock).mockReturnValue({
      ...mockQueryResponse,
      data: { data: [], meta: { pagination: { page: 1, pageCount: 0, pageSize: 10, total: 0 } } },
    })
    render(<BookingList type={BOOKING_TABS.UPCOMING} />)

    expect(screen.getByLabelText('No upcoming bookings')).toBeTruthy()
  })

  it('renders FlashList with BookingCard when data is available', async () => {
    render(<BookingList type={BOOKING_TABS.UPCOMING} />)

    expect(screen.getByLabelText('upcoming bookings list')).toBeTruthy()
    await waitFor(() => {
      expect(screen.getByTestId('booking-card')).toBeTruthy()
    })
  })

  it('calls getBookings with correct filters for UPCOMING type', () => {
    ;(useQuery as jest.Mock).mockImplementation(({ queryFn: fn }) => {
      fn()
      return mockQueryResponse
    })

    render(<BookingList type={BOOKING_TABS.UPCOMING} />)

    expect(getBookings).toHaveBeenCalledWith({
      filters: expect.arrayContaining([
        { key: BookingKey.type, query: BOOKING_TABS.UPCOMING },
        // { key: 'filters[date][$gt]', query: '2025-06-16T00:00:00Z' },
      ]),
      userId: 'user1',
    })
  })

  it('calls getBookings with correct filters for COMPLETED type', () => {
    ;(useQuery as jest.Mock).mockImplementation(({ queryFn: fn }) => {
      fn()
      return mockQueryResponse
    })
    render(<BookingList type={BOOKING_TABS.COMPLETED} />)

    expect(getBookings).toHaveBeenCalledWith({
      filters: [{ key: BookingKey.type, query: BOOKING_TABS.COMPLETED }],
      userId: 'user1',
    })
  })

  it('calls getBookings with correct filters for CANCELED type', () => {
    ;(useQuery as jest.Mock).mockImplementation(({ queryFn: fn }) => {
      fn()
      return mockQueryResponse
    })

    render(<BookingList type={BOOKING_TABS.CANCELED} />)

    expect(getBookings).toHaveBeenCalledWith({
      filters: [{ key: BookingKey.type, query: BOOKING_TABS.CANCELED }],
      userId: 'user1',
    })
  })

  it('retries query on ErrorState retry', () => {
    const error = new Error('Failed to fetch bookings')
    ;(useQuery as jest.Mock).mockReturnValue({
      ...mockQueryResponse,
      error,
      data: null,
    })
    render(<BookingList type={BOOKING_TABS.UPCOMING} />)

    const retryButton = screen.getByTestId('retry-button')
    fireEvent.press(retryButton)

    expect(mockQueryResponse.refetch).toHaveBeenCalled()
  })

  it('has correct accessibility attributes', () => {
    render(<BookingList type={BOOKING_TABS.UPCOMING} />)

    const flashList = screen.getByLabelText('upcoming bookings list')
    expect(flashList).toHaveProp('aria-label', 'upcoming bookings list')
    expect(flashList).toHaveProp('accessibilityHint', 'List of upcoming bookings')
    expect(flashList).toHaveProp('role', 'list')
  })

  it('matches snapshot', () => {
    const { toJSON } = render(<BookingList type={BOOKING_TABS.UPCOMING} />)
    expect(toJSON()).toMatchSnapshot()
  })
})
