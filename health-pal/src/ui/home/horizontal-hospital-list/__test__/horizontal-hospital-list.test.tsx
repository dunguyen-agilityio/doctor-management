import { MOCK_USER } from '@/mocks/user'
import { fireEvent, render, screen } from '@utils-test'

import { useFavoriteHospitals } from '@/hooks/use-favorite'
import { useHospitals } from '@/hooks/use-hospitals'

import HorizontalHospitalList from '..'

jest.mock('@/hooks/use-favorite')
jest.mock('@/hooks/use-hospitals')

jest.mock('@/hooks/use-require-auth', () => ({
  useRequireAuth: jest.fn().mockReturnValue({
    session: { user: MOCK_USER },
  }),
}))

describe('HorizontalHospitalList', () => {
  const hospitals = [
    { id: 1, name: 'Hospital A' },
    { id: 2, name: 'Hospital B' },
    { id: 3, name: 'Hospital C' },
  ]

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('shows skeleton when loading', () => {
    ;(useHospitals as unknown as jest.Mock).mockReturnValue({
      isLoading: true,
      isFetching: false,
    })
    ;(useFavoriteHospitals as jest.Mock).mockReturnValue({
      isLoading: true,
    })

    render(<HorizontalHospitalList />)

    expect(screen.getByTestId('hospital-skeleton')).toBeTruthy()
  })

  it('shows error state when there is an error', () => {
    const refetch = jest.fn()
    ;(useHospitals as unknown as jest.Mock).mockReturnValue({
      isLoading: false,
      isFetching: false,
      error: true,
      refetch,
    })
    ;(useFavoriteHospitals as jest.Mock).mockReturnValue({
      isLoading: false,
    })

    render(<HorizontalHospitalList />)

    const error = screen.getByTestId('retry-button')
    expect(error).toBeTruthy()

    fireEvent.press(error)
    expect(refetch).toHaveBeenCalled()
  })

  it('renders hospital cards with proper margin for first and last items', () => {
    ;(useHospitals as unknown as jest.Mock).mockReturnValue({
      isLoading: false,
      isFetching: false,
      data: { data: hospitals },
    })
    ;(useFavoriteHospitals as jest.Mock).mockReturnValue({
      isLoading: false,
    })

    render(<HorizontalHospitalList />)

    const cards = screen.getAllByTestId('hospital-card')

    expect(cards.length).toBe(3)
  })

  it('matches snapshot', () => {
    ;(useHospitals as unknown as jest.Mock).mockReturnValue({
      isLoading: false,
      isFetching: false,
      data: { data: hospitals },
    })
    ;(useFavoriteHospitals as jest.Mock).mockReturnValue({
      isLoading: false,
    })

    const { toJSON } = render(<HorizontalHospitalList />)
    expect(toJSON()).toMatchSnapshot()
  })
})
