import { fireEvent, render } from '@utils-test'

import React from 'react'

import * as MockModal from '@/hooks/use-modal'

import { ModalRef } from '@/types/modal'

import RemoveFavoriteModal from '..'

let modalRef: React.RefObject<ModalRef | null>
let closeMock: jest.Mock

describe('RemoveFavoriteModal', () => {
  const setup = () => {
    const onConfirm = jest.fn()

    const utils = render(
      <RemoveFavoriteModal ref={modalRef} onConfirm={onConfirm}>
        <></>
      </RemoveFavoriteModal>,
    )

    return {
      ...utils,
      modalRef,
      onConfirm,
    }
  }

  beforeEach(() => {
    closeMock = jest.fn()
    modalRef = { current: { close: closeMock } } as unknown as React.RefObject<ModalRef>
    jest.spyOn(MockModal, 'useModal').mockImplementation((ref) => {
      if (ref && ref !== null && 'current' in ref) {
        ref.current = modalRef.current
      }
      return [true, jest.fn()]
    })
  })

  it('renders heading and buttons', () => {
    const { getByText, getByTestId } = setup()

    expect(getByText('Remove from Favorites?')).toBeTruthy()
    expect(getByText('Cancel')).toBeTruthy()
    expect(getByTestId('remove-favorite-button')).toBeTruthy()
  })

  it('calls onConfirm when pressing "Yes, Remove"', () => {
    const { getByTestId, onConfirm } = setup()

    fireEvent.press(getByTestId('remove-favorite-button'))

    expect(onConfirm).toHaveBeenCalled()
  })

  it('closes the modal when pressing "Cancel"', () => {
    const { getByText } = render(
      <RemoveFavoriteModal ref={modalRef} onConfirm={jest.fn()}>
        <></>
      </RemoveFavoriteModal>,
    )

    fireEvent.press(getByText('Cancel'))

    expect(closeMock).toHaveBeenCalled()
  })
})
