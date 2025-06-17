import { fireEvent, render } from '@utils-test'

import { BackHandler } from 'react-native'

import * as MockModal from '@/hooks/use-modal'

import { ModalRef } from '@/types'

import QuitAppConfirmModal from '..'

let mockClose: jest.Mock
let modalRef: React.RefObject<ModalRef>

describe('QuitAppConfirmModal', () => {
  beforeEach(() => {
    mockClose = jest.fn()
    modalRef = {
      current: { close: mockClose, open: jest.fn() },
    }
    jest.spyOn(MockModal, 'useModal').mockImplementation((ref) => {
      if (ref && ref !== null && 'current' in ref) {
        ref.current = modalRef.current
      }
      return [true, jest.fn()]
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders title and buttons', () => {
    const { getByText } = render(<QuitAppConfirmModal ref={modalRef} open />)

    expect(getByText('Confirm Quit')).toBeTruthy()
    expect(getByText('Yes, Quit')).toBeTruthy()
    expect(getByText('No, Keep Application')).toBeTruthy()
  })

  it('calls exitApp and closes modal on confirm', () => {
    const exitAppSpy = jest.spyOn(BackHandler, 'exitApp').mockImplementation(() => true)
    const { getByText } = render(<QuitAppConfirmModal ref={modalRef} open />)

    fireEvent.press(getByText('Yes, Quit'))
    expect(exitAppSpy).toHaveBeenCalled()
    expect(mockClose).toHaveBeenCalled()
  })

  it('only closes modal on cancel', () => {
    const exitAppSpy = jest.spyOn(BackHandler, 'exitApp').mockImplementation(() => true)
    const { getByText } = render(<QuitAppConfirmModal ref={modalRef} open />)

    fireEvent.press(getByText('No, Keep Application'))
    expect(exitAppSpy).not.toHaveBeenCalled()
    expect(mockClose).toHaveBeenCalled()
  })
})
