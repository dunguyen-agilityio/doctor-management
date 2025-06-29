import { act, fireEvent, render, screen } from '@utils-test'

import { router } from 'expo-router'

import { ROUTES } from '@/constants'

import * as MockModal from '@/hooks/use-modal'
import { useSession } from '@/hooks/use-session'

import { ModalRef } from '@/types/modal'

import { queryClient } from '@react-query.config'

import LogoutModal from '..'

jest.mock('@react-query.config')
jest.mock('expo-router')

// Mock useSession
jest.mock('@/hooks/use-session', () => ({
  useSession: jest.fn(),
}))

describe('LogoutModal', () => {
  const mockSignOut = jest.fn()
  const mockRef: React.RefObject<ModalRef> = {
    current: {
      open: jest.fn(),
      close: jest.fn(),
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useSession as jest.Mock).mockReturnValue({
      signOut: mockSignOut,
    })

    jest.spyOn(MockModal, 'useModal').mockImplementation((ref) => {
      if (ref && ref !== null && 'current' in ref) {
        ref.current = mockRef.current
      }
      return [true, jest.fn()]
    })
  })

  it('closes modal when Cancel button is clicked', () => {
    render(<LogoutModal ref={mockRef} />)
    const cancelButton = screen.getByLabelText('Cancel logout')
    act(() => {
      fireEvent.press(cancelButton)
    })
    expect(mockRef.current?.close).toHaveBeenCalled()
  })

  it('handles logout when Yes, Logout button is clicked', () => {
    render(<LogoutModal ref={mockRef} />)
    const logoutButton = screen.getByLabelText('Confirm logout')
    fireEvent.press(logoutButton)
    expect(router.replace).toHaveBeenCalledWith(ROUTES.LOGIN)
    expect(queryClient.clear).toHaveBeenCalled()
    expect(mockSignOut).toHaveBeenCalled()
  })
})
