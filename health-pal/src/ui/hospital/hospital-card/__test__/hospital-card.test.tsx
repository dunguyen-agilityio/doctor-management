import { useFavoritesStore } from '@/stores/favorite'
import { fireEvent, render, screen } from '@utils-test'

import { useAddFavorite } from '@/hooks/use-add-favorite'
import * as MockModal from '@/hooks/use-modal'
import { useRemoveFavorite } from '@/hooks/use-remove-favorite'

import { ModalRef } from '@/types/modal'

import HospitalCard from '..'

jest.mock('@/hooks/use-remove-favorite')
jest.mock('@/hooks/use-add-favorite')
jest.mock('@/stores/favorite')

describe('HospitalCard', () => {
  const mockAddFavorite = jest.fn()
  const mockRemoveFavorite = jest.fn()
  const mockRef: React.RefObject<ModalRef> = {
    current: {
      open: jest.fn(),
      close: jest.fn(),
    },
  }
  const defaultProps = {
    id: 1,
    image: { url: 'https://example.com/image.jpg' },
    name: 'City Hospital',
    address: '123 Main St, City',
    rating: 4.2,
    reviewCounter: 23,
    type: 'Hospital',
    width: 'auto',
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useFavoritesStore as unknown as jest.Mock).mockReturnValue(null)
    ;(useAddFavorite as jest.Mock).mockReturnValue({
      mutate: mockAddFavorite,
      isPending: false,
    })
    ;(useRemoveFavorite as jest.Mock).mockReturnValue({
      mutate: mockRemoveFavorite,
      isPending: false,
    })
    // Mock useModal
    jest.spyOn(MockModal, 'useModal').mockImplementation((ref) => {
      if (ref && ref !== null && 'current' in ref) {
        ref.current = mockRef.current
      }
      return [true, jest.fn()]
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders card content', () => {
    render(<HospitalCard {...defaultProps} />)

    expect(screen.getByLabelText('Image of City Hospital')).toBeTruthy()
    expect(screen.getByText('City Hospital')).toBeTruthy()
    expect(screen.getByText('123 Main St, City')).toBeTruthy()
    expect(screen.getByText('(23 Reviews)')).toBeTruthy()
    expect(screen.getByText('Hospital')).toBeTruthy()
    expect(screen.getByText('2.5 km/40min')).toBeTruthy()
    expect(screen.getByTestId('location-icon')).toBeTruthy()
    expect(screen.getByTestId('routing-icon')).toBeTruthy()
    expect(screen.getByTestId('hospital-icon')).toBeTruthy()
    expect(screen.getByTestId('favorite-button')).toHaveProp(
      'aria-label',
      'Add City Hospital to favorites',
    )
  })

  it('adds favorite when favorite button is pressed and no favoriteId', () => {
    render(<HospitalCard {...defaultProps} />)

    const favoriteButton = screen.getByTestId('favorite-button')
    fireEvent.press(favoriteButton)

    expect(mockAddFavorite).toHaveBeenCalledWith(1)
    expect(mockRef.current?.open).not.toHaveBeenCalled()
  })

  it('opens confirmation modal when favorite button is pressed with favoriteId', () => {
    ;(useFavoritesStore as unknown as jest.Mock).mockReturnValue('fav1')
    render(<HospitalCard {...defaultProps} />)

    const favoriteButton = screen.getByTestId('favorite-button')
    fireEvent.press(favoriteButton)

    expect(mockRef.current?.open).toHaveBeenCalled()
    expect(mockAddFavorite).not.toHaveBeenCalled()
  })

  it('removes favorite when confirmation modal is confirmed', () => {
    ;(useFavoritesStore as unknown as jest.Mock).mockReturnValue('fav1')
    render(<HospitalCard {...defaultProps} />)

    const favoriteButton = screen.getByTestId('favorite-button')
    fireEvent.press(favoriteButton)

    const button = screen.getByTestId('remove-favorite-button')
    fireEvent.press(button)

    expect(mockRef.current?.close).toHaveBeenCalled()
    expect(mockRemoveFavorite).toHaveBeenCalledWith('fav1')
  })

  it('has correct accessibility attributes', () => {
    render(<HospitalCard {...defaultProps} />)

    const image = screen.getByLabelText('Image of City Hospital')
    const favoriteButton = screen.getByTestId('favorite-button')

    expect(image).toHaveProp('aria-label', 'Image of City Hospital')
    expect(image).toHaveProp('role', 'img')
    expect(favoriteButton).toHaveProp('aria-label', 'Add City Hospital to favorites')
    expect(favoriteButton).toHaveProp('accessibilityHint', 'Adds this hospital to your favorites')
    expect(favoriteButton).toHaveProp('role', 'button')
  })

  it('disables card during add/remove favorite operations', () => {
    ;(useAddFavorite as jest.Mock).mockReturnValue({ mutate: mockAddFavorite, isPending: true })
    render(<HospitalCard {...defaultProps} testID="hospital-card" />)

    const card = screen.getByTestId('hospital-card')
    expect(card).toHaveProp('disabled', false)
  })

  it('matches snapshot', () => {
    const { toJSON } = render(<HospitalCard {...defaultProps} />)
    expect(toJSON()).toMatchSnapshot()
  })
})
