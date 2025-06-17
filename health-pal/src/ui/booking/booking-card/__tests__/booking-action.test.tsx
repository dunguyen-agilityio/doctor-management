import { fireEvent, render, screen } from '@utils-test'

import dayjs from 'dayjs'
import { router } from 'expo-router'

import { ROUTES } from '@/constants'

import * as MockModal from '@/hooks/use-modal'

import { BOOKING_TABS } from '@/types'
import { ModalRef } from '@/types/modal'

import BookingAction from '../booking-action'

jest.mock('expo-router')

describe('BookingAction', () => {
  let setOpenMock: jest.Mock
  const mockRef: React.RefObject<ModalRef> = {
    current: {
      open: jest.fn(),
      close: jest.fn(),
    },
  }
  const defaultProps = {
    doctorName: 'Dr. John Doe',
    doctorId: 1,
    date: dayjs('2025-07-01'),
    doctorDocId: 'doc-ref1',
    documentId: 'booking1',
    type: BOOKING_TABS.UPCOMING,
  }

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

  it('renders buttons for UPCOMING type', () => {
    render(<BookingAction {...defaultProps} />)

    expect(
      screen.getByLabelText('Cancel booking with Dr. John Doe on 2025-07-01 - 00:00 AM'),
    ).toBeTruthy()
    expect(screen.getByLabelText('Reschedule booking with Dr. John Doe')).toBeTruthy()
    expect(screen.getByTestId('cancel-booking-modal')).toBeTruthy()
  })

  it('renders buttons for COMPLETED type', () => {
    render(<BookingAction {...defaultProps} type={BOOKING_TABS.COMPLETED} />)

    expect(screen.getByLabelText('Re-book appointment with Dr. John Doe')).toBeTruthy()
    expect(screen.getByLabelText('Add a review for Dr. John Doe')).toBeTruthy()
    expect(screen.queryByTestId('cancel-booking-modal')).not.toBeTruthy()
  })

  it('renders nothing for CANCELED type', () => {
    render(<BookingAction {...defaultProps} type={BOOKING_TABS.CANCELED} />)

    expect(screen.queryByTestId('mock-button')).not.toBeTruthy()
    expect(screen.queryByTestId('cancel-booking-modal')).not.toBeTruthy()
  })

  it('navigates to booking screen on Re-Book button press', () => {
    render(<BookingAction {...defaultProps} type={BOOKING_TABS.COMPLETED} />)

    const reBookButton = screen.getByLabelText('Re-book appointment with Dr. John Doe')
    fireEvent.press(reBookButton)

    expect(router.navigate).toHaveBeenCalledWith({
      pathname: ROUTES.BOOKING,
      params: { doctorId: 1 },
    })
  })

  it('navigates to doctor screen on Add Review button press', () => {
    render(<BookingAction {...defaultProps} type={BOOKING_TABS.COMPLETED} />)

    const reviewButton = screen.getByLabelText('Add a review for Dr. John Doe')
    fireEvent.press(reviewButton)

    expect(router.navigate).toHaveBeenCalledWith({
      pathname: ROUTES.DOCTOR,
      params: { id: 1 },
    })
  })

  it('opens cancel modal on Cancel button press', () => {
    render(<BookingAction {...defaultProps} />)

    const cancelButton = screen.getByLabelText(
      'Cancel booking with Dr. John Doe on 2025-07-01 - 00:00 AM',
    )
    fireEvent.press(cancelButton)

    expect(mockRef.current?.open).toHaveBeenCalled()
  })

  it('navigates to booking screen with params on Reschedule button press', () => {
    render(<BookingAction {...defaultProps} />)

    const rescheduleButton = screen.getByLabelText('Reschedule booking with Dr. John Doe')
    fireEvent.press(rescheduleButton)

    expect(router.navigate).toHaveBeenCalledWith({
      pathname: ROUTES.BOOKING,
      params: {
        doctorId: 1,
        doctorDocId: 'doc-ref1',
        bookingId: 'booking1',
        date: dayjs('2025-07-01').toISOString(),
      },
    })
  })

  it('has correct accessibility attributes', () => {
    render(<BookingAction {...defaultProps} />)

    const cancelButton = screen.getByLabelText(
      'Cancel booking with Dr. John Doe on 2025-07-01 - 00:00 AM',
    )
    const rescheduleButton = screen.getByLabelText('Reschedule booking with Dr. John Doe')

    expect(cancelButton).toHaveProp(
      'aria-label',
      'Cancel booking with Dr. John Doe on 2025-07-01 - 00:00 AM',
    )
    expect(cancelButton).toHaveProp(
      'accessibilityHint',
      'Opens a confirmation dialog to cancel this appointment',
    )
    expect(rescheduleButton).toHaveProp('aria-label', 'Reschedule booking with Dr. John Doe')
    expect(rescheduleButton).toHaveProp(
      'accessibilityHint',
      'Navigates to the booking screen to change the date or time of this appointment',
    )
  })
})
