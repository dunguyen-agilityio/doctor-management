import { render } from '@utils-test'

import React from 'react'
import { BackHandler } from 'react-native'

import * as MockModal from '@/hooks/use-modal'

import { ModalRef } from '@/types'

import PreventBackHandler from '..'

jest.mock('expo-router', () => ({
  usePathname: () => '/',
}))

let mockOpen: jest.Mock
let modalRef: React.RefObject<ModalRef>

describe('PreventBackHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockOpen = jest.fn()
    modalRef = {
      current: { open: mockOpen, close: jest.fn() },
    }
    jest.spyOn(MockModal, 'useModal').mockImplementation((ref) => {
      if (ref && ref !== null && 'current' in ref) {
        ref.current = modalRef.current
      }
      return [true, jest.fn()]
    })
  })

  it('should show modal when back is pressed on root path', () => {
    const addEventListenerMock = jest.fn((_event, callback) => {
      callback()
      return { remove: jest.fn() }
    })
    BackHandler.addEventListener = addEventListenerMock

    render(
      <PreventBackHandler>
        <></>
      </PreventBackHandler>,
    )

    expect(mockOpen).toHaveBeenCalled()
  })
})
