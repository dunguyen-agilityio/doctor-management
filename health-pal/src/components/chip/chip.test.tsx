import { fireEvent, render } from '@utils-test'

import { tokens } from '@/tamagui.config'

import Chip from '.'

describe('Chip', () => {
  it('renders with text child', () => {
    const { getByText } = render(
      <Chip value="apple" onSelect={jest.fn()}>
        Apple
      </Chip>,
    )

    expect(getByText('Apple')).toBeTruthy()
  })

  it('calls onSelect when pressed', () => {
    const onSelectMock = jest.fn()

    const { getByText } = render(
      <Chip value="banana" onSelect={onSelectMock}>
        Banana
      </Chip>,
    )

    fireEvent.press(getByText('Banana'))
    expect(onSelectMock).toHaveBeenCalledWith('banana')
  })

  it('calls both onPress and onSelect', () => {
    const onSelectMock = jest.fn()
    const onPressMock = jest.fn()

    const { getByText } = render(
      <Chip value="mango" onSelect={onSelectMock} onPress={onPressMock}>
        Mango
      </Chip>,
    )

    fireEvent.press(getByText('Mango'))
    expect(onSelectMock).toHaveBeenCalledWith('mango')
    expect(onPressMock).toHaveBeenCalled()
  })

  it('applies active styling', () => {
    const { getByText } = render(
      <Chip value="kiwi" onSelect={jest.fn()} active>
        Kiwi
      </Chip>,
    )

    const chipText = getByText('Kiwi')
    expect(chipText.props.style).toEqual(
      expect.objectContaining({
        color: tokens.color.white.val,
      }),
    )
  })
})
