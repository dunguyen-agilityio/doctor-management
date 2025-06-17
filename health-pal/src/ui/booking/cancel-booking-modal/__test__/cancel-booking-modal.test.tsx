import { fireEvent, render, waitFor } from '@utils-test'

import dayjs from 'dayjs'
import { router } from 'expo-router'

import * as MockModal from '@/hooks/use-modal'

import { updateBooking } from '@/services/booking'

import { ModalRef } from '@/types'

import { queryClient } from '@react-query.config'

import CancelBookingModal, { CancelBookingParams } from '..'

let mockClose: jest.Mock
let modalRef: React.RefObject<ModalRef>

jest.mock('@/services/booking')
jest.mock('@react-query.config')
jest.mock('expo-router')

const props: CancelBookingParams = {
  doctorName: 'Jane Doe',
  documentId: 'abc123',
  date: dayjs('2025-06-30'),
}

let mockShow: jest.Mock

jest.mock('@tamagui/toast', () => ({
  ...jest.requireActual('@tamagui/toast'),
  useToastController: () => ({
    show: mockShow,
  }),
}))

describe('CancelBookingModal', () => {
  beforeEach(() => {
    mockClose = jest.fn()
    mockShow = jest.fn()
    modalRef = { current: { close: mockClose, open: jest.fn() } }
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

  it('renders and cancels booking on confirm', async () => {
    ;(updateBooking as jest.Mock).mockResolvedValueOnce({ data: true })

    const { getByText } = render(<CancelBookingModal {...props} ref={modalRef} open />)

    fireEvent.press(getByText('Yes, Cancel'))

    await waitFor(() => {
      expect(updateBooking).toHaveBeenCalledWith({ documentId: 'abc123', type: 'canceled' })
      expect(queryClient.invalidateQueries).toHaveBeenCalledTimes(2)
      expect(router.navigate).toHaveBeenCalled()
      expect(mockClose).toHaveBeenCalled()
    })
  })

  it('show error toast when updateBooking failed', async () => {
    ;(updateBooking as jest.Mock).mockRejectedValueOnce(new Error('Failed to update booking'))

    const { getByText } = render(<CancelBookingModal {...props} ref={modalRef} open />)

    fireEvent.press(getByText('Yes, Cancel'))

    await waitFor(() => {
      expect(mockShow).toHaveBeenCalledWith('Cancellation Failed', {
        message: 'There was an error cancelling your booking. Please try again later.',
        type: 'error',
        duration: 3000,
      })
    })
  })

  it('closes modal on "No, Keep Appointment"', () => {
    const { getByText } = render(<CancelBookingModal {...props} ref={modalRef} open />)

    fireEvent.press(getByText('No, Keep Appointment'))
    expect(mockClose).toHaveBeenCalled()
  })
})
