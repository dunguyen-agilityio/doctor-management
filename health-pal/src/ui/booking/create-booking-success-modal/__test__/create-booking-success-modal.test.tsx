import { fireEvent, render, waitFor } from '@utils-test'
import { useFormContext } from 'react-hook-form'

import dayjs from 'dayjs'
import { router } from 'expo-router'

import { ROUTES } from '@/constants'

import * as MockModal from '@/hooks/use-modal'

import { ModalRef } from '@/types'

import { queryClient } from '@react-query.config'

import { CreateBookingSuccessModal } from '..'

let modalRef: React.RefObject<ModalRef>
const mockClose = jest.fn()

jest.mock('react-hook-form')
jest.mock('expo-router')
jest.mock('@react-query.config')

const mockWatch = jest.fn().mockReturnValue(dayjs('2025-06-30'))

describe('CreateBookingSuccessModal', () => {
  beforeEach(() => {
    ;(useFormContext as jest.Mock).mockReturnValue({ watch: mockWatch })

    modalRef = {
      current: {
        close: mockClose,
        open: jest.fn(),
      },
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

  it('shows success message with correct time', () => {
    const { getByText } = render(<CreateBookingSuccessModal ref={modalRef} open />)

    expect(getByText('Congratulations!')).toBeTruthy()
    expect(getByText(/2025-06-30/i)).toBeTruthy()
  })

  it('closes modal and navigates on Done', async () => {
    const { getByText } = render(<CreateBookingSuccessModal ref={modalRef} open />)

    fireEvent.press(getByText('Done'))

    await waitFor(() => {
      expect(queryClient.invalidateQueries).toHaveBeenCalled()
      expect(router.replace).toHaveBeenCalledWith(ROUTES.BOOKINGS)
      expect(mockClose).toHaveBeenCalled()
    })
  })

  it('closes modal on "Edit your appointment"', () => {
    const { getByText } = render(<CreateBookingSuccessModal ref={modalRef} open />)

    fireEvent.press(getByText('Edit your appointment'))
    expect(mockClose).toHaveBeenCalled()
  })
})
