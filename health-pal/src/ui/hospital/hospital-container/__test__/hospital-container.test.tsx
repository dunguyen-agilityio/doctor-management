import { MOCK_USER } from '@/mocks/user'
import { render, screen } from '@utils-test'

import { FAVORITE_EMPTY } from '@/constants'

import { useHospitals } from '@/hooks/use-hospitals'

import HospitalContainer from '..'

jest.mock('@/hooks/use-hospitals')

const mockUseHospitals = useHospitals as jest.Mock

jest.mock('@/hooks/use-require-auth', () => ({
  useRequireAuth: jest.fn().mockReturnValue({
    session: { user: MOCK_USER },
  }),
}))

describe('HospitalContainer', () => {
  const mockQuery = 'search'

  it('shows skeleton on initial loading', () => {
    mockUseHospitals.mockReturnValue({ isLoading: true })

    render(<HospitalContainer query={mockQuery} />)

    expect(screen.getByTestId('hospital-skeleton')).toBeTruthy()
  })

  it('shows loading on fetching', () => {
    mockUseHospitals.mockReturnValue({ isFetching: true, isFetchingNextPage: false })

    render(<HospitalContainer query={mockQuery} />)

    expect(screen.getByTestId('loading-indicator')).toBeTruthy()
  })

  it('shows error message on error state', () => {
    mockUseHospitals.mockReturnValue({ error: true, isFetching: false })

    render(<HospitalContainer query={mockQuery} />)

    expect(screen.getByText('Error Loading Favorites')).toBeTruthy()
  })

  it('shows empty state when no data', () => {
    mockUseHospitals.mockReturnValue({
      isLoading: false,
      data: { data: [] },
      isFetching: false,
      hasNextPage: false,
    })

    render(<HospitalContainer query={mockQuery} />)

    expect(screen.getByText(FAVORITE_EMPTY.hospital.title)).toBeTruthy()
  })

  it('renders HospitalList with valid data', () => {
    mockUseHospitals.mockReturnValue({
      isLoading: false,
      data: {
        data: [
          { id: 1, name: 'City Hospital' },
          { id: 2, name: 'City Hospital' },
        ],
      },
      isFetching: false,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
    })

    render(<HospitalContainer query={mockQuery} />)

    expect(screen.getByTestId('hospital-list')).toBeTruthy()
  })

  it('shows footer spinner if hasNextPage is true', () => {
    mockUseHospitals.mockReturnValue({
      isLoading: false,
      data: { data: [{ id: 1, name: 'City Hospital' }] },
      isFetching: false,
      isFetchingNextPage: false,
      hasNextPage: true,
      fetchNextPage: jest.fn(),
    })

    render(<HospitalContainer query={mockQuery} />)

    expect(screen.getByTestId('hospital-list')).toBeTruthy()
    expect(screen.getByTestId('spinner')).toBeTruthy()
  })
})
