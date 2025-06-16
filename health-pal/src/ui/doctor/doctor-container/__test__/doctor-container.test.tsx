import { MOCK_DOCTORS } from '@/mocks/doctor'
import { MOCK_USER } from '@/mocks/user'
import { TDoctorData } from '@/models/doctor'
import { fireEvent, render, screen, waitFor } from '@utils-test'

import { useDoctors } from '@/hooks/use-doctors'
import { useFavoriteDoctors } from '@/hooks/use-favorite'

import { StrapiPagination } from '@/types/strapi'

import DoctorContainer from '..'

jest.mock('@/hooks/use-doctors', () => ({
  useDoctors: jest.fn(),
}))
jest.mock('@/hooks/use-favorite')

jest.mock('@/hooks/use-require-auth', () => ({
  useRequireAuth: jest.fn().mockReturnValue({
    session: { user: MOCK_USER },
  }),
}))

describe('DoctorContainer', () => {
  const mockData: StrapiPagination<TDoctorData> = {
    data: MOCK_DOCTORS,
    meta: {
      pagination: {
        page: 1,
        pageCount: 2,
        pageSize: 10,
        total: 15,
      },
    },
  }
  const mockDoctorsResponse = {
    data: mockData,
    isFetching: false,
    isLoading: false,
    error: null,
    fetchNextPage: jest.fn(),
    refetch: jest.fn(),
    hasNextPage: true,
    isFetchingNextPage: false,
  }
  const mockFavoriteResponse = {
    isLoading: false,
  }
  const defaultProps = {
    query: '',
    specialty: ['Cardiology'],
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useDoctors as jest.Mock).mockReturnValue(mockDoctorsResponse)
    ;(useFavoriteDoctors as jest.Mock).mockReturnValue(mockFavoriteResponse)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders DoctorListSkeleton when loading', () => {
    ;(useDoctors as jest.Mock).mockReturnValue({ ...mockDoctorsResponse, isLoading: true })
    render(<DoctorContainer {...defaultProps} />)

    expect(screen.getByTestId('doctor-list-skeleton')).toBeTruthy()
  })

  it('renders DoctorListSkeleton when favorite doctors are loading', () => {
    ;(useFavoriteDoctors as jest.Mock).mockReturnValue({ ...mockFavoriteResponse, isLoading: true })
    render(<DoctorContainer {...defaultProps} />)

    expect(screen.getByTestId('doctor-list-skeleton')).toBeTruthy()
  })

  it('renders ErrorState when there is an error', () => {
    const error = new Error('Failed to fetch doctors')
    ;(useDoctors as jest.Mock).mockReturnValue({
      ...mockDoctorsResponse,
      error,
      data: null,
    })
    render(<DoctorContainer {...defaultProps} />)

    expect(screen.getByText('Failed to Load')).toBeTruthy()
    expect(screen.getByText('Please check your internet connection.')).toBeTruthy()
  })

  it('renders Empty component when data is empty', () => {
    ;(useDoctors as jest.Mock).mockReturnValue({
      ...mockDoctorsResponse,
      data: { data: [], meta: { pagination: { page: 1, pageCount: 0, pageSize: 10, total: 0 } } },
    })
    render(<DoctorContainer {...defaultProps} />)

    expect(screen.getByText('No Doctors Found')).toBeTruthy()
    expect(screen.getByText('Try adjusting your filters or check back later.')).toBeTruthy()
  })

  it('renders DoctorList with data when available', () => {
    render(<DoctorContainer {...defaultProps} />)
    expect(screen.getByText('15 founds')).toBeTruthy()
  })

  it('renders LoadingIndicator when fetching but not fetching next page', () => {
    ;(useDoctors as jest.Mock).mockReturnValue({
      ...mockDoctorsResponse,
      isFetching: true,
      isFetchingNextPage: false,
    })
    render(<DoctorContainer {...defaultProps} />)

    expect(screen.getByTestId('loading-indicator')).toBeTruthy()
  })

  it('renders Spinner in ListFooterComponent when hasNextPage is true', async () => {
    render(<DoctorContainer {...defaultProps} />)

    await waitFor(() => {
      expect(screen.getByTestId('spinner')).toBeTruthy()
    })
  })

  it('does not render Spinner in ListFooterComponent when hasNextPage is false', () => {
    ;(useDoctors as jest.Mock).mockReturnValue({ ...mockDoctorsResponse, hasNextPage: false })
    render(<DoctorContainer {...defaultProps} />)

    expect(screen.queryByTestId('spinner')).not.toBeTruthy()
  })

  it('calls fetchNextPage onEndReached', () => {
    render(<DoctorContainer {...defaultProps} />)

    const doctorList = screen.getByTestId('doctor-list')
    fireEvent(doctorList, 'onEndReached')

    expect(mockDoctorsResponse.fetchNextPage).toHaveBeenCalled()
  })

  it('calls refetch on Empty component action', () => {
    ;(useDoctors as jest.Mock).mockReturnValue({
      ...mockDoctorsResponse,
      data: { data: [], meta: { pagination: { page: 1, pageCount: 0, pageSize: 10, total: 0 } } },
    })
    render(<DoctorContainer {...defaultProps} />)

    const emptyComponent = screen.getByText('Refresh')
    fireEvent.press(emptyComponent, 'onAction')

    expect(mockDoctorsResponse.refetch).toHaveBeenCalled()
  })

  it('calls refetch on ErrorState retry', () => {
    const error = new Error('Failed to fetch doctors')
    ;(useDoctors as jest.Mock).mockReturnValue({
      ...mockDoctorsResponse,
      error,
      data: null,
    })
    render(<DoctorContainer {...defaultProps} />)

    const errorState = screen.getByTestId('retry-button')
    fireEvent.press(errorState)

    expect(mockDoctorsResponse.refetch).toHaveBeenCalled()
  })

  it('matches snapshot', () => {
    const { toJSON } = render(<DoctorContainer {...defaultProps} />)
    expect(toJSON()).toMatchSnapshot()
  })
})
