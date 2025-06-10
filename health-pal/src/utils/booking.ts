import dayjs from 'dayjs'

import { BookingData } from '@app/models/booking'

export const formatBooking = ({ doctor, date, documentId, id, time, type }: BookingData) => {
  const { users_permissions_user, clinic, documentId: doctorDocId, id: doctorId } = doctor

  return {
    date: dayjs(date),
    documentId,
    id,
    time,
    type,
    doctorName: users_permissions_user.name,
    doctorAvatar: users_permissions_user.avatar?.url,
    address: clinic.address,
    specialty: doctor.specialty.name,
    doctorId,
    doctorDocId,
  }
}
