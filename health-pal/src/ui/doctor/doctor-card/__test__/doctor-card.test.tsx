import { useFavoritesStore } from '@/stores/favorite'
import { fireEvent, render, screen } from '@utils-test'

import { ROUTES } from '@/constants'

import { useAddFavorite } from '@/hooks/use-add-favorite'
import * as MockModal from '@/hooks/use-modal'
import { useRemoveFavorite } from '@/hooks/use-remove-favorite'

import { ModalRef } from '@/types/modal'

import DoctorCard from '..'

jest.mock('@/hooks/use-remove-favorite')
jest.mock('@/hooks/use-add-favorite')
jest.mock('@/stores/favorite')

describe('DoctorCard', () => {
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
    documentId: 'doc1',
    avatar: 'https://example.com/avatar.jpg',
    name: 'Dr. John Doe',
    specialty: 'Cardiology',
    address: '123 Main St, City',
    rating: 4.5,
    reviewCounter: 100,
    showReview: true,
    actionable: true,
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

  it('renders card content with reviews', () => {
    render(<DoctorCard {...defaultProps} />)

    expect(screen.getByLabelText('Image of Dr. John Doe')).toBeTruthy()
    expect(screen.getByText('Dr. John Doe')).toBeTruthy()
    expect(screen.getByText('Cardiology')).toBeTruthy()
    expect(screen.getByTestId('address-text')).toHaveTextContent('123 Main St, City')
    expect(screen.getByText('100 Reviews')).toBeTruthy()
    expect(screen.getByLabelText('Add Dr. John Doe to favorites')).toBeTruthy()
  })

  it('hides reviews when showReview is false', () => {
    render(<DoctorCard {...defaultProps} showReview={false} />)

    expect(screen.queryByText('100 Reviews')).not.toBeTruthy()
    expect(screen.queryByTestId('mock-stars')).not.toBeTruthy()
    expect(screen.queryByLabelText('Add Dr. John Doe to favorites')).not.toBeTruthy()
  })

  it('renders as non-actionable card without Link', () => {
    render(<DoctorCard {...defaultProps} actionable={false} />)

    expect(screen.queryByTestId('doctor-link')).not.toBeTruthy()
    expect(screen.getByLabelText('Image of Dr. John Doe')).toBeTruthy()
  })

  it('renders Link when actionable is true', () => {
    render(<DoctorCard {...defaultProps} />)

    const link = screen.getByTestId('doctor-link')
    expect(link).toHaveProp('href', ROUTES.DOCTOR.replace('[id]', 'doc1'))
    expect(link).toHaveProp('accessibilityLabel', 'View doctors at Dr. John Doe')
  })

  it('adds favorite when favorite button is pressed and no favoriteId', () => {
    render(<DoctorCard {...defaultProps} />)

    const favoriteButton = screen.getByLabelText('Add Dr. John Doe to favorites')
    fireEvent.press(favoriteButton)

    expect(mockAddFavorite).toHaveBeenCalledWith(1)
    expect(mockRef.current?.open).not.toHaveBeenCalled()
  })

  it('opens confirmation modal when favorite button is pressed with favoriteId', () => {
    ;(useFavoritesStore as unknown as jest.Mock).mockReturnValue('fav1')
    render(<DoctorCard {...defaultProps} />)

    const favoriteButton = screen.getByLabelText('Remove Dr. John Doe from favorites')
    fireEvent.press(favoriteButton)

    expect(mockRef.current?.open).toHaveBeenCalled()
    expect(mockAddFavorite).not.toHaveBeenCalled()
  })

  it('removes favorite when confirmation modal is confirmed', () => {
    ;(useFavoritesStore as unknown as jest.Mock).mockReturnValue('fav1')
    render(<DoctorCard {...defaultProps} />)

    const favoriteButton = screen.getByLabelText('Remove Dr. John Doe from favorites')
    fireEvent.press(favoriteButton)

    const removeButton = screen.getByTestId('remove-favorite-button')
    fireEvent.press(removeButton)

    expect(mockRef.current?.close).toHaveBeenCalled()
    expect(mockRemoveFavorite).toHaveBeenCalledWith('fav1')
  })

  it('has correct accessibility attributes', () => {
    render(<DoctorCard {...defaultProps} />)

    const image = screen.getByLabelText('Image of Dr. John Doe')
    const favoriteButton = screen.getByLabelText('Add Dr. John Doe to favorites')
    const link = screen.getByTestId('doctor-link')

    expect(image).toHaveProp('aria-label', 'Image of Dr. John Doe')
    expect(image).toHaveProp('role', 'img')
    expect(favoriteButton).toHaveProp('aria-label', 'Add Dr. John Doe to favorites')
    expect(favoriteButton).toHaveProp('role', 'button')
    expect(link).toHaveProp('accessibilityLabel', 'View doctors at Dr. John Doe')
    expect(link).toHaveProp('accessibilityHint', 'Shows this doctor in the doctor list')
    expect(link).toHaveProp('role', 'link')
  })

  it('disables card during add/remove favorite operations', () => {
    ;(useAddFavorite as jest.Mock).mockReturnValue({ mutate: mockAddFavorite, isPending: true })
    render(<DoctorCard {...defaultProps} />)

    const card = screen.getByTestId('doctor-link')
    expect(card).toHaveProp('disabled', true)
  })

  it('matches snapshot', () => {
    const { toJSON } = render(<DoctorCard {...defaultProps} />)
    expect(toJSON()).toMatchSnapshot()
  })
})
