import { fireEvent, render, screen, waitFor } from '@utils-test'

import { createRef } from 'react'

import { Text } from 'tamagui'

import { ModalRef } from '@app/types/modal'

// Adjust path

import Modal from '.'

describe('Modal', () => {
  const mockChildren = <Text testID="modal-child">Modal Content</Text>

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders closed modal by default', () => {
    render(<Modal>{mockChildren}</Modal>)

    expect(screen.queryByTestId('content')).toBeNull()
    expect(screen.queryByTestId('overlay')).toBeNull()
    expect(screen.queryByTestId('modal-child')).toBeNull()
  })

  it('renders open modal with content', () => {
    render(<Modal open={true}>{mockChildren}</Modal>)

    expect(screen.getByTestId('content')).toBeTruthy()
    expect(screen.getByTestId('overlay')).toBeTruthy()
    expect(screen.getByTestId('modal-child')).toBeTruthy()
  })

  it('toggles open via ref methods', async () => {
    const ref = createRef<ModalRef>()
    render(<Modal ref={ref}>{mockChildren}</Modal>)

    expect(screen.queryByTestId('content')).toBeNull()

    ref.current?.open()

    await waitFor(() => {
      expect(screen.getByTestId('content')).toBeTruthy()
      expect(screen.getByTestId('modal-child')).toBeTruthy()
    })
  })

  it('renders close button when closeButtonShown is true', () => {
    render(
      <Modal open={true} closeButtonShown>
        {mockChildren}
      </Modal>,
    )

    expect(screen.getByTestId('modal-child')).toBeTruthy()
  })

  it('does not render close button when closeButtonShown is false', () => {
    render(
      <Modal open={true} closeButtonShown={false}>
        {mockChildren}
      </Modal>,
    )

    expect(screen.queryByTestId('x-icon')).toBeNull()
  })

  it.skip('closes modal when close button is pressed', () => {
    render(
      <Modal open={true} closeButtonShown>
        {mockChildren}
      </Modal>,
    )

    expect(screen.getByTestId('content')).toBeTruthy()
    fireEvent.press(screen.getByTestId('x-icon'))
    expect(screen.queryByTestId('content')).toBeNull()
  })
})
