import { render, screen } from '@utils-test'

import * as MockModal from '@/hooks/use-modal'

import { ModalRef } from '@/types/modal'

import CreateAccountSuccessModal from '..'

describe('CreateAccountSuccessModal', () => {
  const mockRef: React.RefObject<ModalRef> = {
    current: {
      open: jest.fn(),
      close: jest.fn(),
    },
  }
  let setOpenMock: jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
    setOpenMock = jest.fn()
    jest.spyOn(MockModal, 'useModal').mockImplementation((ref) => {
      if (ref && ref !== null && 'current' in ref) {
        ref.current = mockRef.current
      }

      return [true, setOpenMock]
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('has correct accessibility attributes', () => {
    render(<CreateAccountSuccessModal ref={mockRef} />)

    const modal = screen.getByLabelText('Account created successfully')
    const loadingIndicator = screen.getByLabelText('Redirecting, please wait')

    expect(modal).toHaveProp('aria-label', 'Account created successfully')
    expect(loadingIndicator).toHaveProp('aria-label', 'Redirecting, please wait')
  })

  it('matches snapshot when open', () => {
    const { toJSON } = render(<CreateAccountSuccessModal ref={mockRef} />)
    expect(toJSON()).toMatchSnapshot()
  })
})
