import { fireEvent, render } from '@utils-test'

import { FAVORITE_TYPES } from '@/types/favorite'

import FavoriteButton from '..'

describe('FavoriteButton', () => {
  const defaultProps = {
    itemId: 1,
    itemName: 'Sample Item',
  }

  it('renders HeartFill when favoriteId is present', () => {
    const { getByTestId } = render(<FavoriteButton {...defaultProps} favoriteId="fav_123" />)

    expect(getByTestId('heart-fill')).toBeTruthy()
  })

  it('renders HeartOutline when favoriteId is not present', () => {
    const { getByTestId } = render(<FavoriteButton {...defaultProps} />)

    expect(getByTestId('heart-outline')).toBeTruthy()
  })

  it('uses hospital variant styles', () => {
    const { getByTestId } = render(
      <FavoriteButton {...defaultProps} type={FAVORITE_TYPES.HOSPITAL} testID="favorite-button" />,
    )
    const button = getByTestId('favorite-button')

    expect(button.props.style).toEqual(
      expect.objectContaining({
        backgroundColor: 'rgba(31, 42, 55, 0.20)',
      }),
    )
  })

  it('uses doctor variant styles', () => {
    const { getByTestId } = render(
      <FavoriteButton {...defaultProps} type={FAVORITE_TYPES.DOCTOR} testID="favorite-button" />,
    )
    const button = getByTestId('favorite-button')

    expect(button.props.style).toEqual(
      expect.objectContaining({
        backgroundColor: 'transparent',
      }),
    )
  })

  it('calls onPress when clicked', () => {
    const onPressMock = jest.fn()
    const { getByTestId } = render(
      <FavoriteButton {...defaultProps} onPress={onPressMock} testID="favorite-button" />,
    )
    const button = getByTestId('favorite-button')

    fireEvent.press(button)
    expect(onPressMock).toHaveBeenCalled()
  })
})
