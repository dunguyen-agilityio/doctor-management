export const BOOKING_QUERY_KEY = {
  hospital: 'populate[doctor][populate][clinic][fields]',
  patient: 'populate[patient][populate][users_permissions_user][populate][avatar][fields]',
  doctor: 'populate[doctor][populate][users_permissions_user][populate][avatar][fields]',
  specialty: 'populate[doctor][populate][specialty][fields]',
}

export const BOOKING_MESSAGE = {
  BOOKING_SUCCESS: 'Booking successfully created',
  BOOKING_ERROR: 'Failed to create booking',
  BOOKING_CANCEL_SUCCESS: 'Booking successfully cancelled',
  BOOKING_CANCEL_ERROR: 'Failed to cancel booking',
  BOOKING_UPDATE_SUCCESS: 'Booking successfully updated',
  BOOKING_UPDATE_ERROR: 'Failed to update booking',
}

export const TIME_SLOTS = [
  '09:00:00',
  '09:30:00',
  '10:00:00',
  '10:30:00',
  '11:00:00',
  '11:30:00',
  '15:00:00',
  '15:30:00',
  '16:00:00',
  '16:30:00',
  '17:00:00',
  '17:30:00',
]
