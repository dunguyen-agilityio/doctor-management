import { DoctorData, TDoctorCard } from '@app/models/doctor'

export const formatDoctor = ({
  clinic,
  specialty,
  users_permissions_user,
  favoriteId,
  rating,
}: DoctorData): TDoctorCard => {
  const { avatar, name, documentId, id } = users_permissions_user

  return {
    name,
    address: clinic.address,
    avatar: avatar?.url ?? '',
    specialty: specialty.name,
    documentId,
    id,
    reviewCounter: 0,
    favoriteId,
    rating,
  }
}
