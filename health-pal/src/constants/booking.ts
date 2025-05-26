export const BookingQueryKey = {
  hospital: 'populate[doctor][populate][clinic][fields]',
  patient: 'populate[patient][populate][users_permissions_user][populate][avatar][fields]',
  doctor: 'populate[doctor][populate][users_permissions_user][populate][avatar][fields]',
  specialty: 'populate[doctor][populate][specialty][fields]',
}

export const BookingMessages = {
  BOOKING_SUCCESS: 'Booking successfully created',
  BOOKING_ERROR: 'Failed to create booking',
  BOOKING_CANCEL_SUCCESS: 'Booking successfully cancelled',
  BOOKING_CANCEL_ERROR: 'Failed to cancel booking',
  BOOKING_UPDATE_SUCCESS: 'Booking successfully updated',
  BOOKING_UPDATE_ERROR: 'Failed to update booking',
}
